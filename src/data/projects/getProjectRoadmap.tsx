import { TimelineItemType } from "../project.data";

const getX1draRoadmap = (): TimelineItemType[] => {
    return [
        {
            title: 'Scoping',
            description: 'Determine project requirements',
            datetime: 'February 2023',
            timelineIndex: 1
        },
        {
            title: 'Design',
            description: 'Design software architecture',
            datetime: 'March 2023',
            timelineIndex: 2
        },
        // more timeline items...
    ];
}

const getExtranyxRoadmap = (): TimelineItemType[] => {
    return [
        {
            title: 'Planning',
            description: 'Define project objectives',
            datetime: 'January 2023',
            timelineIndex: 1
        },
        {
            title: 'Development',
            description: 'Start development phase',
            datetime: 'April 2023',
            timelineIndex: 2
        },
        // more timeline items...
    ];
}

const getCybrnetRoadmap = (): TimelineItemType[] => {
    return [
        {
            title: 'Brainstorming',
            description: 'Identify key features',
            datetime: 'January 2023',
            timelineIndex: 1
        },
        {
            title: 'Prototype',
            description: 'Develop a functional prototype',
            datetime: 'May 2023',
            timelineIndex: 2
        },
        // more timeline items...
    ];
}

const getOversoulDbRoadmap = (): TimelineItemType[] => {
    return [
        {
            title: 'Research',
            description: 'Study market trends and competitors',
            datetime: 'February 2023',
            timelineIndex: 1
        },
        {
            title: 'Implementation',
            description: 'Begin software implementation',
            datetime: 'June 2023',
            timelineIndex: 2
        },
        // more timeline items...
    ];
}

const getPortfolioRoadmap = (): TimelineItemType[] => {
    return [
        {
            title: 'Gathering Content',
            description: 'Collect projects and achievements',
            datetime: 'January 2023',
            timelineIndex: 1
        },
        {
            title: 'Website Development',
            description: 'Build the portfolio website',
            datetime: 'April 2023',
            timelineIndex: 2
        },
        // more timeline items...
    ];
}

export const getProjectRoadmaps = () => {
    const x1dra = getX1draRoadmap();
    const extranyx = getExtranyxRoadmap();
    const cybrnet = getCybrnetRoadmap();
    const oversoulDb = getOversoulDbRoadmap();
    const portfolio = getPortfolioRoadmap();

    return { x1dra, extranyx, cybrnet, oversoulDb, portfolio }
}
