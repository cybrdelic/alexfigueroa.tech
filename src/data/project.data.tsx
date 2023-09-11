import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getProjectOverviews } from './projects/getProjectOverview';
import { getProjectLogoPhotos, getProjectLogos } from './projects/getProjectLogos';
import { getProjectTitles } from './projects/getProjectTitles';
import { getProjectTitleFonts } from './projects/getProjectTitleFonts';
import { getProjectGithubURLs } from './projects/getProjectGithubUrls';
import { getProjectPrimaryColors } from './projects/getProjectPrimaryColors';
import { getProjectSubtitles } from './projects/getProjectSubtitles';
import { getProjectImages } from './projects/getProjectImages';
import { getProjectTechnologies } from './projects/getProjectTechnologies';
import { getProjectFeatures } from './projects/getProjectFeatures';
import { getProjectTeam } from './projects/getProjectTeam';
import { getProjectRoadmaps } from './projects/getProjectRoadmap';
import { getProjectCaseStudies } from './projects/getProjectCaseStudies';

export type TimelineItemType = {
    timelineIndex: number;
    datetime: string;
    title: string;
    description: string;
    subtitle?: string;
}

export type CaseStudyType = {
    title: string;
    subtitle: string;
    abstract: string;
    problem: string;
    solution: string;
    technologies: string[];
    implementation: string[];
    results: string;
}

export type ProjectType = {
    id: string;
    name: string;
    logo: string;
    logoPhoto: string;
    overview: string;
    titleFont: string;
    github_url: string;
    primaryColor: string;
    subtitle: string;
    images: string[];
    technologies: string[];
    features: string[];
    team: {
        name: string;
        avatar: string;
        role: string;
    }[];
    roadmap: TimelineItemType[];
    caseStudies: CaseStudyType[];
}

export type ProjectKey = 'x1dra' | 'extranyx' | 'cybrnet' | 'oversoulDb' | 'portfolio';

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
    logoPhotos: getProjectLogoPhotos(),
    titles: getProjectTitles(),
    titleFonts: getProjectTitleFonts(),
    github_urls: getProjectGithubURLs(),
    primaryColors: getProjectPrimaryColors(),
    subtitles: getProjectSubtitles(),
    images: getProjectImages(),
    technologies: getProjectTechnologies(),
    features: getProjectFeatures(),
    team: getProjectTeam(),
    roadmaps: getProjectRoadmaps(),
    caseStudies: getProjectCaseStudies(),
});


const createProject = (key: ProjectKey, data: ProjectDataType): ProjectType => ({
    id: uuidv4(),
    name: data.titles[key],
    logo: data.logos[key],
    logoPhoto: data.logoPhotos[key],
    overview: data.overviews[key],
    titleFont: data.titleFonts[key],
    github_url: data.github_urls[key],
    primaryColor: data.primaryColors[key],
    subtitle: data.subtitles[key],
    images: data.images[key],
    technologies: data.technologies[key],
    features: data.features[key],
    team: data.team[key],
    roadmap: data.roadmaps[key],
    caseStudies: data.caseStudies[key],
})


export const generateProjectsData = (): ProjectData => {
    const projectData = fetchProjectData();
    return projectKeys.reduce((acc, key) => {
        acc[key] = createProject(key, projectData);
        return acc;
    }, {} as ProjectData);
}

export const projectsData = generateProjectsData();
