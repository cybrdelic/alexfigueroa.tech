// contexts/ActiveProjectContext.tsx

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { ProjectType } from '../data/project.data'; // Adjust the import path as needed

// Define the context's value type
interface ActiveProjectContextType {
    activeProject: ProjectType | null;
    setActiveProject: Dispatch<SetStateAction<ProjectType | null>>;
}

// Create the context with an initial undefined value
export const ActiveProjectContext = createContext<ActiveProjectContextType | undefined>(undefined);

// Provider component type
interface ActiveProjectProviderProps {
    children: ReactNode;
}

export const ActiveProjectProvider: React.FC<ActiveProjectProviderProps> = ({ children }) => {
    const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

    return (
        <ActiveProjectContext.Provider value={{ activeProject, setActiveProject }}>
            {children}
        </ActiveProjectContext.Provider>
    );
};

// Custom hook for accessing the context
export const useActiveProject = (): ActiveProjectContextType => {
    const context = useContext(ActiveProjectContext);
    if (!context) {
        throw new Error('useActiveProject must be used within an ActiveProjectProvider');
    }
    return context;
};
