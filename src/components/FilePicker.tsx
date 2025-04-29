import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Box, Button, Typography, List, ListItem, ListItemText, Paper, ListItemIcon } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CloudUpload, InsertDriveFile } from "@mui/icons-material";

interface fileFilterProps {
    name: string,
    extensions: Array<string>
}

interface FilePickerProps {
    onFileSelected: (file: string) => void;
}

const FilePicker = ({ fileFilters, filePickProps }: { fileFilters: Array<fileFilterProps>, filePickProps: FilePickerProps }) => {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const { onFileSelected } = filePickProps;

    const handlePickFile = async () => {
        const file = await open({
            multiple: false,
            filters: fileFilters
        });

        file && setSelectedFiles([file as string]);
        onFileSelected(file as string);

    };


    const { isDragActive } = useDropzone({});

    return (
        <Box sx={{ maxWidth: '80%', mx: 'auto', mt: 4 }}>
            {/* 拖拽区域 */}
            <Paper
                sx={{
                    p: 4,
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'divider',
                    backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: 'primary.main',
                    },
                }}
            >
                <CloudUpload sx={{ fontSize: 40, color: 'text.secondary' }} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {isDragActive ? 'loose to upload' : 'drag here to upload'}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}
                    onClick={handlePickFile}>
                    Choose the files
                </Button>
            </Paper>

            {/* 已选文件列表 */}
            {selectedFiles.length > 0 && (
                <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        chosen files
                    </Typography>
                    <List>
                        {selectedFiles.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile />
                                </ListItemIcon>
                                <ListItemText primary={file} secondary="File description"
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default FilePicker;
