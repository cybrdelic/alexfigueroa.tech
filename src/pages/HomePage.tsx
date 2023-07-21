import React from "react";
import HeroComponent from '../components/HeroComponent';
import RecentProjects from '../components/RecentProjects';
import RecentBlogs from '../components/RecentBlogs';
import Introduction from '../components/Introduction';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { withAnimations } from "../hooks/animation/withAnimations";
import { useTheme } from "../hooks/useTheme";
import PageTransition from "../components/PageTransition";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {

  return (
    <PageTransition>
      <HeroComponent />
      <RecentProjects />
      <RecentBlogs />
      <Footer />
    </PageTransition>
  );
}

export default withAnimations('fadeIn')(HomePage);
