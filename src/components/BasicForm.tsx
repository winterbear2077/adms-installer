import { useForm, SubmitHandler } from 'react-hook-form';
import BasicInput, { BasicInputProps } from './BasicInput';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

interface BasicFormProps {
    formName: string;
    formInfo: BasicInputProps[];
    multiple?: boolean;
    updateValues?: (r: Record<string, any>) => void;
    onNext: SubmitHandler<any>;
    onBack?: () => void;
    isLastStep?: boolean;
    currentStep?: number;
    additionalInput?: React.ReactNode;
}

const AddFormButton = ({ updateComponent, }: {
    updateComponent: (event: React.MouseEvent<HTMLButtonElement>) => void,
}) => {
    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={updateComponent}
            >
                <Typography variant="body2" color="primary">
                    +
                </Typography>
            </Button>
        </>
    );
};

const BasicForm = ({
    formName,
    formInfo,
    updateValues,
    onNext,
    onBack,
    isLastStep = false,
    currentStep = 0,
    additionalInput,
    multiple = false,
}: BasicFormProps) => {
    const { control, handleSubmit } = useForm({
        mode: 'onBlur',
    });

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/");
    };

    const dataTransform = (data: any, index: number) => {
        const entry: Record<string, any> = {};
        formInfo.forEach(({ name }) => {
            entry[name] = data[name][index];
        });
        return entry;
    }

    const onSubmit = (data: any) => {
        const transformedData = multiple ? Array.from({ length: formCount }).map((_, index) => {
            return dataTransform(data, index);
        }) : dataTransform(data, 0);
        updateValues?.({ [formName]: transformedData });
        onNext(transformedData);
    };

    const [formCount, setFormCount] = useState(1);

    const updateComponent = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setFormCount(prev => prev + 1);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: 2,
                marginRight: 8,
                height: "40vh"
            }}>
                <Card sx={{ padding: 2, marginBottom: 2 }} elevation={0}>
                    {Array.from({ length: formCount }).map((_, index) => (
                        <React.Fragment key={index}>
                            {formInfo.map((props) => {
                                const inputProps = {
                                    ...props,
                                    name: `${props.name}[${index}]`,
                                };
                                return (
                                    <BasicInput
                                        key={`${index}-${props.name}`}
                                        control={control}
                                        inputProps={inputProps}
                                    />
                                );
                            })}
                            {index !== formCount - 1 && <Divider sx={{ marginTop: 4, }}>{index + 2}</Divider>}
                        </React.Fragment>
                    ))}
                    {multiple && (
                        <>
                            <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
                            <AddFormButton updateComponent={updateComponent} />
                        </>

                    )}
                    {additionalInput}
                </Card>
            </Box>
            <Divider sx={{ marginBottom: 4 }} />
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2 }}>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button
                        disabled={currentStep === 0}
                        onClick={onBack}
                        variant="outlined"
                        color="primary"
                    >
                        Back
                    </Button>
                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                    >
                        {isLastStep ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BasicForm;