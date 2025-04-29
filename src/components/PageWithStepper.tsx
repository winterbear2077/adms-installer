import React, { useState } from 'react';
import { Box } from '@mui/material';
import BasicPage from './BasicPage';
import { BasicInputProps } from './BasicInput';
import BasicForm from './BasicForm';
import SideStepper from './SideStepper';
import StepDescription from './StepDescription';


export interface StepInfo {
    stepName: string,
    description: string,
    formInfo: Array<BasicInputProps>,
    additionalInput?: React.ReactNode,
    handleSubmit?: () => void,
}

const PageWithStepper = ({ steps }: { steps: Array<StepInfo> }) => {

    const [activeStep, setActiveStep] = useState(0);
    const onNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);


    const onBack = () => setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));



    return (
        <BasicPage welcome={
            steps[activeStep].stepName
        }>
            <Box sx={{ display: 'flex', height: '100%', padding: 2, width: '80%' }}>

                <Box sx={{ width: '30%', marginTop: 2 }}>
                    <SideStepper activeStep={activeStep} steps={steps} />
                </Box>


                <Box sx={{ width: '70%', height: '80%', display: 'flex', justifyContent: 'top', flexDirection: 'column' }}>
                    <StepDescription steps={steps} activeStep={activeStep} />

                    <BasicForm
                        formInfo={steps[activeStep].formInfo}
                        onNext={onNext}
                        onBack={onBack}
                        isLastStep={activeStep === steps.length - 1}
                        currentStep={activeStep}
                        additionalInput={steps[activeStep].additionalInput} />
                </Box>
            </Box>
        </BasicPage >
    );
}

export default PageWithStepper;
