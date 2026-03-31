import { Fragment, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import ContactV2 from 'pages/Home/ContactV2';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
} from 'components/ProjectLayout';
import { Button } from 'components/Button';
import NotionRenderer from 'components/NotionRenderer';
import CosmicBlockRenderer from 'components/CosmicBlockRenderer';
import { useScrollRestore, useInViewport } from 'hooks';
import allProjects from '../../data/projects.json';
import './CaseStudy.css';


const cleanText = value => value?.replace(/\s+/g, ' ').trim() ?? '';

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

  const {
    name,
    company,
    year,
    tags = [],
    cover,
    blocks: rawBlocks,
    headline,
    roleSummary,
    outcomeHighlight,
    summary,
    challenge,
    impact,
  } = project;
  const isCosmicBlocks = rawBlocks?.kind === 'cosmic-blocks';
  const notionBlocks = isCosmicBlocks ? [] : (Array.isArray(rawBlocks) ? rawBlocks : []);
  const nextProject = allProjects[(projectIndex + 1) % allProjects.length];

  // Scroll fade: hide when near bottom of page
  const [scrollFadeVisible, setScrollFadeVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setScrollFadeVisible(distFromBottom > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const firstParagraph = notionBlocks.find(
    b => b.type === 'paragraph' && b.paragraph?.rich_text?.length > 0
  );
  const firstParagraphText = firstParagraph
    ? firstParagraph.paragraph.rich_text.map(t => t.plain_text).join('')
    : '';
  const description = cleanText(headline)
    || cleanText(summary)
    || cleanText(firstParagraphText)
    || [company, tags.slice(0, 3).map(t => t.name).join(', ')].filter(Boolean).join(' · ');
  const roleLabel = cleanText(roleSummary);

  // Overview facts table (Nicole Roberts style)
  const overviewFacts = [
    roleLabel && { label: 'Role', value: roleLabel },
    company && { label: 'Company', value: company },
    year && { label: 'Timeline', value: year },
    tags.length > 0 && { label: 'Scope', value: tags.slice(0, 4).map(t => t.name).join(', ') },
  ].filter(Boolean);

  // Overview text: use summary or first paragraph
  const overviewText = cleanText(summary) || cleanText(firstParagraphText);

  // Extract goals from Notion blocks (heading_2 "Goals" + following bulleted items)
  const getPlainText = (richText = []) => richText.map(t => t.plain_text).join('').trim();
  const goalItems = [];
  let filteredBlocks = notionBlocks;

  if (!isCosmicBlocks) {
    const goalsHeadingIdx = notionBlocks.findIndex(b =>
      b.type === 'heading_2' && getPlainText(b.heading_2?.rich_text).toLowerCase() === 'goals'
    );
    if (goalsHeadingIdx !== -1) {
      for (let gi = goalsHeadingIdx + 1; gi < notionBlocks.length; gi++) {
        if (notionBlocks[gi].type === 'bulleted_list_item' || notionBlocks[gi].type === 'numbered_list_item') {
          goalItems.push(getPlainText(notionBlocks[gi][notionBlocks[gi].type]?.rich_text));
        } else break;
      }
    }

    // Find overview section boundaries to skip in NotionRenderer
    const overviewHeadingIdx = notionBlocks.findIndex(b =>
      b.type === 'heading_2' && getPlainText(b.heading_2?.rich_text).toLowerCase() === 'overview'
    );
    const skipBlockIds = new Set();
    if (overviewHeadingIdx !== -1) {
      skipBlockIds.add(notionBlocks[overviewHeadingIdx].id);
      for (let si = overviewHeadingIdx + 1; si < notionBlocks.length; si++) {
        if (notionBlocks[si].type === 'heading_2') break;
        skipBlockIds.add(notionBlocks[si].id);
      }
    }
    if (goalsHeadingIdx !== -1) {
      skipBlockIds.add(notionBlocks[goalsHeadingIdx].id);
      for (let gi = goalsHeadingIdx + 1; gi < notionBlocks.length; gi++) {
        if (notionBlocks[gi].type === 'bulleted_list_item' || notionBlocks[gi].type === 'numbered_list_item') {
          skipBlockIds.add(notionBlocks[gi].id);
        } else break;
      }
    }
    filteredBlocks = notionBlocks.filter(b => !skipBlockIds.has(b.id));
  }

  // Filter cosmic blocks: skip Overview heading + following paragraph/facts/goals
  // (already rendered by the CaseStudy overview section above)
  let cosmicDocument = rawBlocks;
  if (isCosmicBlocks && rawBlocks?.blocks?.length) {
    const cBlocks = rawBlocks.blocks;
    const skipIds = new Set();
    const overviewIdx = cBlocks.findIndex(b =>
      b.type === 'heading' && b.title?.toLowerCase() === 'overview'
    );
    if (overviewIdx !== -1) {
      skipIds.add(cBlocks[overviewIdx].id);
      for (let i = overviewIdx + 1; i < cBlocks.length; i++) {
        if (cBlocks[i].type === 'heading') break;
        skipIds.add(cBlocks[i].id);
      }
    }
    const goalsIdx = cBlocks.findIndex(b =>
      b.type === 'heading' && b.title?.toLowerCase() === 'goals'
    );
    if (goalsIdx !== -1) {
      skipIds.add(cBlocks[goalsIdx].id);
      for (let i = goalsIdx + 1; i < cBlocks.length; i++) {
        if (cBlocks[i].type === 'heading') break;
        skipIds.add(cBlocks[i].id);
      }
    }
    if (skipIds.size > 0) {
      cosmicDocument = {
        ...rawBlocks,
        blocks: cBlocks.filter(b => !skipIds.has(b.id)),
      };
    }
  }

  const nextProjectSummary = cleanText(nextProject.headline)
    || cleanText(nextProject.outcomeHighlight)
    || cleanText(nextProject.summary)
    || cleanText(nextProject.challenge)
    || cleanText(nextProject.impact);
  const nextProjectSignals = [
    nextProject.company,
    nextProject.year,
    nextProject.tags?.slice(0, 2).map(tag => tag.name).join(' · '),
  ].filter(Boolean);

  return (
    <Fragment>
      <Helmet>
        <title>{name} | Maxime Pocq</title>
        <meta name="description" content={description.slice(0, 155)} />
      </Helmet>

      <div
        className={classNames('case-study__scroll-fade', {
          'case-study__scroll-fade--hidden': !scrollFadeVisible,
        })}
        aria-hidden
      />

      <ProjectContainer className="case-study">
        {cover && (
          <div className="case-study__hero" aria-hidden>
            <img className="case-study__hero-img" src={cover} alt="" loading="eager" />
            <div className="case-study__hero-scrim" />
          </div>
        )}

        <ProjectSection first className="case-study__header-section">
          <ProjectSectionContent width="full">
            <div
              ref={headerRef}
              className={classNames('case-study__header', {
                'case-study__header--entered': headerInView,
              })}
            >
              {tags.length > 0 && (
                <ul className="case-study__tags" aria-label="Tags">
                  {tags.map(tag => (
                    <li key={tag.name} className="case-study__tag">
                      {tag.name}
                    </li>
                  ))}
                </ul>
              )}

              <div className="case-study__header-body">
                <h1 className="case-study__title">{name}</h1>
                <div className="case-study__header-aside">
                  <p className="case-study__lede">{description}</p>
                  {(company || year) && (
                    <div className="case-study__meta">
                      {company && <span className="case-study__meta-company">{company}</span>}
                      {company && year && <span className="case-study__meta-sep" aria-hidden>·</span>}
                      {year && <span className="case-study__meta-year">{year}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {(overviewText || overviewFacts.length > 0) && (
          <ProjectSection className="case-study__overview-section">
            <ProjectSectionContent width="l">
              <div className="case-study__overview">
                {(overviewText || goalItems.length > 0) && (
                  <div className="case-study__overview-text">
                    <h2 className="case-study__overview-heading">Overview</h2>
                    {overviewText && <p className="case-study__overview-body">{overviewText}</p>}
                    {goalItems.length > 0 && (
                      <div className="case-study__goals">
                        <h3 className="case-study__goals-heading">Goals</h3>
                        <ol className="case-study__goals-list">
                          {goalItems.map((goal, gi) => (
                            <li key={gi} className="case-study__goals-item">{goal}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
                {overviewFacts.length > 0 && (
                  <div className="case-study__overview-facts">
                    {overviewFacts.map(fact => (
                      <div key={fact.label} className="case-study__overview-fact">
                        <span className="case-study__overview-fact-label">{fact.label}</span>
                        <span className="case-study__overview-fact-value">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ProjectSectionContent>
          </ProjectSection>
        )}

        <ProjectSection className="case-study__body-section">
          <ProjectSectionContent width="l">
            {isCosmicBlocks
              ? <CosmicBlockRenderer document={cosmicDocument} />
              : <NotionRenderer blocks={filteredBlocks} animate={false} />
            }
          </ProjectSectionContent>
        </ProjectSection>

        {(outcomeHighlight || impact) && (
          <ProjectSection className="case-study__outcome-section">
            <ProjectSectionContent width="l">
              <div className="case-study__outcome">
                {outcomeHighlight && (
                  <div className="case-study__outcome-block">
                    <span className="case-study__outcome-label">Outcome</span>
                    <p className="case-study__outcome-text">{outcomeHighlight}</p>
                  </div>
                )}
                {impact && cleanText(impact) !== cleanText(outcomeHighlight) && (
                  <div className="case-study__outcome-block">
                    <span className="case-study__outcome-label">Impact</span>
                    <p className="case-study__outcome-text">{impact}</p>
                  </div>
                )}
              </div>
            </ProjectSectionContent>
          </ProjectSection>
        )}

        <ProjectSection className="case-study__next-section">
          <ProjectSectionContent width="l">
            <div className="case-study__next-card">
              <div className="case-study__next-body">
                <div className="case-study__next-copy">
                  <p className="case-study__next-kicker">Next project</p>
                  <h2 className="case-study__next-title">{nextProject.name}</h2>
                  {nextProjectSummary && (
                    <p className="case-study__next-text">{nextProjectSummary}</p>
                  )}
                  {nextProjectSignals.length > 0 && (
                    <div className="case-study__next-meta" aria-label="Next project metadata">
                      {nextProjectSignals.map(signal => (
                        <span key={signal} className="case-study__next-meta-item">
                          {signal}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="case-study__next-actions">
                    <Button
                      className="case-study__next-button"
                      iconHoverShift
                      iconEnd="arrowRight"
                      href={`/projects/${nextProject.slug}`}
                    >
                      View case study
                    </Button>
                  </div>
                </div>
                {nextProject.cover && (
                  <div className="case-study__next-cover">
                    <img
                      className="case-study__next-cover-img"
                      src={nextProject.cover}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ContactV2 />
      </ProjectContainer>
    </Fragment>
  );
};

export default CaseStudy;
