import { RouteItem } from "./RouteItem.type";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage"
import ProjectsPage from "../pages/ProjectsPage"
import React from "react";
import CareerPage from "../pages/CareerPage"

export const routes: RouteItem[] = [
    { path: '/', element: <HomePage />, name: 'Home' },
    { path: '/career', element: <CareerPage />, name: 'Career' },
    { path: '/projects', element: <ProjectsPage/>, name: 'Projects' },
    { path: '/about', element: <AboutPage />, name: 'About' },
  ];