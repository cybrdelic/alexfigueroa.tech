import { RouteItem } from "./RouteItem.type";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage"
import React from "react";

export const routes: RouteItem[] = [
    { path: '/', element: <HomePage /> },
    { path: '/about', element: <AboutPage /> },
  ];