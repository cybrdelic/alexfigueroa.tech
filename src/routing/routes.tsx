import { RouteItem } from "./RouteItem.type";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage"
import ProjectsPage from "../pages/ProjectsPage"
import React from "react";

export const routes: RouteItem[] = [
    { path: '/', element: <HomePage /> },
    { path: '/projects', element: <ProjectsPage/> },
    { path: '/about', element: <AboutPage /> },
  ];