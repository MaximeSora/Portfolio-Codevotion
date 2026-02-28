import { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import Footer from 'components/Footer';
import { ProjectContainer, ProjectSection, ProjectSectionContent } from 'components/ProjectLayout';
import NotionRenderer from 'components/NotionRenderer';
import { useScrollRestore, useInViewport } from 'hooks';
import allProjects from '../../data/projects.json';
import './CaseStudy.css';

// Tag color map — matches Notion palette to the site's DA
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

  const project = allProjects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="case-study case-study--not-found">
        <p>Projet introuvable.</p>
      </div>
    );
  }

  const { name, company, year, tags, cover, blocks } = project;

  // Extract a short description from first paragraph block
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
        {/* ── Hero cover ── */}
        {cover && (
          <div className="case-study__hero" aria-hidden>
            <img
              className="case-study__hero-img"
              src={cover}
              alt=""
              loading="eager"
            />
            <div className="case-study__hero-scrim" />
          </div>
        )}

        {/* ── Header ── */}
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

        {/* ── Body (Notion blocks) ── */}
        <ProjectSection className="case-study__body-section">
          <ProjectSectionContent width="m">
            <NotionRenderer blocks={blocks} />
          </ProjectSectionContent>
        </ProjectSection>

        <Footer />
      </ProjectContainer>
    </Fragment>
  );
};

export default CaseStudy;
