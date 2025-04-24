import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button, Card, CardContent, Divider } from '@mui/material';
import BasicPage from './BasicPage';
import { useNavigate } from 'react-router-dom';
import BasicInput from './BasicInput';
import { BasicInputProps } from './BasicInput';


export interface StepInfo {
    stepName: string,
    description: string,
    formInfo: Array<BasicInputProps>,
    additionalInput?: React.ReactNode
}

function SidePage({ steps }: { steps: Array<StepInfo> }) {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleCancle = () => {
        navigate("/");
    }


    return (
        <BasicPage>
            {/* Main Content */}
            <Box sx={{ display: 'flex', height: '100%', padding: 2, width: '80%' }}>
                {/* Stepper (Left side) */}
                <Box sx={{ width: '30%', paddingRight: 2 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((info, index) => (
                            <Step key={index}>
                                <StepLabel>{info.stepName}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Content (Right side) */}
                <Box sx={{ width: '70%', height: '80%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Card sx={{ padding: 2, marginBottom: 2 }}
                        elevation={0}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {steps[activeStep].stepName}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {steps[activeStep].description}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Divider sx={{ marginBottom: 5 }} />
                    {/* 表单区（带滚动条） */}
                    <Box sx={{ flex: 1, overflowY: 'auto', marginBottom: 2, marginRight: 8 }}>
                        <Card sx={{ padding: 2 }}
                            elevation={0}>
                            {steps[activeStep].additionalInput}
                            {
                                steps[activeStep].formInfo.map((inputProps, key) => (
                                    <BasicInput inputProps={inputProps} key={key} />
                                ))
                            }
                        </Card>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2 }}>
                        <Button
                            onClick={handleCancle}
                            color="primary"
                        >
                            Cancle
                        </Button>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                            color="primary"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            color="primary"
                            disabled={activeStep === steps.length}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </BasicPage >
    );
}

export default SidePage;
