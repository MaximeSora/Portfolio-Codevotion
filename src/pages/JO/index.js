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
  "Exp??rience immersive et interactive pour les fans des Jeux Olympiques";
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
              Les Jeux Olympiques sont un moment ??v??nementiel d'envergure mondial, ce qui donne de nombreuses possibilit??s pour lancer des applications innovantes.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
            <ProjectSectionHeading>Objectif</ProjectSectionHeading>
              <ProjectSectionText>
                Cr??er une exp??rience immersive, interactive et accessible pour les fans qui ne peuvent assister physiquement ?? l'??v??nement.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Probl??matique ?? r??soudre</ProjectSectionHeading>
            <ProjectSectionText>
              Partie int??grante du compte ?? rebours des Jeux Olympiques, le relais est d'une grande importance symbolique, car il relie solidement les versions
              antiques et modernes des Jeux. Cet ??v??nement, se d??roulant pendant la p??riode pr??-Olympique, est aujourd'hui une exp??rience v??cue sans interaction par la majorit?? du public qui
              se contente de suivre les coureurs sur les divers m??dias qui lui sont propos??s.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Id??ation</ProjectSectionBigHeading>
              <ProjectSectionText>
              ?? l???origine, les Jeux Olympiques ??taient r??serv??s aux profils amateurs, mais depuis 1992, les professionnels sont
              autoris??s ?? y participer, ce qui a fait de l???ombre ?? ces derniers. Notre d??sir ??tait de cr??er une exp??rience inclusive
              qui met ?? l???honneur la participation des profils amateurs afin que les utilisateurs puissent retrouver l???essence des Jeux Olympiques.

              En nous basant sur des th??matiques issues de notre ??tude de march??,
              nous avons abord?? diverses sessions d'id??ation afin d?????laborer un concept capable de s??duire
              les sponsors tout en rassemblant et f??d??rant les fans des Jeux Olympiques en nous basant sur 3 aspects :
              </ProjectSectionText>
              <ProjectSectionText>
              - Faire participer le fan ?? distance
              </ProjectSectionText>
              <ProjectSectionText>
              - Offrir un moyen de manifester son encouragement
              </ProjectSectionText>
              <ProjectSectionText>
              - Capitaliser sur l'??v??nement
              pour mettre en avant les sponsors
              </ProjectSectionText>
            </ProjectTextRow>

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
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Le concept</ProjectSectionBigHeading>
              <ProjectSectionHeading>Un challenge international</ProjectSectionHeading>
              <ProjectSectionText>
                Nous avons d??cid?? de rendre actif le spectateur en lui proposant de participer physiquement ?? une course de relais qui d??marre en m??me temps que le relais officiel des jeux olympiques et se termine au d??but officiel des JO.
                L???objectif est simple, chaque coureur doit accumuler le maximum de kilom??tres pour son pays. ?? la fin de l'??v??nement, un calcul est fait pour ??valuer quel pays poss??de la population la plus sportive.
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
              Afin de manifester leur soutien au porteur de la flamme olympique, les utilisateurs peuvent envoyer des emojis depuis leur t??l??phone qui sont retranscrits en direct sur une torche connect??e transport??e par le coureur.
              La torche poss??de des ??crans sur chacun de ses c??t??s qui retransmettent en temps r??el les emojis envoy??s par les internautes.
              Elle poss??de aussi une couleur qui ??volue pour repr??senter le nombre de personnes connect??es ?? l???application.
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
                Afin de concevoir un design innovant, nous avons men?? un atelier de "6-to-1" dans le but de prototyper les ??crans phares de l???application.
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
              L'accueil permet de voir son classement actuel. En partant de cet ??cran, l???utilisateur peut choisir d'acc??der au live, consulter son profil,
              ses statistiques, consulter son classement ou encore choisir de d??buter une nouvelle course. Il peut ??galement personnaliser son personnage.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${girlHome}`}
              placeholder={girlHomePlaceholder}
              alt="Animation de d??marrage de la course"
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
              Une fois que le coureur lance sa course, le GPS int??gr?? au t??l??phone va comptabiliser le nombre de kilom??tres parcouru par l???utilisateur
              en temps r??el et afficher son classement.
              Gr??ce ?? un partenariat r??alis?? avec Spotify, les utilisateurs peuvent profiter de leur course en ??coutant leurs musiques pr??f??r??es.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <ProjectTextRow>
              <ProjectSectionHeading>Fin de course</ProjectSectionHeading>
              <ProjectSectionText>
              ?? la fin de chaque course les utilisateurs peuvent consulter la distance parcourue en kilom??tres 
              et s???informer du nombre de places qu???ils ont gagn?? dans le classement.
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
              alt="Animation pr??sentant le profil de l'utilisateur"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          <ProjectTextRow>
              <ProjectSectionHeading>Profil</ProjectSectionHeading>
              <ProjectSectionText>
              Sur cet ??cran, l???utilisateur peut acc??der au rapport d??taill?? de sa course (nombre de calories br??l??es, vitesse moyenne, parcours gps etc.)
              ou encore consulter son trajet parcouru sur une carte. Nous nous sommes inspir??s des patterns utilis??s par l'application Waze afin de 
              mettre en avant les sponsors (ici Mc Donalds) de l???application sans que cela vienne impacter n??gativement
              l???exp??rience de l???utilisateur (nous voulions ?? tout prix ??viter les grosses pop-up publicitaires bloquantes qui nuisent ?? l'exp??rience).
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
          <ProjectTextRow>
              <ProjectSectionHeading>Classement</ProjectSectionHeading>
              <ProjectSectionText>
              Sur cette page, l'utilisateur peut consulter ?? tout moment le classement int??gral de tous les coureurs.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={`${girlRank}`}
              placeholder={girlRankPlaceholder}
              alt="Animation pr??sentant le classement"
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
              Gr??ce au live, l???utilisateur peut visualiser le parcours du relayeur olympique en direct et interagir avec la
              flamme olympique en envoyant des emojis d???encouragements qui s???affichent directement sur la flamme connect??e.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Bilan</ProjectSectionBigHeading>
              <ProjectSectionText>
              Gr??ce ?? notre solution, les fans des Jeux Olympiques
              peuvent enfin profiter d???une exp??rience immersive et
              interactive tout en manifestant leur soutien au porteur de la flamme.
              </ProjectSectionText>
              <ProjectSectionText>
              Diverses donn??es d'analyse telles que la dur??e de visionnage du live, la dur??e d???une course,
              le classement des utilisateurs, la localisation g??ographique, la fr??quence d???utilisation de l???application sont r??colt??es au sein de l???application afin de permettre aux sponsors de cibler les utilisateurs en fonction de leur profil.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Prochaine ??tape</ProjectSectionBigHeading>
              <ProjectSectionText>
              Le support des montres connect??es de type Apple Watch et montres pour Android permettrait de pouvoir courir sans son t??l??phone. De plus, ajouter des outils de gamification pour aller avec le personnage 3D tels que des accessoires ou de nouveaux moyens d'interagir avec les autres permettrait un plus fort engagement envers l'application.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionBigHeading>Apprentissage</ProjectSectionBigHeading>
              <ProjectSectionText>
                Par manque de temps, nous avons d?? apprendre ?? lancer un concept sans avoir de recherche utilisateur au pr??alable. Nous avons donc du trouver 
                une solution cr??ative en nous basant uniquement sur l?????tude de march??
                de l???histoire des Jeux Olympiques.
                ??tant habitu?? au suivi des process, j'ai du personnellement sortir de ma zone de confort pour r??ussir ?? trouver un concept de cette fa??on. Mais cela 
                nous a permis de produire de fa??on plus r??aliste, ??tant donn?? que le lancement de projet dans la vie est souvent moins cadr?? et fait sur le tas.              
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            <ProjectSectionText>
                ?? PROPOS
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
