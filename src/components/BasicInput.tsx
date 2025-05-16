import { useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import FilePicker from './FilePicker';


interface SelectProps {
    enable: boolean;
    multiple: boolean;
    options: string[];
    loadOptions?: () => Promise<string[]>;
}
export interface BasicInputProps {
    onFileSelected?: (file: string) => void;
    title: string;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    defaultValue?: string | string[];
    rules?: any;
    select?: SelectProps;
    filePickerProps?: {
        fileFilter?: {
            name: string;
            extensions: string[];
        }[];
        multiple?: boolean;
    };
}

const BasicInput = ({ control, inputProps }: {
    control: any;
    inputProps: BasicInputProps;
}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [_, setIsLoading] = useState(false);
    // Initialize checkbox state based on required property
    const [showFilePicker, setShowFilePicker] = useState<boolean>(inputProps.required || false);

    const { select } = inputProps;
    // 处理异步加载选项
    useEffect(() => {
        if (select?.enable && select.loadOptions) {
            setIsLoading(true);
            select.loadOptions()
                .then(opts => {
                    setOptions(opts);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [select?.enable, select?.loadOptions]);

    // Handle checkbox change for file picker
    const handleFilePickerCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow changes if the field is not required
        if (!inputProps.required) {
            setShowFilePicker(event.target.checked);
        }
    };

    return (
        <Controller
            name={inputProps.name}
            control={control}
            defaultValue={inputProps.defaultValue || []}
            rules={{ required: inputProps.required ? `${inputProps.title} is required` : false, ...inputProps.rules }}
            render={({ field, fieldState: { error } }) => {
                if (inputProps.type === "file") {
                    return (
                        <Box display="flex" flexDirection="column" marginTop={2}>
                            <Box display="flex" alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={inputProps.required || showFilePicker}
                                            onChange={handleFilePickerCheckboxChange}
                                            color="primary"
                                            disabled={inputProps.required}
                                        />
                                    }
                                    label={
                                        <span>
                                            {inputProps.title}
                                            {inputProps.required && <span style={{ color: 'red' }}>*</span>}
                                        </span>
                                    }
                                />
                            </Box>
                            {/* 渲染 FilePicker */}
                            {(inputProps.required || showFilePicker) && (
                                <FilePicker
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (!showFilePicker && !inputProps.required) {
                                            field.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
                                        }
                                    }}
                                    onBlur={field.onBlur}
                                    fileFilter={inputProps.filePickerProps?.fileFilter}
                                    multiple={inputProps.filePickerProps?.multiple}
                                />
                            )}
                        </Box>
                    );
                }
                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                        <Typography sx={{ width: '30%' }}>
                            {inputProps.title}
                            {inputProps.required && <span style={{ color: 'red' }}>*</span>}
                        </Typography>

                        <TextField
                            {...field}
                            select={select?.enable}
                            variant="standard"
                            placeholder={inputProps.placeholder}
                            sx={{ marginBottom: 2, width: '60%' }}
                            type={inputProps.type || 'text'}
                            error={!!error}
                            helperText={error?.message}
                            required={inputProps.required}
                            slotProps={{ select: { multiple: select?.multiple } }} // 传递 slotProps
                        >
                            {/* 下拉模式时的选项 */}
                            {select?.enable && [
                                <MenuItem key="placeholder" value="" disabled>
                                    {inputProps.placeholder}
                                </MenuItem>,
                                ...options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))
                            ]}
                        </TextField>
                    </Box >
                );
            }}
        />
    );
};

export default BasicInput;