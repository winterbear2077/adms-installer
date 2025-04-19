import { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, StepContent, Button, Card, CardContent } from '@mui/material';
import BasicPage from './BasicPage';

const steps = [
    'Introduction',
    'End user license agreement',
    'vCenter Server deployment target',
    'Set up vCenter Server VM',
    'Select deployment size',
    'Select datastore',
    'Configure network settings',
    'Ready to complete stage 1',
];

function SPage() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    return (
        <BasicPage>
            {/* Main Content */}
            <Box sx={{ display: 'flex', height: '100%', padding: 2, width: '80%' }}>
                {/* Stepper (Left side) */}
                <Box sx={{ width: '30%', paddingRight: 2 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {/* Here we can put additional content for each step if needed */}
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Content (Right side) */}
                <Box sx={{ width: '70%' }}>
                    <Card sx={{ padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Step {activeStep + 1}: {steps[activeStep]}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {/* You can put specific form elements or details for each step here */}
                                This section will contain the details for the current step, including forms or
                                information you need to fill out.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                    color="primary"
                                >
                                    Back
                                </Button>
                                <Button onClick={handleNext} variant="contained" color="primary">
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </BasicPage>
    );
}

export default SPage;
