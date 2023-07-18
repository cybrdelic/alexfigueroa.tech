// CareerData.ts
export interface CareerDataType {
    jobTitle: string;
    company: string;
    period: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
  }
  
  export const careerData: CareerDataType = {
    jobTitle: "Associate Software Developer",
    company: "TalentNow",
    period: "June 2019 - Present",
    description: "Working in a dynamic team to build, test, and maintain front-end and back-end software. Communicating with team members to clarify requirements and overcome obstacles to meet the team goals.",
    responsibilities: [
      "Developing front-end website architecture.",
      "Designing user interactions on web pages.",
      "Developing back-end website applications.",
      "Creating servers and databases for functionality.",
      "Ensuring cross-platform optimization for mobile phones.",
    ],
    achievements: [
      "Developed a fast and efficient web application with React JS",
      "Implemented a full-featured backend service with Node.js and Express",
      "Increased website performance by 20%",
    ],
  };
  