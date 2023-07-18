import React from "react";
import HeroComponent from '../components/HeroComponent';
import RecentProjects from '../components/RecentProjects';
import RecentBlogs from '../components/RecentBlogs';
import Introduction from '../components/Introduction';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { withAnimations } from "../hooks/animation/withAnimations";
import { useTheme } from "../hooks/useTheme";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
  
  return (
    <div>
      <HeroComponent />
      <RecentProjects />
      <RecentBlogs />
      <Footer />
    </div>
  );
}

export default withAnimations('fadeIn')(HomePage);
