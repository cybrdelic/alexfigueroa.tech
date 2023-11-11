import { ProjectKey } from "../project.data";

export const getProjectUrls = (): { [key in ProjectKey]: string } => {
    return {
        Blitzkrieg: 'https://github.com/yourusername/Blitzkrieg',
        WorkspaceAutomator: 'https://github.com/yourusername/WorkspaceAutomator',
        DynamicTaskLine: 'https://github.com/yourusername/DynamicTaskLine',
        TraceMate: 'https://github.com/yourusername/TraceMate',
        CodebaseSeed: 'https://github.com/yourusername/CodebaseSeed',
        CodebasedUtils: 'https://github.com/yourusername/CodebasedUtils',
        AlexFigueroaPortfolio: 'https://github.com/yourusername/AlexFigueroaPortfolio'
        // ... other projects with their respective URLs
    };
};
