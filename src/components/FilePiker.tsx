import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

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

    return (
        <Box p={4}>
            <Typography variant="h5" gutterBottom>选择文件</Typography>
            <Button variant="contained" onClick={handlePickFile}>
                选择文件
            </Button>

            {selectedFiles.length > 0 && (
                <Box mt={2}>
                    <Typography variant="subtitle1">已选择文件：</Typography>
                    <List>
                        {selectedFiles.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={file} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default FilePicker;
