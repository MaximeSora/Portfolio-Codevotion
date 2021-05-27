import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'components/Image';
import Link from 'components/Link';
import { Button } from 'components/Button';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectBackground,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectSectionBigHeading,
  ProjectSectionNextProject,
  ProjectSectionHeading,
  ProjectSectionColumns,
  ProjectTextRow,
  ProjectSectionText,
} from 'components/ProjectLayout';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext, useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import prerender from 'utils/prerender';
import deviceModelsBackground from 'assets/device-models-background.jpg';
import deviceModelsBackgroundLarge from 'assets/device-models-background-large.jpg';
import deviceModelsBackgroundPlaceholder from 'assets/device-models-background-placeholder.jpg';
import deviceModels from 'assets/device-models.jpg';
import deviceModelsLarge from 'assets/device-models-large.jpg';
import deviceModelsPlaceholder from 'assets/device-models-placeholder.jpg';
import solbaseBackground from 'assets/solbase/thumbnail.png';

const title = 'Solbase';
const description =
  "Application Web permettant d'apprendre le solfège grâce au jeu qui favorise la mémorisation.";
const roles = [
  'Strategy',
  'Creative Direction',
  'UX and UI Design',
  'Prototyping'
];

const ProjectDM = () => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  useScrollRestore();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Projects | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${solbaseBackground} 1080w, ${solbaseBackground} 2160w`}
          placeholder={deviceModelsBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.behance.net/gallery/115425137/Solbase-UIUX-Musical-Games-Webapp-Design?tracking_source=search_projects_recommended%7Csolbase"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Contexte du projet</ProjectSectionHeading>
              <ProjectSectionText>
               Encore beaucoup de personnes se sentent désarmées face à l'apprentissage du solfège et considèrent que passer cette étape peut leur suffire.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
            <ProjectSectionHeading>Objectif</ProjectSectionHeading>
              <ProjectSectionText>
                Créer un site mobile-first qui permet aux débutants d'apprendre des sujets spécifiques liés au solfège au travers de tutoriels et autres méthodes d'apprentissage. 
                Nous devons en conséquence imaginer un concept, trouver les cibles et produire un produit ou service qui répond à leurs besoins.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Réponse au brief</ProjectSectionHeading>
            <ProjectSectionText>
              Proposer une expérience web permettant de gamifier l'apprentissage du solfège au travers de jeux qui emmènent l'utilisateur vers la 
              découverte des étapes les plus primordiales pour bien progresser dans ce domaine. Le but étant d'amener un usage régulier de notre produit via la gamification et ses récompenses, 
              afin de progresser sur le long terme.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionText>
                NEXT PROJECT
              </ProjectSectionText>
              <ProjectSectionNextProject>Fan Experience - JO</ProjectSectionNextProject>
              <Button
                secondary
                iconHoverShift
                icon="arrowRight"
                href="/projects/JO"
              >
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectDM;
