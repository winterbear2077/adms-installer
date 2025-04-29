import { Typography } from "@mui/material";
import FilePicker from "../components/FilePicker";
import PageWithStepper, { StepInfo } from "../components/PageWithStepper";
import { invoke } from "@tauri-apps/api/core";

const fileFilters = [
    {
        name: "Archive Files",
        extensions: ["tar", "tgz", "zip", "tar.gz"]
    }
]

const get_interface = invoke<Promise<string[]>>("get_interfaces");
// export interface StepInfo {
//     stepName: string,
//     description: string,
//     formInfo: Array<BasicInputProps>,
//     additionalInput?: React.ReactNode,
//     handleSubmit?: () => void,
// }


// function SidePage({ steps, handleSubmitAll }: { steps: Array<StepInfo>, handleSubmitAll: () => void }) { }


const FileComponent = () => {
    return (
        <>
            <Typography>Installation Package</Typography>
            <FilePicker fileFilters={fileFilters} filePickProps={{ onFileSelected: () => { console.log() } }} />
        </>

    )
}

const steps: StepInfo[] = [
    {
        stepName: "Upload", description: "Upload the installation package", formInfo: [

        ],
        additionalInput: (<FileComponent />)
    },
    {
        stepName: "Configure",
        description: "Configure the installation settings",
        formInfo: [
            {
                name: "hostname",
                type: "text",
                title: "Hostname",
                required: true,
                defaultValue: "localhost",
                placeholder: "Enter hostname"
            },
            {
                name: "username",
                type: "text",
                title: "Username",
                required: true,
                defaultValue: "admin",
                placeholder: "Enter username"
            },
            {
                name: "password",
                type: "password",
                title: "Password",
                required: true,
                defaultValue: "",
                placeholder: "Enter password"
            }
        ]
    },
    {
        stepName: "Install",
        description: "Click to install",
        formInfo: []
    },
    {
        stepName: "Finish",
        description: "Installation completed",
        formInfo: []
    },
    {
        stepName: "Configure network settings",
        description: "Configure network settings",
        formInfo: [
            {
                name: "ip",
                type: "text",
                title: "IP Address",
                required: true,
                defaultValue: "",
                placeholder: ""
            },
            {
                name: "interface",
                type: "text",
                title: "network interface",
                required: true,
                placeholder: "",
                select: true,
                loadOptions: async () => await get_interface,
            }
        ]
    },
    {
        stepName: "Ready to complete stage 1",
        description: "Ready to complete stage 1",
        formInfo: []
    }
]

const InstallPage = () => {
    return (
        <PageWithStepper steps={steps} />
    )
}

export default InstallPage;