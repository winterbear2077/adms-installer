import { Box } from "@mui/material"
import InstallNav from "./InstallerNav"
import React from "react"

const BasicPage = ({ children, welcome }: { children: React.ReactElement, welcome?: string }) => {
    return (<Box sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
        <InstallNav welcome={welcome} />
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 64px)',
                padding: 2,
                overflow: 'hidden',
                marginTop: '64px'
            }}
        >
            {children}
        </Box>
    </Box>)
}

export default BasicPage