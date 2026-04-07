import { Suspense, lazy, useEffect, useState, Fragment } from 'react';
import classNames from 'classnames';
import { TransitionGroup, Transition } from 'react-transition-group';
import DecoderText from 'components/DecoderText';
import Heading from 'components/Heading';
import Section from 'components/Section';
import VisuallyHidden from 'components/VisuallyHidden';
import ArrowDown from 'assets/arrow-down.svg?react';
import portraitPhoto from 'assets/portrait-photo.webp';
import { useInterval, useWindowSize } from 'hooks';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import { tokens } from 'components/ThemeProvider/theme';
import { useTheme } from 'components/ThemeProvider';
import './Intro.css';

const DisplacementSphere = lazy(() => import('components/DisplacementSphere'));

function Intro({ id, sectionRef, disciplines, scrollIndicatorHidden, ...rest }) {
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const windowSize = useWindowSize();
  const current = disciplines[disciplineIndex];
  const introLabel = disciplines.map(d => `${d.prefix} ${d.suffix}`).join(', ');
  const titleId = `${id}-title`;

  useInterval(
    () => setDisciplineIndex(i => (i + 1) % disciplines.length),
    5000,
    theme.themeId
  );

  useEffect(() => {
    setDisciplineIndex(0);
  }, [theme.themeId]);

  return (
    <Section
      className="intro"
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition
        key={theme.themeId}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
        onEnter={reflow}
      >
        {status => (
          <Fragment>
            {!prerender && (
              <Suspense fallback={null}>
                <DisplacementSphere />
              </Suspense>
            )}
            <header className="intro__text">
              <h1
                className={classNames('intro__name', `intro__name--${status}`)}
                id={titleId}
              >
                <span className="intro__avatar" aria-hidden>
                  <img src={portraitPhoto} alt="" className="intro__avatar-img" />
                </span>
                <DecoderText text="Maxime Pocq" start={!prerender} delay={300} />
              </h1>
              <Heading level={0} as="h2" className="intro__title">
                <VisuallyHidden className="intro__title-label">{introLabel}</VisuallyHidden>

                {/* Ligne 1 : prefix rotatif (Product / Fullstack / Product) + ligne déco */}
                <span
                  aria-hidden
                  className={classNames('intro__title-row', {
                    'intro__title-row--hidden': prerender,
                  })}
                >
                  <TransitionGroup component="span" className="intro__title-words intro__title-words--large">
                    {[current.prefix].map(item => (
                      <Transition
                        appear
                        unmountOnExit
                        timeout={{ enter: 3000, exit: 2000 }}
                        key={item}
                        onEnter={reflow}
                      >
                        {wordStatus => (
                          <span
                            aria-hidden
                            className={classNames('intro__title-word', `intro__title-word--${wordStatus}`)}
                            style={{ '--delay': tokens.base.durationXS }}
                          >
                            {item}
                          </span>
                        )}
                      </Transition>
                    ))}
                  </TransitionGroup>
                </span>

                {/* Ligne 2 : "+" + suffix rotatif ; ne re-anime que si le texte change */}
                <span
                  aria-hidden
                  className={classNames('intro__title-row', {
                    'intro__title-row--hidden': prerender,
                  })}
                >
                  <span className={classNames('intro__title-plus', `intro__title-plus--${status}`)} aria-hidden>+</span>
                  <TransitionGroup component="span" className="intro__title-words intro__title-words--large">
                    {[current.suffix].map(item => (
                      <Transition
                        appear
                        unmountOnExit
                        timeout={{ enter: 3000, exit: 2000 }}
                        key={item}
                        onEnter={reflow}
                      >
                        {wordStatus => (
                          <span
                            aria-hidden
                            className={classNames('intro__title-word', `intro__title-word--${wordStatus}`)}
                            style={{ '--delay': tokens.base.durationL }}
                          >
                            {item}
                          </span>
                        )}
                      </Transition>
                    ))}
                  </TransitionGroup>
                </span>
              </Heading>
              <p className={classNames('intro__description', `intro__description--${status}`)}>
                6 years designing high-impact digital products, bridging user insight, visual craft, engineering and AI.
              </p>
              <button
                className={classNames('intro__chat-cta', `intro__chat-cta--${status}`)}
                onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Chat with my AI
              </button>
            </header>
            <div
              aria-label="Availability status"
              className={classNames(
                'intro__available',
                `intro__available--${status}`
              )}
            >
              <span className="intro__available-dot" aria-hidden />
              <span className="intro__available-full">Available for work</span>
              <span className="intro__available-short">Available</span>
            </div>
            <div className="intro__bottom">
              {windowSize.width > media.tablet && (
                <div
                  className={classNames(
                    'intro__scroll-indicator',
                    `intro__scroll-indicator--${status}`,
                    { 'intro__scroll-indicator--hidden': scrollIndicatorHidden }
                  )}
                />
              )}
              {windowSize.width <= media.tablet && (
                <div
                  className={classNames(
                    'intro__mobile-scroll-indicator',
                    `intro__mobile-scroll-indicator--${status}`,
                    { 'intro__mobile-scroll-indicator--hidden': scrollIndicatorHidden }
                  )}
                >
                  <ArrowDown aria-hidden />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}

export default Intro;
