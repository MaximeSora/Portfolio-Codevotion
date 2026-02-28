import { Fragment, useRef } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Section from 'components/Section';
import Heading from 'components/Heading';
import Text from 'components/Text';
import Icon from 'components/Icon';
import portraitPhoto from 'assets/portrait-photo.png';
import { reflow } from 'utils/transition';
import { useInViewport } from 'hooks';
import './Profile.css';

const travelCountries = [
  'Japan', 'South Korea', 'Canada', 'Switzerland', 'Thailand', 'Indonesia', 'Italy', 'Norway',
  'Uruguay', 'Brazil', 'Argentina', 'Spain', 'England', 'Morocco', 'Caribbean', 'Netherlands',
  'Hungary', 'Czech Republic', 'Austria',
];

const passions = [
  { label: 'Video games', detail: 'Competitive, indie', icon: 'gamepad' },
  { label: 'Sport', detail: 'Climbing, Fitness, Dance', icon: 'sport' },
  { label: 'Reading', detail: 'Manga, novels, personal development', icon: 'book' },
  { label: 'Travel', countries: travelCountries, icon: 'plane' },
];

const ProfileText = ({ status, titleId, portraitPhoto, avatarInView }) => (
  <Fragment>
    <div className="profile__header-row">
      <Heading
        className={classNames('profile__title', `profile__title--${status}`)}
        level={3}
        id={titleId}
      >
        <DecoderText text="Hello" start={status !== 'exited'} delay={500} />
      </Heading>
      <div className={classNames('profile__avatar', { 'profile__avatar--in-view': avatarInView })}>
        <img
          src={portraitPhoto}
          alt=""
          className="profile__avatar-img"
          aria-hidden
        />
      </div>
    </div>
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
  </Fragment>
);

const Profile = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;
  const contentRef = useRef();
  const avatarInView = useInViewport(contentRef, true, { rootMargin: '0px 0px -15% 0px' });

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
          <div ref={contentRef} className={classNames('profile__content', { 'profile__content--entered': status === 'entered' })}>
            <div className="profile__header">
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
            </div>

            <div className="profile__columns">
              <div className="profile__col">
                <ProfileText status={status} titleId={titleId} portraitPhoto={portraitPhoto} avatarInView={avatarInView} />
              </div>
              <div className="profile__col">
                <h2 className="profile__col-title">What I love</h2>
                <div className="profile__passions-grid">
                  {passions.map(({ label, detail, countries, icon }, i) => (
                    <div
                      key={label}
                      className={classNames('profile__passion-card', { 'profile__passion-card--entered': status === 'entered' })}
                      style={{ '--card-delay': `${400 + i * 100}ms` }}
                    >
                      <span className="profile__passion-icon" aria-hidden>
                        <Icon icon={icon} />
                      </span>
                      <div className="profile__passion-body">
                        <span className="profile__passion-label">{label}</span>
                        {countries ? (
                          <div className="profile__passion-travel-scroll" aria-label="Countries visited">
                            <div className="profile__passion-travel-track">
                              {countries.map((country) => (
                                <span key={country} className="profile__passion-travel-item">{country}</span>
                              ))}
                              {countries.map((country) => (
                                <span key={`${country}-dup`} className="profile__passion-travel-item" aria-hidden>{country}</span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="profile__passion-detail">{detail}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default Profile;
