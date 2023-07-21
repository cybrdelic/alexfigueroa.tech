import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import ListWithHoverEffect from "../components/ListWithHoverEffect/index";
import { useTheme } from '../hooks/useTheme';
import { CareerDataType, careerData as careerDataValues } from '../data/career.data'; // assumed import
import { usePageTransitions } from '../hooks/usePageTransitions';
import PageTransition from '../components/PageTransition';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  overflow-x: hidden;
`;

const Card = styled(motion.div)`
  border-radius: 5px;
  padding: 2rem;
  margin: 1rem;
  width: 80%;
`;

const Title = styled(motion.h1)(({ theme }) => `
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${theme.text};
`);
const Company = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: red;
`;

const Period = styled(motion.h3)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.text};
`;

const Description = styled(motion.p)`
  margin-bottom: 2rem;
`;

const AdditionalInfo = styled(motion.div)`
  margin-top: 2rem;
`

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Wrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`

export default function CareerPage() {
  const [careerData, setCareerData] = useState<CareerDataType | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null);
  const theme = useTheme();

  const { onPageEnter, controls } = usePageTransitions();

  useEffect(() => {
    setCareerData(careerDataValues);
    onPageEnter(); // Run the animation whenever the careerData is updated.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // Only run once on mount.


  const handleClick = (item: string) => {
    setAdditionalInfo(item);
  };

  return (
    <PageTransition>
      <Wrapper>
        <Container
          key={'CAREER'}
          animate={controls}
          initial={{ opacity: 0, x: '100vw' }}
          exit={{ opacity: 0, x: '-100vw', transition: { ease: 'easeInOut', duration: 0.3 } }}
        >
          <Card
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Title
              theme={theme}
              variants={{ ...fadeVariant, hidden: { ...fadeVariant.hidden, y: 20 }, visible: { ...fadeVariant.visible, y: 0, transition: { ...fadeVariant.visible.transition, delay: 0.1 } } }}
            >
              {careerData?.jobTitle}
            </Title>
            <Company
              theme={theme}
              variants={{ ...fadeVariant, hidden: { ...fadeVariant.hidden, y: 20 }, visible: { ...fadeVariant.visible, y: 0, transition: { ...fadeVariant.visible.transition, delay: 0.2 } } }}
            >
              {careerData?.company}
            </Company>
            <Period theme={theme} variants={fadeVariant} initial="hidden" animate="visible">{careerData?.period}</Period>
            <Description variants={fadeVariant} initial="hidden" animate="visible">{careerData?.description}</Description>
            <h4>Responsibilities:</h4>
            <ListWithHoverEffect items={careerData?.responsibilities ?? ['']} onItemClick={handleClick} />
            <h4>Achievements:</h4>
            <ListWithHoverEffect items={careerData?.achievements ?? ['']} onItemClick={handleClick} />
            {additionalInfo && (
              <AdditionalInfo
                variants={fadeVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p>You clicked on: {additionalInfo}</p>
                <button onClick={() => setAdditionalInfo(null)}>Close</button>
              </AdditionalInfo>
            )}
          </Card>
        </Container>
      </Wrapper >
    </PageTransition>
  );
}
