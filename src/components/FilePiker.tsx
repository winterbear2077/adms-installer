import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Box, Button, Typography, List, ListItem, ListItemText, Paper, ListItemIcon } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CloudUpload, InsertDriveFile } from "@mui/icons-material";

const FilePicker = () => {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const handlePickFile = async () => {
        const files = await open({
            multiple: true,
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif'] },
                { name: 'Text', extensions: ['txt', 'md'] }
            ]
        });

        // `files` 可以是 string 或 string[]
        if (files) {
            setSelectedFiles(Array.isArray(files) ? files : [files]);
        }
    };

    const onDrop = (acceptedFiles: File[]) => {
        setSelectedFiles(acceptedFiles.map(file => file.name));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'], // 限制文件类型
            'text/*': ['.txt']
        },
        maxSize: 5 * 1024 * 1024, // 限制文件大小（5MB）
    });

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            {/* 拖拽区域 */}
            <Paper
                {...getRootProps()}
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
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 40, color: 'text.secondary' }} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {isDragActive ? 'loose to upload' : 'drag here to upload'}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
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
