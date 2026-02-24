import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'components/Link';
import Section from 'components/Section';
import { useWindowSize } from 'hooks';
import { media } from 'utils/style';
import './ProjectList.css';

const LERP = 0.1;
const lerp = (a, b, t) => a + (b - a) * t;

const ProjectList = ({ id, sectionRef, projects }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const previewRef = useRef();
  const rafRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const { width } = useWindowSize();
  const isMobile = width <= media.tablet;

  // rAF lerp loop
  useEffect(() => {
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, LERP);
      pos.current.y = lerp(pos.current.y, target.current.y, LERP);
      if (previewRef.current) {
        previewRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = e => {
      target.current = { x: e.clientX + 32, y: e.clientY - 140 };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  return (
    <Section className="project-list" as="section" id={id} ref={sectionRef}>
      {/* Floating cursor preview */}
      {!isMobile && (
        <div
          ref={previewRef}
          className={classNames('project-list__preview', {
            'project-list__preview--visible': hoveredIdx !== null,
          })}
          aria-hidden
        >
          {projects.map((project, i) =>
            project.video ? (
              <video
                key={i}
                className={classNames('project-list__preview-media', {
                  'project-list__preview-media--active': hoveredIdx === i,
                })}
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : project.image ? (
              <img
                key={i}
                className={classNames('project-list__preview-media', {
                  'project-list__preview-media--active': hoveredIdx === i,
                })}
                src={project.image}
                alt=""
              />
            ) : null
          )}
        </div>
      )}

      <div className="project-list__header">
        <span className="project-list__label">Selected work</span>
      </div>

      <ul className="project-list__items">
        {projects.map((project, i) => (
          <li
            key={i}
            className={classNames('project-list__item', {
              'project-list__item--dimmed': hoveredIdx !== null && hoveredIdx !== i,
              'project-list__item--soon': !project.link,
            })}
            onMouseEnter={() => !isMobile && setHoveredIdx(i)}
            onMouseLeave={() => !isMobile && setHoveredIdx(null)}
          >
            {project.link ? (
              <Link href={project.link} className="project-list__link">
                <span className="project-list__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="project-list__title">{project.title}</span>
                <span className="project-list__tags">{project.tags}</span>
                <span className="project-list__arrow" aria-hidden>↗</span>
              </Link>
            ) : (
              <div className="project-list__link project-list__link--disabled">
                <span className="project-list__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="project-list__title">{project.title}</span>
                <span className="project-list__tags">{project.tags}</span>
                <span className="project-list__badge">Soon</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ProjectList;
