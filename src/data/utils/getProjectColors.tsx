import { ProjectKey } from "../project.data";

export type ProjectColorType = {
    primary: string;
    secondary: string;
};

export const getProjectColors = (): { [key in ProjectKey]: ProjectColorType } => {
    return {
        WorkspaceAutomator: { primary: '#102027', secondary: '#FFD600' }, // Slate Black with Neon Yellow
        Blitzkrieg: { primary: '#1B1F3B', secondary: '#FF4081' }, // Deep Midnight Blue with Neon Pink
        DynamicTaskLine: { primary: '#0D47A1', secondary: '#00E676' }, // Dark Blue with Fluorescent Green
        TraceMate: { primary: '#1A237E', secondary: '#FFAB40' }, // Indigo with Neon Orange
        CodebaseSeed: { primary: '#3E2723', secondary: '#69F0AE' }, // Deep Brown with Neon Aquamarine
        CodebasedUtils: { primary: '#263238', secondary: '#7C4DFF' }, // Dark Blue Grey with Light Purple
        AlexFigueroaPortfolio: { primary: '#2C3A47', secondary: '#FF5252' } // Dark Slate Grey with Bright Red
    };
};
