import React, { useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Typography, SelectChangeEvent } from "@mui/material";
import { Controller } from "react-hook-form";

export interface BasicInputProps {
    title: string;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    defaultValue?: string;
    select?: boolean;
    onChange?: (value: string) => void;
    loadOptions?: () => Promise<string[]>;
    rules?: any;
}

const BasicInput = ({ control, inputProps }: {
    control: any;
    inputProps: BasicInputProps;
}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [_, setIsLoading] = useState(false);

    // 处理异步加载选项
    useEffect(() => {
        if (inputProps.select && inputProps.loadOptions) {
            setIsLoading(true);
            inputProps.loadOptions()
                .then(opts => {
                    setOptions(opts);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [inputProps.select, inputProps.loadOptions]);

    return (
        <Controller
            name={inputProps.name}
            control={control}
            defaultValue={inputProps.defaultValue || ''}
            rules={{ required: inputProps.required ? `${inputProps.title} is required` : false, ...inputProps.rules }}
            render={({ field, fieldState: { error } }) => {
                // 统一处理变化事件
                const handleChange = (event: SelectChangeEvent<unknown> | React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value as string;

                    // 优先执行自定义回调
                    if (inputProps.onChange) {
                        inputProps.onChange(value);
                    }

                    // 更新表单状态
                    field.onChange(event);
                };

                return (
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                        <Typography sx={{ width: '30%' }}>
                            {inputProps.title}
                            {inputProps.required && <span style={{ color: 'red' }}>*</span>}
                        </Typography>

                        <TextField
                            {...field}
                            select={inputProps.select}
                            variant="standard"
                            placeholder={inputProps.placeholder}
                            value={field.value ?? ''}
                            sx={{ marginBottom: 2, width: '60%' }}
                            type={inputProps.type || 'text'}
                            error={!!error}
                            helperText={error?.message}
                            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>} // 统一使用自定义处理器
                            required={inputProps.required}
                        >
                            {/* 下拉模式时的选项 */}
                            {inputProps.select && [
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
                    </Box>
                );
            }}
        />
    );
};

export default BasicInput;