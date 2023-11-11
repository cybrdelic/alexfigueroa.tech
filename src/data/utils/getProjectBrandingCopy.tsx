import { ProjectKey } from "../project.data";
import { blitzkriegData } from "../projects/blitzkrieg";
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

    return {
        Blitzkrieg,
        WorkspaceAutomator
    }
}
