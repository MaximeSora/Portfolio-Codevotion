import { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import Section from 'components/Section';
import { Button } from 'components/Button';
import Model from 'components/Model';
import Image from 'components/Image';
import Divider from 'components/Divider';
import { useWindowSize } from 'hooks';
import { reflow, isVisible } from 'utils/transition';
import { media } from 'utils/style';
import { ReactComponent as KatakanaProject } from 'assets/katakana-project.svg';
import deviceModels from 'components/Model/deviceModels';
import Heading from 'components/Heading';
import Text from 'components/Text';
import { useTheme } from 'components/ThemeProvider';
import './ProjectSummary.css';

import {
  ProjectImage,
} from 'components/ProjectLayout';

import solbaseLarge from 'assets/solbase/thumbnail.png';
import deviceModelsPlaceholder from 'assets/device-models-placeholder.jpg';
import pornhubLarge from 'assets/pornhub/thumbnail.png';
import joLarge from 'assets/jo/jo-thumbnail.mp4';
import parcoursLarge from 'assets/pexels-pixabay-33109.jpg';


const ProjectSummary = ({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) => {
  const theme = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  const renderDetails = status => (
    <div className="project-summary__details">
      <div aria-hidden className="project-summary__index">
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        />
        <span
          className={classNames(
            'project-summary__index-number',
            `project-summary__index-number--${status}`
          )}
        >
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={classNames(
          'project-summary__title',
          `project-summary__title--${status}`
        )}
        id={titleId}
      >
        {title}
      </Heading>
      <Text
        className={classNames(
          'project-summary__description',
          `project-summary__description--${status}`
        )}
      >
        {description}
      </Text>
      <div
        className={classNames(
          'project-summary__button',
          `project-summary__button--${status}`
        )}
      >
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const renderPreview = status => (
    <div className="project-summary__preview">
      {model.type === 'laptop' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--right',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
          <Model
            className={classNames(
              'project-summary__model',
              'project-summary__model--laptop'
            )}
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
            showDelay={800}
            show={isVisible(status)}
            models={[
              {
                ...deviceModels.laptop,
                texture: {
                  ...model.textures[0],
                  sizes: laptopSizes,
                },
              },
            ]}
          />
        </Fragment>
      )}
      {model.type === 'phone' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--phone',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
          <Model
            className={classNames(
              'project-summary__model',
              'project-summary__model--phone'
            )}
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 11.5 }}
            showDelay={500}
            show={isVisible(status)}
            models={[
              {
                ...deviceModels.phone,
                position: { x: -0.6, y: 1.1, z: 0 },
                texture: {
                  ...model.textures[0],
                  sizes: phoneSizes,
                },
              },
              {
                ...deviceModels.phone,
                position: { x: 0.6, y: -0.5, z: 0.3 },
                texture: {
                  ...model.textures[1],
                  sizes: phoneSizes,
                },
              },
            ]}
          />
        </Fragment>
      )}
      {model.type === 'solbase' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--left',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
            <ProjectImage
              raised
              srcSet={`${solbaseLarge} 1280w, ${solbaseLarge} 2560w`}
              placeholder={solbaseLarge}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Solbase Thumbnail."
            />
        </Fragment>
      )}
      {model.type === 'jo' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--left',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
            <ProjectImage
              raised
              src={`${joLarge}`}
              placeholder={joLarge}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Thumbnail Jeux Olympiques"
            />
        </Fragment>
      )}
      {model.type === 'parcours' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--left',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
            <ProjectImage
              raised
              src={`${parcoursLarge}`}
              placeholder={parcoursLarge}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Thumbnail Parcours"
            />
        </Fragment>
      )}
            {model.type === 'pornhub' && (
        <Fragment>
          <KatakanaProject
            style={{ '--opacity': svgOpacity }}
            className={classNames(
              'project-summary__svg',
              'project-summary__svg--left',
              `project-summary__svg--${status}`,
              {
                'project-summary__svg--light': theme.themeId === 'light',
              }
            )}
          />
            <ProjectImage
              raised
              srcSet={`${pornhubLarge} 1280w, ${pornhubLarge} 2560w`}
              placeholder={pornhubLarge}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Pornhub Thumbnail."
            />
        </Fragment>
      )}

    </div>
  );

  return (
    <Section
      className={classNames('project-summary', {
        'project-summary--alternate': alternate,
        'project-summary--first': index === '01',
      })}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className="project-summary__content">
        <Transition in={visible} timeout={0} onEnter={reflow}>
          {status => (
            <Fragment>
              {!alternate && !isMobile && (
                <Fragment>
                  {renderDetails(status)}
                  {renderPreview(status)}
                </Fragment>
              )}
              {(alternate || isMobile) && (
                <Fragment>
                  {renderPreview(status)}
                  {renderDetails(status)}
                </Fragment>
              )}
            </Fragment>
          )}
        </Transition>
      </div>
    </Section>
  );
};

export default ProjectSummary;
