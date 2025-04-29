import { Step, StepLabel, Stepper } from "@mui/material";


export default function SideStepper({ activeStep, steps }: { activeStep: number, steps: Array<{ stepName: string }> }) {

    return (
        <>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((info, index) => (
                    <Step key={index}>
                        <StepLabel>{info.stepName}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}