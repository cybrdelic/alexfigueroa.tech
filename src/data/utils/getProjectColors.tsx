import { ProjectKey } from "../project.data";

export type ProjectColorType = {
    primary: string;
    secondary: string;
};

export const getProjectColors = (): { [key in ProjectKey]: ProjectColorType } => {
    return {
        WorkspaceAutomator: { primary: '#007bff', secondary: '#FFD700' }, // Gold for contrast
        Blitzkrieg: { primary: '#28a745', secondary: '#FFC0CB' }, // Light Pink for contrast
        DynamicTaskLine: { primary: '#17a2b8', secondary: '#FF4500' }, // Orange Red for contrast
        TraceMate: { primary: '#ffc107', secondary: '#8B4513' }, // Darker Brown for contrast
        CodebaseSeed: { primary: '#dc3545', secondary: '#00FFFF' }, // Cyan for contrast
        CodebasedUtils: { primary: '#fd7e14', secondary: '#4682B4' }, // Steel Blue for contrast
        AlexFigueroaPortfolio: { primary: '#6f42c1', secondary: '#FFD700' } // Gold for contrast
    };
};
