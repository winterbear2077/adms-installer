import { Card, CardContent, Divider, Typography } from "@mui/material";

const StepDescription = ({ steps, activeStep }: { steps: Array<{ stepName: string, description: string }>, activeStep: number }) => {
    return (
        <>
            <Card sx={{
                padding: 0,
                marginBottom: 0,
                display: "flex",
                flexDirection: "column",
                height: "10vh"
            }} elevation={0}>
                <CardContent sx={{ paddingBottom: 0, padding: 0, display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        {steps[activeStep].stepName}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{
                            overflowY: "auto",
                        }}
                    >
                        {steps[activeStep].description}
                    </Typography>
                </CardContent>
            </Card >
            <Divider sx={{ marginTop: 1, marginBottom: 5 }} />

        </>
    );
}

export default StepDescription;