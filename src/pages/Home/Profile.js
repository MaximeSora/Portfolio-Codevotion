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
      I'm Maxime, a Product Designer with an emphasis on UI. I craft engaging, user focused experiences that seamlessly integrate aesthetics and functionality, across the full product cycle: from early research and UX strategy to motion design and working closely with engineering teams.
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      What sets my approach apart: a genuine understanding of dev constraints and business realities. I use AI throughout ideation and prototyping to move faster without sacrificing depth, building interfaces that delight users and drive tangible business results.
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      I'm open to new projects and collaborations. If you have something in mind, let's talk.
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
                <Button iconHoverShift href="/resume.pdf" icon="chevronRight">
                  See my resume
                </Button>
                <br></br>
                <Button outline iconHoverShift href="https://www.linkedin.com/in/maxime-pocq/" icon="linkedin">
                  Let's connect
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
