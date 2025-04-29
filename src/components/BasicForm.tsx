import { useForm, SubmitHandler } from 'react-hook-form';
import BasicInput, { BasicInputProps } from './BasicInput';
import { useEffect } from 'react';
import { Box, Button, Card, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface BasicFormProps {
    formInfo: BasicInputProps[];
    initialValues?: Record<string, any>;
    onNext: SubmitHandler<any>;
    onBack?: () => void;
    isLastStep?: boolean;
    currentStep?: number;
    additionalInput?: React.ReactNode;
}

const BasicForm = ({
    formInfo,
    initialValues,
    onNext,
    onBack,
    isLastStep = false,
    currentStep = 0,
    additionalInput,
}: BasicFormProps) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: initialValues
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit(onNext)}>
            <Box>
                {/* form part*/}
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    marginBottom: 2,
                    marginRight: 8,
                    height: "40vh"
                }}>
                    <Card sx={{ padding: 2, marginBottom: 2 }}
                        elevation={0}>
                        {formInfo.map((props) => (
                            <>
                                <BasicInput
                                    key={props.name}
                                    control={control}
                                    inputProps={props}
                                />
                            </>
                        ))}
                        {additionalInput}
                    </Card>
                </Box>
                <Divider sx={{
                    marginBottom: 4
                }} />
                {/* button*/}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2 }}>
                        <Button
                            onClick={handleCancel}
                            color="primary"
                        >
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
                            onClick={onNext}
                            variant="contained"
                            color="primary"
                        >
                            {isLastStep ? 'Finish' : 'Next'}
                        </Button>

                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default BasicForm;

