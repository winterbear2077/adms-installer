import { AppBar, Button, Toolbar, Typography } from "@mui/material";


const InstallNav = () => {
    return <>
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ADMS Installer
                </Typography>
                <Button color="inherit">登录</Button>
            </Toolbar>
        </AppBar>
    </>
}

export default InstallNav