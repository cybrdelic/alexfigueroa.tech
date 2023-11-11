import { ProjectKey } from "../project.data";
import { alexFigueroaData } from "../projects/alexFigueroaPortfolio";
import { blitzkriegData } from "../projects/blitzkrieg";
import { codebaseSeedData } from "../projects/codebaseSeed";
import { codebasedUtilsData } from "../projects/codebasedUtils";
import { dynamicTasklineData } from "../projects/dynamicTaskLine";
import { traceMateData } from "../projects/traceMate";
import { workspaceAutomatorData } from "../projects/workspaceAutomator";

export type ProjectBrandingType = {
    title: string;
    brandedHook: string;
    subtitle: string;
    detailedDescription: string;
    uniqueSellingPoints: string[];
    features: string[];
    technicalBreakdown: string;
    systemDesign: string;
    useCases: string[];
    integrationCompatibility: string[];
    futureRoadmap: string[];
    faqs: { question: string; answer: string; }[];
    comparativeAnalysis: string;
};

export const getProjectBrandingCopy = (): { [key in ProjectKey]: ProjectBrandingType } => {
    const Blitzkrieg: ProjectBrandingType = blitzkriegData
    const WorkspaceAutomator: ProjectBrandingType = workspaceAutomatorData
    const DynamicTaskLine: ProjectBrandingType = dynamicTasklineData
    const AlexFigueroaPortfolio: ProjectBrandingType = alexFigueroaData
    const CodebaseSeed: ProjectBrandingType = codebaseSeedData
    const CodebasedUtils: ProjectBrandingType = codebasedUtilsData
    const TraceMate: ProjectBrandingType = traceMateData

    return {
        Blitzkrieg: Blitzkrieg,
        WorkspaceAutomator: WorkspaceAutomator,
        DynamicTaskLine: DynamicTaskLine,
        AlexFigueroaPortfolio: AlexFigueroaPortfolio,
        CodebaseSeed: CodebaseSeed,
        CodebasedUtils: CodebasedUtils,
        TraceMate: TraceMate
    }
}
