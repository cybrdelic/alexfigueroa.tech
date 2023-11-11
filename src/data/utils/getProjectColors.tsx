import { ProjectKey } from "../project.data";

export type ProjectColorType = {
    primary: string;
    secondary: string;
};
export const getProjectColors = (): { [key in ProjectKey]: ProjectColorType } => {
    return {
        WorkspaceAutomator: { primary: '#007bff', secondary: '#6c757d' },
        Blitzkrieg: { primary: '#28a745', secondary: '#6c757d' },
        DynamicTaskLine: { primary: '#17a2b8', secondary: '#6c757d' },
        TraceMate: { primary: '#ffc107', secondary: '#6c757d' },
        CodebaseSeed: { primary: '#dc3545', secondary: '#6c757d' },
        CodebasedUtils: { primary: '#fd7e14', secondary: '#6c757d' },
        AlexFigueroaPortfolio: { primary: '#6f42c1', secondary: '#6c757d' }
    };
};
