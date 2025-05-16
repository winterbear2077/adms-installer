import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Box, Button, TextField } from "@mui/material";

interface FilePickerProps {
    value: string;
    fileFilter?: {
        name: string;
        extensions: string[];
    }[];
    multiple?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
}

const FilePicker = ({ value, onChange, onBlur, fileFilter, multiple }: FilePickerProps) => {
    const [selectedFile, setSelectedFile] = useState<string>(value);

    // Handle file selection
    const handlePickFile = async () => {
        const file = await open({
            filters: fileFilter,
            multiple
        });
        if (file) {
            setSelectedFile(file as string);
            onChange({ target: { value: file as string } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    // Clear the selected file
    const handleClearFile = () => {
        setSelectedFile('');
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    };

    // Handle manual input of the file path
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.value);
        onChange(event);
    };

    return (
        <Box sx={{ maxWidth: '80%', mx: '0', mt: 1 }}>
            <Box display="flex" flexDirection="row" gap={1} justifyContent="flex-end" alignItems="center">
                <TextField
                    label="file path"
                    variant="outlined"
                    fullWidth
                    value={selectedFile}
                    onChange={handleChange}
                    onBlur={onBlur}
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePickFile}
                >
                    select
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClearFile}
                >
                    clear
                </Button>
            </Box>
        </Box>
    );
};

export default FilePicker;