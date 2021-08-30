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
import solbaseBackground from 'assets/solbase/background-solbase.png';

import arborescence from 'assets/solbase/arborescence.png';
import couleurs from 'assets/solbase/couleurs.png';
import typographie from 'assets/solbase/typographie.png';
import competition from 'assets/solbase/competition.png';
import onboarding from 'assets/solbase/onboarding.png';
import userresearch from 'assets/solbase/recherche-user.png';
import tambourythm from 'assets/solbase/tambourythm.png';
import solfhero from 'assets/solbase/solfhero.png';
import memoritime from 'assets/solbase/memori-time.png';
import settings from 'assets/solbase/settings.png';
import gameselect from 'assets/solbase/game-select.png';

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
          // url="https://www.behance.net/gallery/115425137/Solbase-UIUX-Musical-Games-Webapp-Design?tracking_source=search_projects_recommended%7Csolbase"
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
            <ProjectSectionHeading>Problématique à résoudre</ProjectSectionHeading>
            <ProjectSectionText>
            L’apprentissage du solfège est long et démotivant

            Les personnes ne voient pas le lien entre le solfège et leur instrument

            L’impression de ne pas progresser
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Benchmark</ProjectSectionBigHeading>
              <ProjectSectionText>
              Notre benchmark concurrentiel s'est basé sur 3 critères : l'accompagnement de l'utilisateur pendant le processus d'apprentissage, la gamification et la personnalisation des contenus. Cela nous a permis de mettre en évidence des concurrents clés et de nous positionner.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${competition}`}
              alt="Benchmark"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1400px`}
            />
        </ProjectSection>
        {/* <ProjectSection light>
          <ProjectSectionColumns alternate>
            <ProjectTextRow>
              <ProjectSectionText>
              Faire participer le fan à distance
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionText>
              Offrir un moyen de manifester son encouragement
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionText>
              Capitaliser sur l'événement
              pour mettre en avant les sponsors
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection> */}
        <ProjectSection light>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Recherche utilisateur</ProjectSectionBigHeading>
              </ProjectTextRow>
              <Image
              src={`${userresearch}`}
              alt="Recherche utilisateur"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1400px`}
            />
            <ProjectTextRow>
            <ProjectSectionHeading>Problème trouvé</ProjectSectionHeading>
              <ProjectSectionText>
              L'apprentissage du solfège est perçu comme difficile, contraignant et décourageant par les personnes qui souhaitent se lancer dans l'apprentissage de la musique.
              </ProjectSectionText>
              <ProjectSectionHeading>Réponses récurrentes</ProjectSectionHeading>
              <ProjectSectionText>
              - « Je souhaite apprendre le solfège en jouant d'un instrument »
              </ProjectSectionText>
              <ProjectSectionText>
              - « Je voudrais jouer des chansons à la mode / célèbres »
              </ProjectSectionText>
              <ProjectSectionText>
              - « Moins de théorie, plus de pratique »
              </ProjectSectionText>
              <ProjectSectionHeading>En conclusion</ProjectSectionHeading>
              <ProjectSectionText>
              Les utilisateurs trouvent le solfège fastidieux et décourageant. Il est donc important d'apporter de la gamification dans cet apprentissage pour le rendre plus ludique. Chez Solbase, nous accompagnons les utilisateurs pas à pas et nous récompensons leurs progrès. En jouant un peu chaque jour, le solfège deviendra un moment de plaisir dans leur quotidien.
              </ProjectSectionText>
            </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Arborescence</ProjectSectionBigHeading>
              <ProjectSectionText>
              Nous avons défini une arborescence pour notre application d'apprentissage ludique qui se base sur les jeux vidéo les plus connus du genre.
              </ProjectSectionText>
              </ProjectTextRow>
              <Image
              srcSet={`${arborescence} 400w, ${arborescence} 898w`}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="Arborescence de l'application JO"
              />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectSectionColumns>
              <ProjectTextRow>
                <ProjectSectionBigHeading>Fonctionnement</ProjectSectionBigHeading>
                <ProjectSectionHeading>Sélection de jeu</ProjectSectionHeading>
                <ProjectSectionText>
                Solbase propose 3 mini-jeux pour apprendre le solfège :
                </ProjectSectionText>
                <ProjectSectionText>
                - Memori Notes, pour apprendre les notes
                </ProjectSectionText>
                <ProjectSectionText>
                - Tambou'rhythm, pour apprendre le rythme
                </ProjectSectionText>
                <ProjectSectionText>
                - Solf'hero, combinant les 2 premiers jeux
                </ProjectSectionText>
                <ProjectSectionText>
                Les meilleurs scores du joueur se retrouvent sur l'écran de sélection ainsi que les réalisations, débloquées lors de ses entraînements.
                </ProjectSectionText>
              </ProjectTextRow>
              <Image
              srcSet={`${gameselect} 400w, ${gameselect} 898w`}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="Maquette Sélection de jeu"
              />
            </ProjectSectionColumns>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectSectionColumns>
            <Image
              srcSet={`${settings} 400w, ${settings} 898w`}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="Maquette Choix des paramètres"
              />
              <ProjectTextRow>
                <ProjectSectionHeading>Choix des paramètres</ProjectSectionHeading>
                <ProjectSectionText>
                Après avoir sélectionné son jeu, l'utilisateur pourra personnaliser son jeu en utilisant différents paramètres.
                </ProjectSectionText>
                <ProjectSectionText>
                Il a également la possibilité de choisir, parmi une liste de musiques et d'artistes, la chanson avec laquelle il va s'entraîner.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionColumns>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Onboarding</ProjectSectionHeading>
              <ProjectSectionText>
              Avant chaque partie, nous avons ajouté des tutoriels pour accompagner l'utilisateur dans son apprentissage et l'aider à se familiariser avec Solbase et l'univers solfège.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
            srcSet={`${onboarding} 400w, ${onboarding} 898w`}
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
            alt="Maquette Onboarding"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionBigHeading>Jeux</ProjectSectionBigHeading>
            <ProjectSectionHeading>Memori Time</ProjectSectionHeading>
            <ProjectSectionText>
            En liant la note à son nom, l'utilisateur pourra progressivement apprendre le solfège. Un système de couleurs facilite la mémorisation. Selon la difficulté choisie, cette fonctionnalité peut ne pas être disponible.
            </ProjectSectionText>
          </ProjectTextRow>
          <Image
            src={`${memoritime}`}
            alt="Jeu Memoritime"
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
          />
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <ProjectTextRow>
              <ProjectSectionHeading>Tambou'rythm</ProjectSectionHeading>
              <ProjectSectionText>
              En appuyant sur la touche correspondant à la bonne ligne, le joueur pourra suivre le rythme de la musique. Cet exercice lui permettra de gérer les différentes valeurs temporelles présentes sur une partition.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${tambourythm}`}
              alt="Jeu Tambou'rythm"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <Image
              src={`${solfhero}`}
              alt="Jeu Solf'hero"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          <ProjectTextRow>
              <ProjectSectionHeading>Solf'Hero</ProjectSectionHeading>
              <ProjectSectionText>
              En mélangeant rythme et notes, ce jeu permet de vérifier si vous avez bien assimilé les 2 premiers exercices. Solf’hero utilise l’apparence d’une partition musicale, pour habituer l’utilisateur quand, un jour, il jouera avec une vraie.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionBigHeading>Identité visuelle</ProjectSectionBigHeading>
            <ProjectSectionHeading>Couleurs</ProjectSectionHeading>
          </ProjectTextRow>
          <Image
            src={`${couleurs}`}
            alt="Charte des couleurs"
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
          />
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Typographie</ProjectSectionHeading>
          </ProjectTextRow>
          <Image
            src={`${typographie}`}
            alt="Charte typographique"
            sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
          />
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Conclusion</ProjectSectionBigHeading>
              <ProjectSectionText>
              En utilisant des schémas déjà connus des utilisateurs et une façon d'apprendre très ludique, nous avons permis de créer un modèle d'apprentissage de base performant afin que nos utilisateurs apprennent plus efficacement.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Prochaine étape</ProjectSectionBigHeading>
              <ProjectSectionText>
              La prochaine étape de notre concept serait d'ajouter plus d'exercices variés permettant d'exercer d'autres éléments liés au solfège, ainsi qu'avoir un système d'analyse de performances pour vérifier son amélioration sur le temps.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Apprentissage</ProjectSectionBigHeading>
              <ProjectSectionText>
              En conclusion, ce projet nous a permis de travailler sur une notion que nous n’avions pas encore eu la possibilité d’aborder, à savoir, le mobile first grâce à une solution sous forme de Progressive Web App mais aussi de challenger notre créativité avec une DA différente de ce que nous aurions pu proposer sans la contrainte du courant artistique. De plus, la possibilité de travailler sur une solution reprenant les codes du jeu nous a permis de sortir de notre zone de confort et d’aller plus loin dans la réflexion de conception. Cela nous a donné l’opportunité de valider nos compétences acquises tout au long de l’année sur un projet de courte durée grâce à un choix personnel de la méthodologie utilisée, nous donnant une autonomie complète de la réalisation de notre projet.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionText>
                NEXT PROJECT
              </ProjectSectionText>
              <ProjectSectionNextProject>Jeux Olympiques</ProjectSectionNextProject>
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
