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
import arborescence from 'assets/jo/arbo.png';
import arborescencePlaceholder from 'assets/jo/arbo.png';
import wireframe from 'assets/jo/Wireframe.png';
import wireframePlaceholder from 'assets/jo/Wireframe.png';
import joBackground from 'assets/jo/jo-thumbnail.mp4';
import torch from 'assets/jo/endi.mp4';
import torchPlaceholder from 'assets/jo/endi.mp4';
import concept from 'assets/jo/girl_run_tel_7.webm';
import conceptPlaceholder from 'assets/jo/girl_run_tel_7.mp4';
import girlHome from 'assets/jo/stretch_mobile.webm';
import girlHomePlaceholder from 'assets/jo/stretch_mobile.mp4';
import girlRun from 'assets/jo/mockuprun.webm';
import girlRunPlaceholder from 'assets/jo/mockuprun.webm';
import girlWin from 'assets/jo/mockupwinnew.webm';
import girlWinPlaceholder from 'assets/jo/mockupwinnew.webm';
import girlProfile from 'assets/jo/mockuprofil.mp4';
import girlProfilePlaceholder from 'assets/jo/mockupwin.mp4';
import girlRank from 'assets/jo/mockupclassement.webm';
import girlRankPlaceholder from 'assets/jo/mockupclassement.webm';
import appLive from 'assets/jo/mockuplive3.webm';
import appLivePlaceholder from 'assets/jo/mockuplive3.webm';

const title = 'Fan experience pour les Jeux Olympiques';
const description =
  "Expérience immersive et interactive pour les fans des Jeux Olympiques";
