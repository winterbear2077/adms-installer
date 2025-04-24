import FilePicker from "../components/FilePiker";
import SidePage, { StepInfo } from "../components/SideStepper";

const steps: StepInfo[] = [
    {
        stepName: "Upload", description: "Upload the installation package", formInfo: [],
        additionalInput: (<FilePicker />)
    },
    {
        stepName: "Configure",
        description: "Configure the installation settings",
        formInfo: [
            {
                title: "Install Path", type: "text",
                placeholder: "",
                required: true
            },
            {
                title: "Port", type: "number",
                placeholder: "",
            },
            {
                title: "Username", type: "text",
                placeholder: "",
            },
            {
                title: "Password", type: "password",
                placeholder: "",
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
                title: "IP Address", type: "text",
                placeholder: "",
            },
            {
                title: "Subnet Mask", type: "text",
                placeholder: "",
            },
            {
                title: "Gateway", type: "text",
                placeholder: "",
            },
            {
                title: "DNS", type: "text",
                placeholder: "",
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
        <SidePage steps={steps} />
    )
}

export default InstallPage;