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
      <DecoderText text="Bonjour" start={status !== 'exited'} delay={500} />
    </Heading>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      👋 Moi c'est Maxime, je suis Creative Designer avec un background dans le jeu vidéo et le développement. 
      </Text>
      <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      Je me focalise sur plusieurs compétences : le Design, l'animation, le prototypage, le développement d'interactions. 
      Mais mon objectif est toujours le même : Comment créer l'expérience qui sera la plus appréciée des utilisateurs ?
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      Je suis toujours intéressé à l'idée de travailler sur de nouveaux projets, donc n'hésitez pas à m'envoyer un message.
  
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
                  À propos
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
                  M'envoyer un email
                </Button>
                <br></br>
                <Button outline iconHoverShift href="https://drive.google.com/file/d/1Wb5mfgmknVAS1r02uwdJ5zTf18qvBS-N/view?usp=sharing">
                  Voir mon CV
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
