import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getProjectOverviews } from './projects/getProjectOverview';
import { getProjectLogos } from './projects/getProjectLogos';
import { getProjectTitles } from './projects/getProjectTitles';
import { getProjectTitleFonts } from './projects/getProjectTitleFonts';
import { getProjectGithubURLs } from './projects/getProjectGithubUrls';
import { getProjectPrimaryColors } from './projects/getProjectPrimaryColors';

export type ProjectType = {
    id: string;
    name: string;
    logo: string;
    overview: string;
    titleFont: string;
    github_url: string;
    primaryColor: string;
}

type ProjectKey = 'x1dra' | 'extranyx' | 'cybrnet' | 'oversoulDb' | 'portfolio';

const projectKeys: ProjectKey[] = ['x1dra', 'extranyx', 'cybrnet', 'oversoulDb', 'portfolio'];

export type ProjectData = {
    [key in ProjectKey]: ProjectType;
}

type ProjectDataType = {
    [key: string]: { [k in ProjectKey]: any };
}

const fetchProjectData = (): ProjectDataType => ({
    overviews: getProjectOverviews(),
    logos: getProjectLogos(),
    titles: getProjectTitles(),
    titleFonts: getProjectTitleFonts(),
    github_urls: getProjectGithubURLs(),
    primaryColors: getProjectPrimaryColors(),
});

const createProject = (key: ProjectKey, data: ProjectDataType): ProjectType => ({
    id: uuidv4(),
    name: data.titles[key],
    logo: data.logos[key],
    overview: data.overviews[key],
    titleFont: data.titleFonts[key],
    github_url: data.github_urls[key],
    primaryColor: data.primaryColors[key]
})

export const generateProjectsData = (): ProjectData => {
    const projectData = fetchProjectData();
    return projectKeys.reduce((acc, key) => {
        acc[key] = createProject(key, projectData);
        return acc;
    }, {} as ProjectData);
}

export const projectsData = generateProjectsData();
