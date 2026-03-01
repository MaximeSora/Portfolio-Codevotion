import { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import ContactV2 from 'pages/Home/ContactV2';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionNextProject,
  ProjectTextRow,
  ProjectSectionText,
} from 'components/ProjectLayout';
import { Button } from 'components/Button';
import NotionRenderer from 'components/NotionRenderer';
import { useScrollRestore, useInViewport } from 'hooks';
import allProjects from '../../data/projects.json';
import './CaseStudy.css';

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

const CaseStudy = () => {
  const { slug } = useParams();
  useScrollRestore();
  const headerRef = useRef();
  const headerInView = useInViewport(headerRef, true, { rootMargin: '0px 0px -5% 0px' });

  const projectIndex = allProjects.findIndex(p => p.slug === slug);
  const project = allProjects[projectIndex];

  if (!project) {
    return (
      <div className="case-study case-study--not-found">
        <p>Projet introuvable.</p>
      </div>
    );
  }

  const { name, company, year, tags, cover, blocks } = project;
  const nextProject = allProjects[(projectIndex + 1) % allProjects.length];

  const firstParagraph = blocks.find(
    b => b.type === 'paragraph' && b.paragraph?.rich_text?.length > 0
  );
  const description = firstParagraph
    ? firstParagraph.paragraph.rich_text.map(t => t.plain_text).join('')
    : [company, tags.slice(0, 3).map(t => t.name).join(', ')].filter(Boolean).join(' · ');

  return (
    <Fragment>
      <Helmet>
        <title>{name} | Maxime Pocq</title>
        <meta name="description" content={description.slice(0, 155)} />
      </Helmet>

      <ProjectContainer className="case-study">
        {cover && (
          <div className="case-study__hero" aria-hidden>
            <img className="case-study__hero-img" src={cover} alt="" loading="eager" />
            <div className="case-study__hero-scrim" />
          </div>
        )}

        <ProjectSection first className="case-study__header-section">
          <ProjectSectionContent width="l">
            <div
              ref={headerRef}
              className={classNames('case-study__header', {
                'case-study__header--entered': headerInView,
              })}
            >
              {tags.length > 0 && (
                <ul className="case-study__tags" aria-label="Tags">
                  {tags.map(tag => (
                    <li
                      key={tag.name}
                      className="case-study__tag"
                      style={{ '--tag-color': TAG_COLORS[tag.color] ?? TAG_COLORS.default }}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              )}
              <h1 className="case-study__title">{name}</h1>
              {(company || year) && (
                <div className="case-study__meta">
                  {company && <span className="case-study__meta-company">{company}</span>}
                  {company && year && <span className="case-study__meta-sep" aria-hidden>·</span>}
                  {year && <span className="case-study__meta-year">{year}</span>}
                </div>
              )}
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className="case-study__body-section">
          <ProjectSectionContent width="l">
            <NotionRenderer blocks={blocks} />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className="case-study__next-section">
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionText>NEXT PROJECT</ProjectSectionText>
              <ProjectSectionNextProject>{nextProject.name}</ProjectSectionNextProject>
              <Button secondary iconHoverShift icon="arrowRight" href={`/projects/${nextProject.slug}`} />
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ContactV2 />
      </ProjectContainer>
    </Fragment>
  );
};

export default CaseStudy;
