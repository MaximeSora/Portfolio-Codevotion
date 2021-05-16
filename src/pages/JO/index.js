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
import arborescence from 'assets/jo/arbo.png';
import deviceModelsLarge from 'assets/device-models-large.jpg';
import arborescencePlaceholder from 'assets/jo/arbo.png';
import torch from 'assets/jo/endi.mp4';
import torchPlaceholder from 'assets/jo/endi.mp4';
import concept from 'assets/jo/girl_run_tel_7.mp4';
import conceptPlaceholder from 'assets/jo/girl_run_tel_7.mp4';
import girlHome from 'assets/jo/stretch_mobile.mp4';
import girlHomePlaceholder from 'assets/jo/stretch_mobile.mp4';
import girlRun from 'assets/jo/mockuprun.mp4';
import girlRunPlaceholder from 'assets/jo/mockuprun.mp4';
import girlWin from 'assets/jo/mockupwin.mp4';
import girlWinPlaceholder from 'assets/jo/mockupwin.mp4';
import girlProfile from 'assets/jo/mockupwin.mp4';
import girlProfilePlaceholder from 'assets/jo/mockupwin.mp4';
import girlRank from 'assets/jo/mockupclassement.mp4';
import girlRankPlaceholder from 'assets/jo/mockupclassement.mp4';
import appLive from 'assets/jo/mockuplive3.mp4';
import appLivePlaceholder from 'assets/jo/mockuplive3.mp4';

const title = 'Fan expérience pour les Jeux Olympiques';
const description =
  "Création d'une expérience immersive, interaactive et accessible pour les fans qui ne peuvent assister physiquement à l'événement";
const roles = [
  'Product Design',
  'Direction artistique',
  'Motion Design',
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
          srcSet={`${deviceModelsBackground} 1080w, ${deviceModelsBackgroundLarge} 2160w`}
          placeholder={deviceModelsBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://devicemodels.com"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${arborescence} 1280w, ${arborescence} 2560w`}
              placeholder={arborescencePlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Device Models plugin interface."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The Problem</ProjectSectionHeading>
            <ProjectSectionText>
              After complimenting <Link href="/uses">my arsenal</Link> with Figma as my
              weapon of choice for UI design in 2019, I noticed that working with 3D and
              interactive content was not possible within Figma, especially when using
              grid systems.
            </ProjectSectionText>
            <ProjectSectionText>
              In early 2019, I found that designers were growing increasingly interested
              in 3D and immersive art direction, yet lacked the tools to do so without
              hiring a developer or modeler. I decided to change that and, with it,
              created Device Models.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Un challenge international</ProjectSectionHeading>
              <ProjectSectionText>
                Nous avons décidé de rendre actif le spectateur en lui proposant de participer physiquement à une course de relais qui démarre en même temps que le relais officiel des jeux olympiques et se termine au début officiel des JO.
                L’objectif est simple, chaque coureur doit accumuler le maximum de km pour son pays. À la fin de l'événement, un calcul est fait pour évaluer quel pays possède la population la plus sportive.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${concept}`}
              placeholder={arborescencePlaceholder}
              alt="A promotional banner for Device Models, displaying a variety of devices and bright colors."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1400px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <Image
              src={`${torch}`}
              placeholder={arborescencePlaceholder}
              alt="A promotional banner for Device Models, displaying a variety of devices and bright colors."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Interagir avec la Flamme Olympique</ProjectSectionHeading>
              <ProjectSectionText>
              Afin de manifester leur soutien au porteur de la flamme olympique, les utilisateurs peuvent envoyer des emojis depuis leur téléphones qui sont retranscrit en direct sur une torche connectée transportée par le coureur.
              La torche possède des écrans sur chacun de ses côtés qui retransmettent en temps réel les emojis envoyés par les internautes.
              Elle possède aussi une couleur qui évolue en fonction du nombre de personnes connectées à l’application.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              srcSet={`${arborescence} 400w, ${arborescence} 898w`}
              placeholder={arborescencePlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The Device Models color palette and logo, featuring a low poly monogram to convey its 3D allure."
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(themeId)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>Design and Development</ProjectSectionHeading>
              <ProjectSectionText>
                Keeping the look and feel of Device Models consistent across its online
                presence was a difficult challenge. It was critical to remain consistent
                in both messaging and appearance while curating to different platforms.
              </ProjectSectionText>
              <ProjectSectionText>
                Keeping to a universal,{' '}
                <Link href="https://storybook.devicemodels.com">
                  component-based design
                </Link>
                , the "look and feel" remained nice and tidy, and both the aesthetics and
                user experience were well-informed across the board.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Show, not Tell</ProjectSectionHeading>
              <ProjectSectionText>
                I embrace the idea of "show, not tell" when marketing innovative products.
                Wide-spread adoption is momentum-based, and you have to give users a
                reason to jump onboard, hype or not. I like putting the product in front
                of them and letting its productivity powers speak for itself.
              </ProjectSectionText>
              <ProjectSectionText>
                With a bold show of identity, I included the very 3D components used on
                the plugin both within marketing material and online, featuring its
                variations to communicate its flexibility (using Device Models, of
                course).
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              role="presentation"
              src={`${arborescence}`}
              placeholder={arborescencePlaceholder}
              alt="A promotional banner for Device Models, displaying a variety of devices and bright colors."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <Image
                role="presentation"
                src={`${arborescence}`}
                placeholder={arborescencePlaceholder}
                alt="A promotional banner for Device Models, displaying a variety of devices and bright colors."
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              />
              <ProjectSectionHeading>The Result</ProjectSectionHeading>
              <ProjectSectionText>
                Within 48 hours of release, Device Models became a popular tool, reaching
                1,000 downloads. You can find the plugin on Figma's featured plugins
                collection to render 3D mockups all across designer spaces.
              </ProjectSectionText>
              <Button
                secondary
                iconHoverShift
                icon="chevronRight"
                href="https://devicemodels.com"
              >
                View on Figma
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
