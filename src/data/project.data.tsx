import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ProjectBrandingType, getProjectBrandingCopy } from './projects/getProjectBrandingCopy';
import { getProjectUrls } from './projects/getProjectUrls';

export type ProjectKey = 'WorkspaceAutomator' | 'Blitzkrieg' | 'DynamicTaskLine' | 'TraceMate' | 'CodebaseSeed' | 'CodebasedUtils' | 'AlexFigueroaPortfolio';

export type ProjectType = {
    id: string;
    branding: ProjectBrandingType;
    github_url: string; // Keep the GitHub URL here
    // Add any other fields you might need
};

export type ProjectData = {
    [key in ProjectKey]: ProjectType;
};

const fetchProjectData = (): ProjectData => {
    const brandingCopy = getProjectBrandingCopy();
    const projectUrls = getProjectUrls();

    return Object.keys(brandingCopy).reduce((acc, key) => {
        const projectKey = key as ProjectKey;
        acc[projectKey] = {
            id: uuidv4(),
            branding: brandingCopy[projectKey],
            github_url: projectUrls[projectKey],
        };
        return acc;
    }, {} as ProjectData);
};

export const projectsData = fetchProjectData();