const roles = [
  'Product Design',
  'Strategy',
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
          src={joBackground}
          placeholder={joBackground}
          opacity={0.7}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://cloud.protopie.io/p/d759867f38?ui=false&mockup=true&touchHint=false&scaleToFit=false&cursorType=touch"
          roles={roles}
        />
        {/* <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${arborescence} 1280w, ${arborescence} 2560w`}
              placeholder={arborescencePlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Device Models plugin interface."
            />
          </ProjectSectionContent>
        </ProjectSection> */}
        <ProjectSection first>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Contexte du projet</ProjectSectionHeading>
              <ProjectSectionText>
              Les Jeux Olympiques sont un moment événementiel d'envergure mondial, ce qui donne de nombreuses possibilités pour lancer des applications innovantes.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
            <ProjectSectionHeading>Objectif</ProjectSectionHeading>
              <ProjectSectionText>
                Créer une expérience immersive, interactive et accessible pour les fans qui ne peuvent assister physiquement à l'événement.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Problématique à résoudre</ProjectSectionHeading>
            <ProjectSectionText>
              Partie intégrante du compte à rebours des Jeux Olympiques, le relais est d'une grande importance symbolique, car il relie solidement les versions
              antiques et modernes des Jeux. Cet événement, se déroulant pendant la période pré-Olympique, est aujourd'hui une expérience vécue sans interaction par la majorité du public qui
              se contente de suivre les coureurs sur les divers médias qui lui sont proposés.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Idéation</ProjectSectionBigHeading>
              <ProjectSectionText>
              À l’origine, les Jeux Olympiques étaient réservés aux profils amateurs, mais depuis 1992, les professionnels sont
              autorisés à y participer, ce qui a fait de l’ombre à ces derniers. Notre désir était de créer une expérience inclusive
              qui met à l’honneur la participation des profils amateurs afin que les utilisateurs puissent retrouver l’essence des Jeux Olympiques.

              En nous basant sur des thématiques issues de notre étude de marché,
              nous avons abordé diverses sessions d'idéation afin d’élaborer un concept capable de séduire
              les sponsors tout en rassemblant et fédérant les fans des Jeux Olympiques en nous basant sur 3 aspects :
              </ProjectSectionText>
              <ProjectSectionText>
              - Faire participer le fan à distance
              </ProjectSectionText>
              <ProjectSectionText>
              - Offrir un moyen de manifester son encouragement
              </ProjectSectionText>
              <ProjectSectionText>
              - Capitaliser sur l'événement
              pour mettre en avant les sponsors
              </ProjectSectionText>
            </ProjectTextRow>

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
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Le concept</ProjectSectionBigHeading>
              <ProjectSectionHeading>Un challenge international</ProjectSectionHeading>
              <ProjectSectionText>
                Nous avons décidé de rendre actif le spectateur en lui proposant de participer physiquement à une course de relais qui démarre en même temps que le relais officiel des jeux olympiques et se termine au début officiel des JO.
                L’objectif est simple, chaque coureur doit accumuler le maximum de kilomètres pour son pays. À la fin de l'événement, un calcul est fait pour évaluer quel pays possède la population la plus sportive.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${concept}`}
              alt="Concept"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1400px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <Image
              src={`${torch}`}
              alt="Flamme olympique"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Interagir avec la Flamme Olympique</ProjectSectionHeading>
              <ProjectSectionText>
              Afin de manifester leur soutien au porteur de la flamme olympique, les utilisateurs peuvent envoyer des emojis depuis leur téléphone qui sont retranscrits en direct sur une torche connectée transportée par le coureur.
              La torche possède des écrans sur chacun de ses côtés qui retransmettent en temps réel les emojis envoyés par les internautes.
              Elle possède aussi une couleur qui évolue pour représenter le nombre de personnes connectées à l’application.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
              <ProjectSectionBigHeading>Arborescence</ProjectSectionBigHeading>
              <Image
              srcSet={`${arborescence} 400w, ${arborescence} 898w`}
              placeholder={arborescencePlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="Arborescence de l'application JO"
              />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionBigHeading>Design</ProjectSectionBigHeading>
                <ProjectSectionText>
                Afin de concevoir un design innovant, nous avons mené un atelier de "6-to-1" dans le but de prototyper les écrans phares de l’application.
                </ProjectSectionText>
              </ProjectTextRow>
              <Image
              srcSet={`${wireframe} 400w, ${wireframe} 898w`}
              placeholder={wireframePlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="Wireframe pour l'application JO"
              />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <ProjectTextRow>
            <ProjectSectionBigHeading>Maquettes</ProjectSectionBigHeading>
              <ProjectSectionHeading>Accueil</ProjectSectionHeading>
              <ProjectSectionText>
              L'accueil permet de voir son classement actuel. En partant de cet écran, l’utilisateur peut choisir d'accéder au live, consulter son profil,
              ses statistiques, consulter son classement ou encore choisir de débuter une nouvelle course. Il peut également personnaliser son personnage.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${girlHome}`}
              placeholder={girlHomePlaceholder}
              alt="Animation de démarrage de la course"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <Image
              src={`${girlRun}`}
              alt="Animation de classement lors de la course"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          <ProjectTextRow>
              <ProjectSectionHeading>Course</ProjectSectionHeading>
              <ProjectSectionText>
              Une fois que le coureur lance sa course, le GPS intégré au téléphone va comptabiliser le nombre de kilomètres parcouru par l’utilisateur
              en temps réel et afficher son classement.
              Grâce à un partenariat réalisé avec Spotify, les utilisateurs peuvent profiter de leur course en écoutant leurs musiques préférées.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <ProjectTextRow>
              <ProjectSectionHeading>Fin de course</ProjectSectionHeading>
              <ProjectSectionText>
              À la fin de chaque course les utilisateurs peuvent consulter la distance parcourue en kilomètres 
              et s’informer du nombre de places qu’ils ont gagné dans le classement.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${girlWin}`}
              placeholder={girlWinPlaceholder}
              alt="Animation de fin de course"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <Image
              src={`${girlProfile}`}
              alt="Animation présentant le profil de l'utilisateur"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          <ProjectTextRow>
              <ProjectSectionHeading>Profil</ProjectSectionHeading>
              <ProjectSectionText>
              Sur cet écran, l’utilisateur peut accéder au rapport détaillé de sa course (nombre de calories brûlées, vitesse moyenne, parcours gps etc.)
              ou encore consulter son trajet parcouru sur une carte. Nous nous sommes inspirés des patterns utilisés par l'application Waze afin de 
              mettre en avant les sponsors (ici Mc Donalds) de l’application sans que cela vienne impacter négativement
              l’expérience de l’utilisateur (nous voulions à tout prix éviter les grosses pop-up publicitaires bloquantes qui nuisent à l'expérience).
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <ProjectTextRow>
              <ProjectSectionHeading>Classement</ProjectSectionHeading>
              <ProjectSectionText>
              Sur cette page, l'utilisateur peut consulter à tout moment le classement intégral de tous les coureurs.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${girlRank}`}
              placeholder={girlRankPlaceholder}
              alt="Animation présentant le classement"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <Image
              src={`${appLive}`}
              placeholder={appLivePlaceholder}
              alt="Animation de streaming du relayeur olympique"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          <ProjectTextRow>
              <ProjectSectionHeading>Le Live</ProjectSectionHeading>
              <ProjectSectionText>
              Grâce au live, l’utilisateur peut visualiser le parcours du relayeur olympique en direct et interagir avec la
              flamme olympique en envoyant des emojis d’encouragements qui s’affichent directement sur la flamme connectée.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Bilan</ProjectSectionBigHeading>
              <ProjectSectionText>
              Grâce à notre solution, les fans des Jeux Olympiques
              peuvent enfin profiter d’une expérience immersive et
              interactive tout en manifestant leur soutien au porteur de la flamme.
              </ProjectSectionText>
              <ProjectSectionText>
              Diverses données d'analyse telles que la durée de visionnage du live, la durée d’une course,
              le classement des utilisateurs, la localisation géographique, la fréquence d’utilisation de l’application sont récoltées au sein de l’application afin de permettre aux sponsors de cibler les utilisateurs en fonction de leur profil.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Prochaine étape</ProjectSectionBigHeading>
              <ProjectSectionText>
              Le support des montres connectées de type Apple Watch et montres pour Android permettrait de pouvoir courir sans son téléphone. De plus, ajouter des outils de gamification pour aller avec le personnage 3D tels que des accessoires ou de nouveaux moyens d'interagir avec les autres permettrait un plus fort engagement envers l'application.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Apprentissage</ProjectSectionBigHeading>
              <ProjectSectionText>
                Par manque de temps, nous avons dû apprendre à lancer un concept sans avoir de recherche utilisateur au préalable. Nous avons donc du trouver 
                une solution créative en nous basant uniquement sur l’étude de marché
                de l’histoire des Jeux Olympiques.
                Étant habitué au suivi des process, j'ai du personnellement sortir de ma zone de confort pour réussir à trouver un concept de cette façon. Mais cela 
                nous a permis de produire de façon plus réaliste, étant donné que le lancement de projet dans la vie est souvent moins cadré et fait sur le tas.              
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionText>
                À PROPOS
              </ProjectSectionText>
              <ProjectSectionNextProject>En savoir plus sur moi</ProjectSectionNextProject>
              <Button
                secondary
                iconHoverShift
                icon="arrowRight"
                href="/#about"
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
