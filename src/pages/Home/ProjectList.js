import { useState, useRef } from 'react';
import classNames from 'classnames';
import Link from 'components/Link';
import Section from 'components/Section';
import { useWindowSize, useInViewport } from 'hooks';
import { media } from 'utils/style';
import './ProjectList.css';

const ProjectItem = ({ project, index, dimmed, onMouseEnter, onMouseLeave }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -8% 0px' });

  const content = project.link ? (
    <Link href={project.link} className="project-list__link">
      <div className="project-list__info">
        <div className="project-list__text">
          <span className="project-list__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-list__title">{project.title}</span>
          <span className="project-list__description">{project.description}</span>
        </div>
        <span className="project-list__arrow" aria-hidden>↗</span>
      </div>
      <div className="project-list__thumb">
        {project.video ? (
          <video src={project.video} autoPlay muted loop playsInline />
        ) : project.image ? (
          <img src={project.image} alt={project.title} />
        ) : null}
      </div>
    </Link>
  ) : (
    <div className="project-list__link project-list__link--disabled">
      <div className="project-list__info">
        <div className="project-list__text">
          <span className="project-list__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-list__title">{project.title}</span>
          <span className="project-list__description">{project.description}</span>
        </div>
        <span className="project-list__badge">Soon</span>
      </div>
      <div className="project-list__thumb project-list__thumb--placeholder" />
    </div>
  );

  return (
    <li
      ref={ref}
      className={classNames('project-list__item', {
        'project-list__item--entered': inView,
        'project-list__item--dimmed': dimmed,
        'project-list__item--soon': !project.link,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </li>
  );
};

const ProjectList = ({ id, sectionRef, projects }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const { width } = useWindowSize();
  const isMobile = width <= media.tablet;

  return (
    <Section className="project-list" as="section" id={id} ref={sectionRef}>
      <div className="project-list__header">
        <span className="project-list__label">Selected work</span>
      </div>
      <ul className="project-list__items">
        {projects.map((project, i) => (
          <ProjectItem
            key={i}
            project={project}
            index={i}
            dimmed={hoveredIdx !== null && hoveredIdx !== i}
            onMouseEnter={() => !isMobile && setHoveredIdx(i)}
            onMouseLeave={() => !isMobile && setHoveredIdx(null)}
          />
        ))}
      </ul>
    </Section>
  );
};

export default ProjectList;
