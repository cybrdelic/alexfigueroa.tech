import React from 'react';
import styled from 'styled-components';

const StyledMotionH4 = styled.h4`
  /* your CSS styles here */
`;

const StyledMotionP = styled.p`
  /* your CSS styles here */
`;

const StyledMotionUl = styled.ul`
  /* your CSS styles here */
`;

const StyledMotionLi = styled.li`
  /* your CSS styles here */
`;

type CaseStudyType = {
    title: string;
    subtitle: string;
    abstract: string;
    problem: string;
    solution: string;
    technologies: string[];
    implementation: string[];
    results: string;
}

type CaseStudyProps = {
    caseStudy: CaseStudyType;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ caseStudy }) => {

    if (!caseStudy || caseStudy === undefined) {
        return (
            <div>
                Case Study supposed to be here
            </div>
        )
    }

    return (
        <div>
            <StyledMotionH4>{caseStudy.title} - {caseStudy.subtitle}</StyledMotionH4>
            <StyledMotionP>{caseStudy.abstract}</StyledMotionP>
            <StyledMotionH4>Problem</StyledMotionH4>
            <StyledMotionP>{caseStudy.problem}</StyledMotionP>
            <StyledMotionH4>Solution</StyledMotionH4>
            <StyledMotionP>{caseStudy.solution}</StyledMotionP>
            <StyledMotionH4>Technologies Used</StyledMotionH4>
            <StyledMotionUl>
                {caseStudy.technologies.map((tech, index) => (
                    <StyledMotionLi key={index}>{tech}</StyledMotionLi>
                ))}
            </StyledMotionUl>
            <StyledMotionH4>Implementation</StyledMotionH4>
            <StyledMotionUl>
                {caseStudy.implementation.map((step, index) => (
                    <StyledMotionLi key={index}>{step}</StyledMotionLi>
                ))}
            </StyledMotionUl>
            <StyledMotionH4>Results</StyledMotionH4>
            <StyledMotionP>{caseStudy.results}</StyledMotionP>
        </div>
    );
};

export default CaseStudy;
