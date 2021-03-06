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
  "Application Web permettant d'apprendre le solf??ge gr??ce au jeu qui favorise la m??morisation.";
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
               Encore beaucoup de personnes se sentent d??sarm??es face ?? l'apprentissage du solf??ge et consid??rent que passer cette ??tape peut leur suffire.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
            <ProjectSectionHeading>Objectif</ProjectSectionHeading>
              <ProjectSectionText>
                Cr??er un site mobile-first qui permet aux d??butants d'apprendre des sujets sp??cifiques li??s au solf??ge au travers de tutoriels et autres m??thodes d'apprentissage. 
                Nous devons en cons??quence imaginer un concept, trouver les cibles et produire un produit ou service qui r??pond ?? leurs besoins.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Probl??matique ?? r??soudre</ProjectSectionHeading>
            <ProjectSectionText>
            L???apprentissage du solf??ge est long et d??motivant

            Les personnes ne voient pas le lien entre le solf??ge et leur instrument

            L???impression de ne pas progresser
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Benchmark</ProjectSectionBigHeading>
              <ProjectSectionText>
              Notre benchmark concurrentiel s'est bas?? sur 3 crit??res : l'accompagnement de l'utilisateur pendant le processus d'apprentissage, la gamification et la personnalisation des contenus. Cela nous a permis de mettre en ??vidence des concurrents cl??s et de nous positionner.
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
              Faire participer le fan ?? distance
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionText>
              Offrir un moyen de manifester son encouragement
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionText>
              Capitaliser sur l'??v??nement
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
            <ProjectSectionHeading>Probl??me trouv??</ProjectSectionHeading>
              <ProjectSectionText>
              L'apprentissage du solf??ge est per??u comme difficile, contraignant et d??courageant par les personnes qui souhaitent se lancer dans l'apprentissage de la musique.
              </ProjectSectionText>
              <ProjectSectionHeading>R??ponses r??currentes</ProjectSectionHeading>
              <ProjectSectionText>
              - ?? Je souhaite apprendre le solf??ge en jouant d'un instrument ??
              </ProjectSectionText>
              <ProjectSectionText>
              - ????Je voudrais jouer des chansons ?? la mode / c??l??bres????
              </ProjectSectionText>
              <ProjectSectionText>
              - ?? Moins de th??orie, plus de pratique ??
              </ProjectSectionText>
              <ProjectSectionHeading>En conclusion</ProjectSectionHeading>
              <ProjectSectionText>
              Les utilisateurs trouvent le solf??ge fastidieux et d??courageant. Il est donc important d'apporter de la gamification dans cet apprentissage pour le rendre plus ludique. Chez Solbase, nous accompagnons les utilisateurs pas ?? pas et nous r??compensons leurs progr??s. En jouant un peu chaque jour, le solf??ge deviendra un moment de plaisir dans leur quotidien.
              </ProjectSectionText>
            </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Arborescence</ProjectSectionBigHeading>
              <ProjectSectionText>
              Nous avons d??fini une arborescence pour notre application d'apprentissage ludique qui se base sur les jeux vid??o les plus connus du genre.
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
                <ProjectSectionHeading>S??lection de jeu</ProjectSectionHeading>
                <ProjectSectionText>
                Solbase propose 3 mini-jeux pour apprendre le solf??ge :
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
                Les meilleurs scores du joueur se retrouvent sur l'??cran de s??lection ainsi que les r??alisations, d??bloqu??es lors de ses entra??nements.
                </ProjectSectionText>
              </ProjectTextRow>
              <Image
              srcSet={`${gameselect} 400w, ${gameselect} 898w`}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="Maquette S??lection de jeu"
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
              alt="Maquette Choix des param??tres"
              />
              <ProjectTextRow>
                <ProjectSectionHeading>Choix des param??tres</ProjectSectionHeading>
                <ProjectSectionText>
                Apr??s avoir s??lectionn?? son jeu, l'utilisateur pourra personnaliser son jeu en utilisant diff??rents param??tres.
                </ProjectSectionText>
                <ProjectSectionText>
                Il a ??galement la possibilit?? de choisir, parmi une liste de musiques et d'artistes, la chanson avec laquelle il va s'entra??ner.
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
              Avant chaque partie, nous avons ajout?? des tutoriels pour accompagner l'utilisateur dans son apprentissage et l'aider ?? se familiariser avec Solbase et l'univers solf??ge.
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
            En liant la note ?? son nom, l'utilisateur pourra progressivement apprendre le solf??ge. Un syst??me de couleurs facilite la m??morisation. Selon la difficult?? choisie, cette fonctionnalit?? peut ne pas ??tre disponible.
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
              En appuyant sur la touche correspondant ?? la bonne ligne, le joueur pourra suivre le rythme de la musique. Cet exercice lui permettra de g??rer les diff??rentes valeurs temporelles pr??sentes sur une partition.
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
              En m??langeant rythme et notes, ce jeu permet de v??rifier si vous avez bien assimil?? les 2 premiers exercices. Solf???hero utilise l???apparence d???une partition musicale, pour habituer l???utilisateur quand, un jour, il jouera avec une vraie.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionBigHeading>Identit?? visuelle</ProjectSectionBigHeading>
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
              En utilisant des sch??mas d??j?? connus des utilisateurs et une fa??on d'apprendre tr??s ludique, nous avons permis de cr??er un mod??le d'apprentissage de base performant afin que nos utilisateurs apprennent plus efficacement.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Prochaine ??tape</ProjectSectionBigHeading>
              <ProjectSectionText>
              La prochaine ??tape de notre concept serait d'ajouter plus d'exercices vari??s permettant d'exercer d'autres ??l??ments li??s au solf??ge, ainsi qu'avoir un syst??me d'analyse de performances pour v??rifier son am??lioration sur le temps.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Apprentissage</ProjectSectionBigHeading>
              <ProjectSectionText>
              En conclusion, ce projet nous a permis de travailler sur une notion que nous n???avions pas encore eu la possibilit?? d???aborder, ?? savoir, le mobile first gr??ce ?? une solution sous forme de Progressive Web App mais aussi de challenger notre cr??ativit?? avec une DA diff??rente de ce que nous aurions pu proposer sans la contrainte du courant artistique. De plus, la possibilit?? de travailler sur une solution reprenant les codes du jeu nous a permis de sortir de notre zone de confort et d???aller plus loin dans la r??flexion de conception. Cela nous a donn?? l???opportunit?? de valider nos comp??tences acquises tout au long de l???ann??e sur un projet de courte dur??e gr??ce ?? un choix personnel de la m??thodologie utilis??e, nous donnant une autonomie compl??te de la r??alisation de notre projet.
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
