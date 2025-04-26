import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

export interface BasicInputProps {
    title: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    value?: string; // 受控模式使用
    onChange?: (value: string) => void;
    defaultValue?: string; // 非受控模式初始值
}

const BasicInput = ({ inputProps }: { inputProps: BasicInputProps }) => {
    const {
        title,
        placeholder,
        type = "text",
        required,
        error,
        helperText,
        value,
        onChange,
        defaultValue = "",
    } = inputProps;

    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (isControlled) {
            onChange?.(newValue);
        } else {
            setInnerValue(newValue);
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={5}>
            <Typography sx={{ width: '30%' }}>
                {title}
                {required && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <TextField
                variant="standard"
                placeholder={placeholder}
                sx={{ marginBottom: 2, width: '60%' }}
                type={type}
                required={required}
                error={error}
                helperText={helperText}
                value={isControlled ? value : innerValue}
                onChange={handleChange}
            />
        </Box>
    );
};

export default BasicInput;
