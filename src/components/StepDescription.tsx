import { Card, CardContent, Divider, Typography } from "@mui/material"



const StepDescription = ({ steps, activeStep }: { steps: Array<{ stepName: string, description: string }>, activeStep: number }) => {
    return (
        <>
            <Card sx={{ padding: 0, marginBottom: 2}}
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
        </>
    )
}


export default StepDescription;