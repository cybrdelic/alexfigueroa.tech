import { CaseStudyType, ProjectKey } from "../project.data";

const getX1draCaseStudies = (): CaseStudyType[] => {
    return [
        {
            title: 'Engineering Challenge 1',
            subtitle: 'Dealing with scalability',
            abstract: 'This case study addresses the problem of ensuring scalability in the X1DRA project.',
            problem: 'Our initial implementation suffered from performance issues when the system load increased.',
            solution: 'We decided to implement a distributed system design to overcome scalability issues.',
            technologies: ['Docker', 'Kubernetes', 'RabbitMQ'],
            implementation: [
                'First, we dockerized our services to ensure they can run in different environments without any issues.',
                'Next, we used Kubernetes to manage our containerized services. It allowed us to easily scale up or down based on the load.',
                'Finally, we used RabbitMQ for inter-service communication. It ensured that our services can communicate effectively even when the load is high.'
            ],
            results: 'As a result, we were able to ensure that our system can handle high loads without any performance degradation.',
        },
    ];
}

const getExtranyxCaseStudies = (): CaseStudyType[] => {
    return [
        {
            title: 'Engineering Challenge 1',
            subtitle: 'Optimizing the extrapolation algorithm',
            abstract: 'This case study discusses how we optimized the extrapolation algorithm in the EXTRANYX project.',
            problem: 'The original algorithm had a time complexity of O(n^2), which was inefficient for large inputs.',
            solution: 'We revised the algorithm and implemented a dynamic programming approach to reduce the time complexity.',
            technologies: ['Python', 'NumPy', 'SciPy'],
            implementation: [
                'We first modeled the problem as a shortest path problem.',
                'Next, we used a dynamic programming approach to solve it, reducing the time complexity to O(n log n).',
                'Finally, we used Python libraries like NumPy and SciPy to efficiently handle large data sets.'
            ],
            results: 'With this optimization, the algorithm can now handle larger inputs more efficiently.',
        },
    ];
}

const getCybrnetCaseStudies = (): CaseStudyType[] => {
    return [
        {
            title: 'Engineering Challenge 1',
            subtitle: 'Implementing an end-to-end testing strategy',
            abstract: 'This case study explores the challenges of implementing an effective end-to-end testing strategy in the CYBRNET project.',
            problem: 'The project lacked a comprehensive testing strategy, leading to unexpected bugs during production.',
            solution: 'We adopted an end-to-end testing strategy using a combination of unit, integration, and system tests.',
            technologies: ['Jest', 'React Testing Library', 'Cypress'],
            implementation: [
                'We used Jest for unit testing, ensuring each function works as intended.',
                'For integration testing, we used React Testing Library to simulate user interactions.',
                'Lastly, we adopted Cypress for system testing, validating the system functionality as a whole.'
            ],
            results: 'The new testing strategy significantly reduced the number of bugs reaching production.',
        },
    ];
}

const getOversoulDbCaseStudies = (): CaseStudyType[] => {
    return [
        {
            title: 'Engineering Challenge 1',
            subtitle: 'Creating a Hybrid Database Framework',
            abstract: 'This case study revolves around the challenge of creating a hybrid database framework for both local and cloud services.',
            problem: 'The initial versions of OVERSOULDB were designed for local systems which created problems when implemented with cloud services.',
            solution: 'We redesigned the architecture to work efficiently both with local systems and cloud services.',
            technologies: ['SQL', 'NoSQL', 'AWS', 'Google Cloud'],
            implementation: [
                'We started by decoupling the components responsible for local and cloud database management.',
                'Next, we created an interface that could communicate with both types of components seamlessly.',
                'Lastly, we implemented specific optimizations for each type of database system.'
            ],
            results: 'As a result, OVERSOULDB became a hybrid database system capable of working efficiently with both local systems and cloud services.',
        },
    ];
}

const getPortfolioCaseStudies = (): CaseStudyType[] => {
    return [
        {
            title: 'Engineering Challenge 1',
            subtitle: 'Showcasing a Broad Range of Projects',
            abstract: 'This case study discusses the challenge of effectively showcasing a wide range of projects in a single portfolio.',
            problem: 'The initial version of the portfolio was cluttered and confusing due to the diverse nature of projects.',
            solution: 'We decided to categorize the projects and implemented a filter feature for better navigation.',
            technologies: ['React', 'Redux', 'Material-UI'],
            implementation: [
                'We started by categorizing all projects according to their main technologies and purposes.',
                'Next, we implemented a filter feature using Redux for state management.',
                'Lastly, we created a clean and intuitive user interface with Material-UI.'
            ],
            results: 'As a result, the portfolio became much more user-friendly, allowing visitors to easily navigate through different projects.',
        },
    ];
}


export const getProjectCaseStudies = (): { [key in ProjectKey]: CaseStudyType[] } => {
    return {
        x1dra: getX1draCaseStudies(),
        extranyx: getExtranyxCaseStudies(),
        cybrnet: getCybrnetCaseStudies(),
        oversoulDb: getOversoulDbCaseStudies(),
        portfolio: getPortfolioCaseStudies(),
    };
}
