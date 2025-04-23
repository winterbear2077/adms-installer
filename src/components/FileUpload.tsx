import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    // 拖拽/点击处理逻辑
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles.map((file: Blob | MediaSource) => ({
            ...file,
            preview: URL.createObjectURL(file) // 生成预览链接（仅图片有效）
        })));
    }, []);

    // 配置 react-dropzone
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
            {files.length > 0 && (
                <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        chosen files
                    </Typography>
                    <List>
                        {files.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile />
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.name}
                                    secondary={`${(file.size / 1024).toFixed(2)} KB`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default FileUpload;