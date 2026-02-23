import { lazy, Fragment, Suspense } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import Link from 'components/Link';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Section from 'components/Section';
import Heading from 'components/Heading';
import Text from 'components/Text';
import KatakanaProfile from 'assets/katakana-profile.svg?react';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './Profile.css';

const Portrait = lazy(() => import('components/Portrait'));

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <Heading
      className={classNames('profile__title', `profile__title--${status}`)}
      level={3}
      id={titleId}
    >
      <DecoderText text="Hello" start={status !== 'exited'} delay={500} />
    </Heading>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      👋 I'm Maxime — a Creative Designer with roots in video games and software development. I bridge the gap between concept and code, bringing depth to every layer of the craft.
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      My work spans product strategy, UX research, motion design, and interaction development. But what drives every decision is one question: how do we build experiences people actually love?
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      I'm always open to new challenges and collaborations — if you have a project in mind, let's talk.
    </Text>
  </Fragment>
);

const Profile = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className="profile"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="profile__content">
            <div className="profile__column">
              <div className="profile__tag" aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div
                  className={classNames(
                    'profile__tag-text',
                    `profile__tag-text--${status}`
                  )}
                >
                  About
                </div>
              </div>
              <ProfileText status={status} titleId={titleId} />
              {/* <Button
                className={classNames('profile__button', `profile__button--${status}`)}
                href="/contact"
                icon="send"
              >
                M'envoyer un email
              </Button> */}

              <div
                className={classNames(
                  'project-summary__button',
                  `project-summary__button--${status}`
                )}
              >
                <Button iconHoverShift href="mailto:maxime.pocq@gmail.com" icon="send">
                  Send me an email
                </Button>
                <br></br>
                <Button outline iconHoverShift href="https://www.linkedin.com/in/maxime-pocq/" icon="linkedin">
                  LinkedIn
                </Button>
              </div>
            </div>
            <div className="profile__column">
              <div className="profile__image-wrapper">
                {!prerender && (
                  <Suspense fallback={null}>
                    <Portrait
                      className={classNames(
                        'profile__image',
                        `profile__image--${status}`
                      )}
                      delay={100}
                    />
                  </Suspense>
                )}
                <KatakanaProfile
                  className={classNames('profile__svg', `profile__svg--${status}`)}
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default Profile;
