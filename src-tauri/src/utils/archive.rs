use std::{
    fs::{self, File},
    io::{self, BufReader, Read, Seek},
    path::Path,
};

use infer::Infer;
use thiserror::Error;

#[derive(Error, Debug)]
enum ArchiveError {
    #[error("Unsupprot file format: {0}")]
    UnsupportedFormat(String),
    #[error("Failed to extract: {0}")]
    ExtractionError(#[from] ExtractionError),
    #[error("File invalid: {0}")]
    BrokenFile(String),
    #[error("IO error: {0}")]
    IoError(#[from] io::Error),
}

#[derive(Debug, Error)]
enum ExtractionError {
    #[error("Zip extraction error: {0}")]
    ZipError(#[from] zip::result::ZipError),
    #[error("Tar extraction error: {0}")]
    TarError(#[from] io::Error),
    #[error("Gzip extraction error: {0}")]
    GzipError(#[from] flate2::DecompressError),
    #[error("Security violation: {0}")]
    SecurityViolation(String),
}
enum Archive {
    Zip,
    Tar,
    TGz,
}

impl Archive {
    fn is_valid_tar<R: Read>(reader: &mut R) -> Result<bool, ArchiveError> {
        let mut header = [0u8; 512];
        reader.read_exact(&mut header)?;

        // 检查 ustar 文件头
        let valid = header[257..263] == *b"ustar\0";
        Ok(valid)
    }

    pub fn detect_mime_type<R: Read>(mut reader: R) -> Result<infer::Type, ArchiveError> {
        let mut buffer = [0; 512];
        let byte_read = reader.read(&mut buffer)?;
        let info = Infer::new();
        let mime = info.get(&buffer[..byte_read]).ok_or_else(|| {
            ArchiveError::UnsupportedFormat("Could not determine file type".to_string())
        })?;
        Ok(mime)
    }

    pub fn from_path_by_magic_number(path: impl AsRef<Path>) -> Result<Self, ArchiveError> {
        let mut file = File::open(path)?;
        let mime = {
            let file = file.try_clone()?;
            let mut reader = BufReader::new(&file);
            Self::detect_mime_type(&mut reader)?
        };

        match mime.mime_type() {
            "application/zip" => Ok(Archive::Zip),
            "application/x-tar" => Ok(Archive::Tar),
            "application/gzip" => {
                file.seek(io::SeekFrom::Start(0))?;
                let mut archive = flate2::read::GzDecoder::new(file);
                let tar_mime = Self::detect_mime_type(&mut archive)?;
                if tar_mime.mime_type() == "application/x-tar" || Self::is_valid_tar(&mut archive)?
                {
                    Ok(Archive::TGz)
                } else {
                    Err(ArchiveError::UnsupportedFormat(
                        "Not a valid tar file".to_string(),
                    ))
                }
            }
            _ => Err(ArchiveError::UnsupportedFormat(
                mime.mime_type().to_string(),
            )),
        }
    }

    pub fn extract(&self, archive_path: &str, output_path: &str) -> Result<(), ArchiveError> {
        match self {
            Archive::Zip => self.extract_zip(archive_path, output_path),
            Archive::Tar => self.extract_tar(archive_path, output_path),
            Archive::TGz => self.extract_tgz(archive_path, output_path),
        }
    }

    fn extract_zip(&self, archive_path: &str, output_path: &str) -> Result<(), ArchiveError> {
        let file = File::open(archive_path)?;
        let mut archive = zip::ZipArchive::new(file).map_err(ExtractionError::ZipError)?;

        for i in 0..archive.len() {
            let mut file = archive.by_index(i).map_err(ExtractionError::ZipError)?;
            let file_name = file.enclosed_name().ok_or_else(|| {
                ExtractionError::SecurityViolation("Invalid file name".to_string())
            })?;
            let outpath = Path::new(output_path).join(file_name);

            if file.name().ends_with('/') {
                fs::create_dir_all(&outpath)?;
            } else {
                if let Some(parent) = outpath.parent() {
                    fs::create_dir_all(parent)?;
                }
                let mut outfile = File::create(&outpath)?;
                io::copy(&mut file, &mut outfile)?;
            }
        }
        Ok(())
    }

    fn extract_tar(&self, archive_path: &str, output_path: &str) -> Result<(), ArchiveError> {
        let file = File::open(archive_path)?;
        let mut archive = tar::Archive::new(file);

        archive
            .unpack(output_path)
            .map_err(ExtractionError::TarError)?;
        Ok(())
    }

    fn extract_tgz(&self, archive_path: &str, output_path: &str) -> Result<(), ArchiveError> {
        let file = File::open(archive_path)?;
        let archive = flate2::read::GzDecoder::new(file);
        let mut tar_archive = tar::Archive::new(archive);

        tar_archive.unpack(output_path)?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_archive_extraction() {
        let archive_path = "src.tgz"; // Replace with a valid archive path
        let output_path = "target_output";

        let archive = Archive::from_path_by_magic_number(archive_path).unwrap();
        assert!(archive.extract(archive_path, output_path).is_ok());
    }
}
