import { RouteItem } from "./RouteItem.type";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage"
import ProjectsPage from "../pages/ProjectsPage"
import React from "react";
import CareerPage from "../pages/CareerPage"
import { ProjectType, projectsData } from "../data/project.data";
import ProjectDetail from "../components/ProjectsView/ProjectDetail";

export const baseRoutes: RouteItem[] = [
  { path: '/', element: <HomePage />, name: 'Home' },
  { path: '/career', element: <CareerPage />, name: 'Career' },
  { path: '/projects', element: <ProjectsPage />, name: 'Projects' },
  { path: '/about', element: <AboutPage />, name: 'About' },
];

const getProjectRouteItem = (project: ProjectType) => {
  const routeItem: RouteItem = {
    path: `/project/${project.name}`,
    element: <ProjectDetail project={project} />,
    name: project.name
  }

  return routeItem;
};

const getProjectRoutes = (projects: ProjectType[]) => {
  const projectRoutes: RouteItem[] = []
  projects.map(project => {
    projectRoutes.push(getProjectRouteItem(project))
  })

  return projectRoutes;
}
const getAllRoutes = (projects: ProjectType[]) => {
  const projectRoutes = getProjectRoutes(projects);
  const routes = [...baseRoutes].concat(projectRoutes)

  return routes;
}

const projectArray = Object.values(projectsData) as ProjectType[];
export const routes = getAllRoutes(projectArray);
