import { useRef } from 'react';
import { useInViewport } from 'hooks';
import placeholderSrc from 'assets/placeholder.svg';
import './CosmicBlockRenderer.css';

function InViewBlock({ children, delay = 0, className = '' }) {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -6% 0px' });
  return (
    <div
      ref={ref}
      className={`cosmic-block ${className}${inView ? ' cosmic-block--entered' : ''}`.trim()}
      style={{ '--block-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HeadingBlock({ eyebrow, title }) {
  return (
    <div className="cosmic-heading">
      {eyebrow && <span className="cosmic-heading__eyebrow">{eyebrow}</span>}
      <h3 className="cosmic-heading__title">{title}</h3>
    </div>
  );
}

function ParagraphBlock({ content }) {
  if (!content) return null;
  return <p className="cosmic-paragraph">{content}</p>;
}

function FactsBlock({ title, items = [] }) {
  return (
    <div className="cosmic-facts">
      {title && <h4 className="cosmic-facts__title">{title}</h4>}
      <div className="cosmic-facts__grid">
        {items.map((item, i) => (
          <div key={i} className="cosmic-facts__item">
            <span className="cosmic-facts__label">{item.label}</span>
            <span className="cosmic-facts__value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsBlock({ eyebrow, title, intro, items = [] }) {
  return (
    <div className="cosmic-metrics">
      <div className="cosmic-metrics__header">
        {eyebrow && <span className="cosmic-metrics__eyebrow">{eyebrow}</span>}
        {title && <h4 className="cosmic-metrics__title">{title}</h4>}
        {intro && <p className="cosmic-metrics__intro">{intro}</p>}
      </div>
      <div className="cosmic-metrics__card">
        <div className="cosmic-metrics__grid">
          {items.map((item, i) => (
            <div key={i} className="cosmic-metrics__item">
              <span className="cosmic-metrics__value">{item.value}</span>
              <span className="cosmic-metrics__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteBlock({ quote, attribution, role }) {
  return (
    <blockquote className="cosmic-quote">
      <p className="cosmic-quote__text">{quote}</p>
      {(attribution || role) && (
        <footer className="cosmic-quote__footer">
          {attribution && <cite className="cosmic-quote__attribution">{attribution}</cite>}
          {role && <span className="cosmic-quote__role">{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

function VisualBlock({ title, description, assetUrl, caption }) {
  const src = assetUrl || placeholderSrc;
  return (
    <figure className="cosmic-visual">
      <img className="cosmic-visual__img" src={src} alt={title || caption || ''} loading="lazy" />
      {(title || caption || description) && (
        <figcaption className="cosmic-visual__caption">
          {title && <span className="cosmic-visual__caption-title">{title}</span>}
          {(caption || description) && (
            <span className="cosmic-visual__caption-desc">{caption || description}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function ListBlock({ title, style = 'bullets', items = [] }) {
  const Tag = style === 'checks' ? 'ul' : style === 'bullets' ? 'ul' : 'ol';
  return (
    <div className="cosmic-list">
      {title && <h4 className="cosmic-list__title">{title}</h4>}
      <Tag className={`cosmic-list__items cosmic-list__items--${style}`}>
        {items.map((item, i) => (
          <li key={i} className="cosmic-list__item">
            {style === 'checks' && <span className="cosmic-list__check" aria-hidden>&#10003;</span>}
            {item}
          </li>
        ))}
      </Tag>
    </div>
  );
}

function ToggleBlock({ title, content }) {
  return (
    <details className="cosmic-toggle">
      <summary className="cosmic-toggle__summary">{title}</summary>
      <div className="cosmic-toggle__content">
        {content && <p>{content}</p>}
      </div>
    </details>
  );
}

function BeforeAfterBlock({ title, intro, beforeLabel, beforeBody, afterLabel, afterBody, note }) {
  return (
    <div className="cosmic-before-after">
      {title && <h4 className="cosmic-before-after__title">{title}</h4>}
      {intro && <p className="cosmic-before-after__intro">{intro}</p>}
      <div className="cosmic-before-after__columns">
        <div className="cosmic-before-after__col cosmic-before-after__col--before">
          <span className="cosmic-before-after__label">{beforeLabel || 'Before'}</span>
          <p className="cosmic-before-after__body">{beforeBody}</p>
        </div>
        <div className="cosmic-before-after__col cosmic-before-after__col--after">
          <span className="cosmic-before-after__label">{afterLabel || 'After'}</span>
          <p className="cosmic-before-after__body">{afterBody}</p>
        </div>
      </div>
      {note && <p className="cosmic-before-after__note">{note}</p>}
    </div>
  );
}

function CosmicBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock eyebrow={block.eyebrow} title={block.title} />;
    case 'paragraph':
      return <ParagraphBlock content={block.content} />;
    case 'facts':
      return <FactsBlock title={block.title} items={block.items} />;
    case 'metrics':
      return <MetricsBlock eyebrow={block.eyebrow} title={block.title} intro={block.intro} items={block.items} />;
    case 'quote':
      return <QuoteBlock quote={block.quote} attribution={block.attribution} role={block.role} />;
    case 'visual':
      return <VisualBlock title={block.title} description={block.description} assetUrl={block.assetUrl} caption={block.caption} />;
    case 'list':
      return <ListBlock title={block.title} style={block.style} items={block.items} />;
    case 'toggle':
      return <ToggleBlock title={block.title} content={block.content} />;
    case 'beforeAfter':
      return <BeforeAfterBlock {...block} />;
    default:
      return null;
  }
}

export default function CosmicBlockRenderer({ document, animate = false }) {
  if (!document?.blocks?.length) return null;

  return (
    <div className="cosmic-renderer">
      {document.blocks.map((block, i) => {
        const delay = Math.min(i * 40, 200);
        const blockClass = `cosmic-block${block.type === 'heading' ? ' cosmic-block--heading' : ''}`;
        const el = <CosmicBlock key={block.id ?? i} block={block} />;
        return animate ? (
          <InViewBlock key={block.id ?? i} delay={delay} className={block.type === 'heading' ? 'cosmic-block--heading' : ''}>{el}</InViewBlock>
        ) : (
          <div key={block.id ?? i} className={blockClass}>{el}</div>
        );
      })}
    </div>
  );
}
