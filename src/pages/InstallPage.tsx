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


const steps: StepInfo[] = [
    {
        stepName: "Upload", description: "Upload the installation package", formInfo: [{
            name: "admsPackages",
            type: "file",
            title: "Installation Package",
            required: true,
            defaultValue: "",
            placeholder: "Select installation package",
        }

        ],
    },
    {
        stepName: "Configure",
        description: "Configure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settingsConfigure the installation settings",
        formInfo: [
            {
                name: "hostname",
                type: "text",
                title: "Hostname",
                required: true,
                defaultValue: "localhost",
                placeholder: "Enter hostname",

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
        ],
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
                placeholder: "",
                rules: {
                    pattern: {
                        value: /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])){3}$/,
                        message: "Invalid hostname format"
                    }
                }
            },
            {
                name: "interface",
                type: "text",
                title: "network interface",
                required: true,
                placeholder: "",
                select: {
                    enable: true,
                    options: [],
                    loadOptions: async () => await get_interface,
                    multiple: true,
                },

            },
        ],
        multiple: true,
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