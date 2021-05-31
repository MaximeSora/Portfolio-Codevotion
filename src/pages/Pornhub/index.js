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
  ProjectSectionHeading,
  ProjectSectionNextProject,
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
import pornhubBackground from 'assets/pornhub/thumbnail.png';

const title = 'Pornhub Eco-Friendly';
const description =
  'Redesign de la plateforme Pornhub pour proposer une expérience plus eco-friendly';
const roles = [
  'Creative Direction',
  'UX and UI Design',
  'User Research',
  'Strategy',
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
          srcSet={`${pornhubBackground} 1080w, ${pornhubBackground} 2160w`}
          placeholder={deviceModelsBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          // url="https://esd-paris.medium.com/redesign-pornhub-2020-aa368003c1cb"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Contexte du projet</ProjectSectionHeading>
              <ProjectSectionText>
              Aujourd’hui, le visionnage de vidéos pornographiques génère 82 millions de tonnes de CO2 chaque année 
              soit deux fois plus que l’Irlande.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
            <ProjectSectionHeading>Objectif</ProjectSectionHeading>
              <ProjectSectionText>
              L’objectif était de concevoir une nouvelle façon plus écologique de consommer le porno 
              en redesignant l’expérience utilisateur de Pornhub dans le but de réduire son impact environnemental.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Réponse au brief</ProjectSectionHeading>
            <ProjectSectionText>
            Ce re-design de PornHub consiste à proposer une web app mobile de vidéos éphémères qui sera dans un premier temps proposée en version beta. La principale nouveauté par rapport à l’existant est l’ajout de contenus audios.
             L’utilisateur pourra écouter des musiques d’ambiance, des histoires érotiques, du porno audio ou encore de l’ASMR.
            </ProjectSectionText>
            <Button iconHoverShift href="https://esd-paris.medium.com/redesign-pornhub-2020-aa368003c1cb" iconEnd="arrowRight">
              Voir le projet sur Medium
            </Button>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionText>
                NEXT PROJECT
              </ProjectSectionText>
              <ProjectSectionNextProject>Solbase</ProjectSectionNextProject>
              <Button
                secondary
                iconHoverShift
                icon="arrowRight"
                href="/projects/solbase"
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
