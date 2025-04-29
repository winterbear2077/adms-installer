import { AppBar, Toolbar, Typography } from "@mui/material";
import MaterialUISwitch from "./styleSwitch";


const InstallNav = ({ welcome }: { welcome?: string }) => {
    return <>
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {welcome ? welcome : "Welcome to the Installer"}
                </Typography>
                <MaterialUISwitch />
            </Toolbar>
        </AppBar>
    </>
}

export default InstallNav