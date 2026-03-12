import { useState, useEffect } from 'react';
import classNames from 'classnames';
import ProjectList from './ProjectList';
import './ProjectCards.css';

const TAG_COLORS = {
  purple: '#9065B0',
  green: '#448361',
  pink: '#C14C8A',
  yellow: '#CB912F',
  red: '#D44C47',
  blue: '#337EA9',
  orange: '#D9730D',
  brown: '#8B6455',
  gray: 'rgb(var(--rgbText) / 0.4)',
  default: 'rgb(var(--rgbText) / 0.4)',
};

const ProjectModal = ({ projects, activeIndex, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  const project = projects[currentIndex];
  const total = projects.length;
  const prevProject = projects[(currentIndex - 1 + total) % total];
  const nextProject = projects[(currentIndex + 1) % total];

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 380);
  };

  const handlePrev = () => setCurrentIndex(i => (i - 1 + total) % total);
  const handleNext = () => setCurrentIndex(i => (i + 1) % total);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={classNames('project-modal__backdrop', { 'project-modal__backdrop--closing': closing })}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={classNames('project-modal', { 'project-modal--closing': closing })}
        onClick={e => e.stopPropagation()}
      >
        <div className="project-modal__handle" aria-hidden />
        <button className="project-modal__close" onClick={handleClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div key={currentIndex} className="project-modal__content">
          <div className="project-modal__inner">
            <div className="project-modal__left">
              <div className="project-modal__header">
                <span className="project-modal__year">
                  {project.company}
                  {project.company && project.year && <span aria-hidden> · </span>}
                  {project.year}
                </span>
              </div>

              <h2 className="project-modal__title">{project.name}</h2>

              <p className="project-modal__summary">{project.summary}</p>

              {project.challenge && (
                <div className="project-modal__section">
                  <span className="project-modal__label">Challenge</span>
                  <p className="project-modal__text">{project.challenge}</p>
                </div>
              )}

              {project.impact && (
                <div className="project-modal__section">
                  <span className="project-modal__label">Impact</span>
                  <p className="project-modal__text project-modal__text--bold">{project.impact}</p>
                </div>
              )}

              {project.tags?.length > 0 && (
                <ul className="project-modal__tags" aria-label="Tags">
                  {project.tags.map(tag => (
                    <li
                      key={tag.name}
                      className="project-modal__tag"
                      style={{ '--tag-color': TAG_COLORS[tag.color] ?? TAG_COLORS.default }}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="project-modal__right">
              {project.cover && (
                <img src={project.cover} alt="" className="project-modal__cover" />
              )}
            </div>
          </div>
        </div>

        <div className="project-modal__nav">
          <button
            className="project-modal__nav-btn project-modal__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="project-modal__nav-name">{prevProject.name}</span>
          </button>

          <span className="project-modal__nav-count" aria-label={`Project ${currentIndex + 1} of ${total}`}>
            {currentIndex + 1} / {total}
          </span>

          <button
            className="project-modal__nav-btn project-modal__nav-btn--next"
            onClick={handleNext}
            aria-label="Next project"
          >
            <span className="project-modal__nav-name">{nextProject.name}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="project-modal__footer">
          <a href="mailto:maxime.pocq@gmail.com" className="link link--secondary">
            get in touch to see more
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectCards = ({ id, sectionRef, projects }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = project => {
    const index = projects.findIndex(p => p.id === project.id);
    setActiveIndex(index !== -1 ? index : 0);
  };

  return (
    <>
      <ProjectList
        id={id}
        sectionRef={sectionRef}
        projects={projects}
        onItemClick={handleItemClick}
        footer={
          <div className="project-cards__cta">
            <p className="project-cards__cta-sub">Interested to see more?</p>
            <a href="mailto:maxime.pocq@gmail.com" className="link link--secondary">
              Contact me to see detailed projects →
            </a>
          </div>
        }
      />
      {activeIndex !== null && (
        <ProjectModal
          projects={projects}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default ProjectCards;
