import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Intro from './Intro';
import ProjectSummary from './ProjectSummary';
import Profile from './Profile';
import Footer from 'components/Footer';
import CustomCursor from 'components/CustomCursor';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import deviceModelsTexture from 'assets/device-models-phone.jpg';
import deviceModelsTextureLarge from 'assets/device-models-phone-large.jpg';
import deviceModelsTexturePlaceholder from 'assets/device-models-phone-placeholder.jpg';
import jo from 'assets/jo/jo-thumbnail.mp4';
import pornhub from 'assets/pornhub/thumbnail.png';
import dttTexture from 'assets/dtt.jpg';
import dttTextureLarge from 'assets/dtt-large.jpg';
import dttTexturePlaceholder from 'assets/dtt-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import portrait from 'assets/portrait.glb';
import './index.css';

const disciplines = ['Product', 'Creative', 'UX', 'UI', 'Interactive'];

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, about];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, projectTwo, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>Maxime Pocq | Designer</title>
        <meta
          name="description"
          content="Portfolio de Maxime Pocq – Creative Designer vivant en France, spécialisé dans l'interactivité, l'UI, l'UX."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
        <link rel="prefetch" href={portrait} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Solbase"
        description="Conceptualisation d'une application pour rendre le solfège accessible au plus grand nombre."
        buttonText="Voir le projet"
        buttonLink="/projects/solbase"
        model={{
          type: 'solbase',
          alt: "Thumbnail Solbase",
          textures: [
            {
              src: jo,
              srcSet: `${jo} 254w, ${jo} 508w`,
              placeholder: jo,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Jeux Olympiques"
        description="Expérience immersive et interactive pour les fans des Jeux Olympiques."
        buttonText="Voir le projet"
        buttonLink="/projects/jo"
        model={{
          type: 'jo',
          alt: 'Animation Thumbnail JO',
          textures: [
            {
              src: deviceModelsTexture,
              srcSet: `${deviceModelsTexture} 254w, ${deviceModelsTextureLarge} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: deviceModelsTexture,
              srcSet: `${deviceModelsTexture} 254w, ${deviceModelsTextureLarge} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
            <ProjectSummary
        id="project-3"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Pornhub Eco-Friendly"
        description="Revoir la plateforme Pornhub à travers le prisme du TechForGood."
        buttonText="Voir le projet"
        buttonLink="/projects/pornhub"
        model={{
          type: 'pornhub',
          alt: 'Thumbnail Pornhub',
          textures: [
            {
              src: jo,
              srcSet: `${jo} 254w, ${jo} 508w`,
              placeholder: jo,
            },
          ],
        }}
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </div>
  );
};

export default Home;
