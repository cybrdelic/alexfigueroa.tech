import React from "react";
import HeroComponent from '../components/HeroComponent';
import PageTransition from "../components/PageTransition";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {

  return (
    <HeroComponent />
  );
}

export default (HomePage);
