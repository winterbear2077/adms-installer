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
    multiple?: boolean,
    additionalInput?: React.ReactNode,
    handleSubmit?: () => void,
}

const PageWithStepper = ({ steps }: { steps: Array<StepInfo> }) => {

    const [activeStep, setActiveStep] = useState(0);
    const onNext = (_event: any) => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const onSubmit = (data: any) => {
        if (activeStep === steps.length - 1) {
            // Handle final submission
            console.log("Final values:", values);
        } else {
            onNext(data);
        }
    }

    const onBack = () => setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));

    const [values, setValues] = useState<Record<string, any>>({});

    const updateValues = (data: Record<string, any>) => {
        setValues((prevValues) => ({ ...prevValues, ...data }));
    }

    return (
        <BasicPage welcome={
            steps[activeStep].stepName
        }>
            <Box sx={{ display: 'flex', height: '100%', padding: 2, width: '80%' }}>

                <Box sx={{ width: '30%', marginTop: 2 }}>
                    <SideStepper activeStep={activeStep} steps={steps} />
                </Box>


                <Box sx={{ width: '70%', height: '80%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                    <StepDescription steps={steps} activeStep={activeStep} />

                    <Box>
                        <BasicForm
                            key={activeStep}
                            formName={steps[activeStep].stepName}
                            formInfo={steps[activeStep].formInfo}
                            multiple={steps[activeStep].multiple}
                            onNext={onSubmit}
                            onBack={onBack}
                            isLastStep={activeStep === steps.length - 1}
                            currentStep={activeStep}
                            additionalInput={steps[activeStep].additionalInput}
                            updateValues={updateValues}
                        />
                    </Box>

                </Box>
            </Box>
        </BasicPage >
    );
}

export default PageWithStepper;
