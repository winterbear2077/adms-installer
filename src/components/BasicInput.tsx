import React, { useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Typography, SelectChangeEvent } from "@mui/material";
import { Controller } from "react-hook-form";


interface SelectProps {
    enable: boolean;
    multiple: boolean;
    options: string[];
    loadOptions?: () => Promise<string[]>;
}
export interface BasicInputProps {
    title: string;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    defaultValue?: string | string[];
    rules?: any;
    select?: SelectProps;
}

const BasicInput = ({ control, inputProps }: {
    control: any;
    inputProps: BasicInputProps;
}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [_, setIsLoading] = useState(false);

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

    return (
        <Controller
            name={inputProps.name}
            control={control}
            defaultValue={inputProps.defaultValue || []}
            rules={{ required: inputProps.required ? `${inputProps.title} is required` : false, ...inputProps.rules }}
            render={({ field, fieldState: { error } }) => {

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