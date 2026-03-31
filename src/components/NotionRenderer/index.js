import { useRef, useState } from 'react';
import Image from 'components/Image';
import { useInViewport } from 'hooks';
import placeholderSrc from 'assets/placeholder.svg';
import './NotionRenderer.css';

// Convertit un href Notion en ancre in-page si c'est un lien interne.
// Les IDs de blocs Notion sont des UUIDs sans tirets dans l'URL.
function resolveHref(href) {
  if (!href) return { href, internal: false };
  const hashIdx = href.lastIndexOf('#');
  if (hashIdx !== -1) {
    const fragment = href.slice(hashIdx + 1);
    // UUID sans tirets = 32 caractères hex
    if (/^[0-9a-f]{32}$/i.test(fragment)) {
      const uuid = [
        fragment.slice(0, 8),
        fragment.slice(8, 12),
        fragment.slice(12, 16),
        fragment.slice(16, 20),
        fragment.slice(20),
      ].join('-');
      return { href: `#${uuid}`, internal: true };
    }
  }
  if (href.startsWith('#')) return { href, internal: true };
  return { href, internal: false };
}

// Wrapper qui déclenche l'animation d'entrée quand le bloc est visible
function InViewBlock({ children, delay = 0, className = '' }) {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -6% 0px' });
  return (
    <div
      ref={ref}
      className={`notion-block ${className}${inView ? ' notion-block--entered' : ''}`.trim()}
      style={{ '--block-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Render inline rich_text with annotations (bold, italic, code, links, colors)
function RichText({ items = [] }) {
  return items.map((item, i) => {
    const { annotations, plain_text, href } = item;
    let node = plain_text;

    if (annotations?.code) node = <code key={`c${i}`} className="notion-inline-code">{node}</code>;
    if (annotations?.bold) node = <strong key={`b${i}`}>{node}</strong>;
    if (annotations?.italic) node = <em key={`em${i}`}>{node}</em>;
    if (annotations?.strikethrough) node = <s key={`s${i}`}>{node}</s>;
    if (annotations?.underline) node = <u key={`u${i}`}>{node}</u>;

    const color = annotations?.color;
    const spanStyle = color && color !== 'default' ? { color: `var(--notion-${color.replace('_background', '')})` } : undefined;

    if (href) {
      const { href: resolvedHref, internal } = resolveHref(href);
      return internal ? (
        <a key={i} href={resolvedHref} style={spanStyle} className="notion-link">
          {node}
        </a>
      ) : (
        <a key={i} href={resolvedHref} target="_blank" rel="noopener noreferrer" style={spanStyle} className="notion-link">
          {node}
        </a>
      );
    }

    return spanStyle
      ? <span key={i} style={spanStyle}>{node}</span>
      : <span key={i}>{node}</span>;
  });
}

function richTextToPlain(items = []) {
  return items.map(item => item?.plain_text ?? '').join('').trim();
}

function splitCalloutSegments(text = '') {
  return text
    .split('|')
    .map(part => part.trim())
    .filter(Boolean);
}

function getCalloutIconEmoji(block) {
  return block?.callout?.icon?.emoji ?? '';
}

function getCalloutText(block) {
  return richTextToPlain(block?.callout?.rich_text);
}

function stripPlaceholderPrefix(text = '') {
  return text
    .replace(/^(placeholder image|visual placeholder|placeholder video|video placeholder)\s*[:\-–—]?\s*/i, '')
    .trim();
}

function getImageData(block) {
  if (!block || block.type !== 'image') return null;
  const src = block.image?.external?.url ?? block.image?.file?.url;
  const caption = richTextToPlain(block.image?.caption);
  if (!src) return null;
  return { src, caption, alt: caption || '' };
}

function isMediaPlaceholderCallout(block) {
  if (!block || block.type !== 'callout') return false;
  const icon = getCalloutIconEmoji(block);
  const text = getCalloutText(block).toLowerCase();
  return (
    icon === '🖼️'
    || icon === '🎞️'
    || text.startsWith('placeholder image')
    || text.startsWith('visual placeholder')
    || text.startsWith('placeholder video')
    || text.startsWith('video placeholder')
  );
}

function getMediaPlaceholderData(block) {
  if (!isMediaPlaceholderCallout(block)) return null;

  const icon = getCalloutIconEmoji(block);
  const text = getCalloutText(block);
  const segments = splitCalloutSegments(text);
  const prefix = segments[0] || (icon === '🎞️' ? 'Visual placeholder' : 'Placeholder image');
  const titleCandidate = segments[1] || '';
  const descriptionCandidate = segments[2] || '';
  const notes = segments.slice(3);
  const fallbackDescription = stripPlaceholderPrefix(text);

  return {
    icon,
    eyebrow: prefix,
    title: titleCandidate || (icon === '🎞️' ? 'Add the final video' : 'Add the final image'),
    description: descriptionCandidate || fallbackDescription || 'Use this block as a visual marker until the final asset is ready.',
    notes,
    kind: icon === '🎞️' ? 'video' : 'image',
  };
}

function isComparisonCallout(block) {
  if (!block || block.type !== 'callout') return false;
  const icon = getCalloutIconEmoji(block);
  const text = getCalloutText(block).toLowerCase();
  return (
    icon === '↔️'
    || text.startsWith('before/after')
    || text.startsWith('avant/apres')
    || text.startsWith('avant/après')
  );
}

function getComparisonData(block) {
  if (!isComparisonCallout(block)) return null;

  const text = getCalloutText(block);
  const images = (block.children ?? [])
    .map(getImageData)
    .filter(Boolean);

  const segments = splitCalloutSegments(text);

  return {
    title: segments[1] || 'Before / After',
    description: segments[2] || '',
    notes: segments.slice(3),
    before: images[0] ?? null,
    after: images[1] ?? null,
    imageCount: images.length,
  };
}

function isWhatIWorkedOnHeading(block) {
  if (!block || !['heading_1', 'heading_2', 'heading_3'].includes(block.type)) return false;
  const text = richTextToPlain(block[block.type]?.rich_text).toLowerCase();
  return text.includes('what i worked on') || text.includes('what i worked');
}

function isLearnedToggle(block) {
  if (!block || block.type !== 'toggle') return false;
  const text = richTextToPlain(block.toggle?.rich_text).toLowerCase();
  return text.includes('what i learned') || text.includes('what i would do differently') || text.includes('lessons') || text.includes('takeaways') || text.includes('reflections');
}

function getBlockWidthClass(group, previous) {
  if (!group) return 'notion-block--content';
  if (group.type === 'bulleted_list' && isWhatIWorkedOnHeading(previous)) return 'notion-block--wide';
  if (group.type === 'bulleted_list' || group.type === 'numbered_list') return 'notion-block--content';
  if (group.type === 'toggle' && isLearnedToggle(group)) return 'notion-block--wide';
  if (group.type === 'quote') return 'notion-block--wide';
  if (group.type === 'callout') return 'notion-block--wide';
  if (group.type === 'column_list') return 'notion-block--full';
  if (group.type === 'table') return 'notion-block--full';
  if (group.type === 'image' || group.type === 'video' || group.type === 'embed') return 'notion-block--full';
  if (group.type === 'divider') return 'notion-block--wide';
  return 'notion-block--content';
}

function MediaPlaceholderBlock({ title, description }) {
  return (
    <figure className="notion-placeholder">
      <img className="notion-placeholder__img" src={placeholderSrc} alt={title || 'Placeholder'} loading="lazy" />
      {(title || description) && (
        <figcaption className="notion-placeholder__caption">
          {title && <span className="notion-placeholder__caption-title">{title}</span>}
          {description && <span className="notion-placeholder__caption-desc">{description}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function ComparisonPlaceholderBlock({ title, description, notes, imageCount }) {
  return (
    <figure className="notion-comparison notion-comparison--placeholder">
      <div className="notion-comparison__header">
        <div className="notion-comparison__eyebrow">Before / After</div>
        <figcaption className="notion-comparison__title">{title}</figcaption>
        <p className="notion-comparison__description">
          {description || 'Add two images with captions Before and After to activate the comparison slider.'}
        </p>
      </div>

      <div className="notion-comparison__placeholder-frame">
        <div className="notion-comparison__ghost notion-comparison__ghost--before">
          <span className="notion-comparison__ghost-label">Before</span>
          <span className="notion-comparison__ghost-text">Add image</span>
        </div>
        <div className="notion-comparison__ghost notion-comparison__ghost--after">
          <span className="notion-comparison__ghost-label">After</span>
          <span className="notion-comparison__ghost-text">Add image</span>
        </div>
        <div className="notion-comparison__divider" aria-hidden>
          <div className="notion-comparison__handle">
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="notion-comparison__placeholder-footer">
        <span className="notion-comparison__status">{`${imageCount}/2 images connected`}</span>
        <span className="notion-comparison__hint">Use two images and set captions to Before / After.</span>
      </div>

      {notes.length > 0 && (
        <div className="notion-comparison__notes" aria-label="Comparison notes">
          {notes.map(note => (
            <span key={note} className="notion-comparison__note">
              {note}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}

function ComparisonBlock({ title, description, before, after, imageCount }) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="notion-comparison">
      <div className="notion-comparison__header">
        <div className="notion-comparison__eyebrow">Before / After</div>
        <figcaption className="notion-comparison__title">{title}</figcaption>
        {description && <p className="notion-comparison__description">{description}</p>}
      </div>

      <div className="notion-comparison__viewport" style={{ '--comparison-position': `${position}%` }}>
        <img className="notion-comparison__image notion-comparison__image--after" src={after.src} alt={after.alt} loading="lazy" />
        <div className="notion-comparison__clip" style={{ width: `${position}%` }}>
          <img className="notion-comparison__image notion-comparison__image--before" src={before.src} alt={before.alt} loading="lazy" />
        </div>

        <span className="notion-comparison__badge notion-comparison__badge--before">{before.caption || 'Before'}</span>
        <span className="notion-comparison__badge notion-comparison__badge--after">{after.caption || 'After'}</span>

        <div className="notion-comparison__divider" aria-hidden>
          <div className="notion-comparison__handle">
            <span />
            <span />
          </div>
        </div>

        <input
          className="notion-comparison__range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={event => setPosition(Number(event.target.value))}
          aria-label={`Compare ${before.caption || 'Before'} and ${after.caption || 'After'}`}
        />
      </div>
      <div className="notion-comparison__placeholder-footer">
        <span className="notion-comparison__status">2/2 images connected</span>
        <span className="notion-comparison__hint">
          Captions become the labels. Use Before and After for the strongest contrast.
        </span>
      </div>
      {imageCount > 2 && (
        <div className="notion-comparison__notes" aria-label="Extra comparison images">
          <span className="notion-comparison__note">
            {`${imageCount - 2} extra image${imageCount - 2 > 1 ? 's' : ''} ignored`}
          </span>
        </div>
      )}
    </figure>
  );
}

// Single block renderer
function Block({ block }) {
  const { type } = block;
  const data = block[type];

  switch (type) {
    case 'paragraph':
      if (!data?.rich_text?.length) return <div className="notion-spacer" />;
      return (
        <p className="notion-paragraph">
          <RichText items={data.rich_text} />
        </p>
      );

    case 'heading_1':
      return (
        <h2 id={block.id} className="notion-h1">
          <RichText items={data?.rich_text} />
        </h2>
      );

    case 'heading_2':
      return (
        <h3 id={block.id} className="notion-h2">
          <RichText items={data?.rich_text} />
        </h3>
      );

    case 'heading_3':
      return (
        <h4 id={block.id} className="notion-h3">
          <RichText items={data?.rich_text} />
        </h4>
      );

    case 'bulleted_list_item':
      return (
        <li className="notion-bulleted-item">
          <RichText items={data?.rich_text} />
          {block.children?.length > 0 && (
            <ul className="notion-list notion-list--bulleted">
              {block.children.map(b => <Block key={b.id} block={b} />)}
            </ul>
          )}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="notion-numbered-item">
          <RichText items={data?.rich_text} />
          {block.children?.length > 0 && (
            <ol className="notion-list notion-list--numbered">
              {block.children.map(b => <Block key={b.id} block={b} />)}
            </ol>
          )}
        </li>
      );

    case 'quote':
      return (
        <blockquote className="notion-quote">
          <RichText items={data?.rich_text} />
          {block.children?.length > 0 && <NotionRenderer blocks={block.children} />}
        </blockquote>
      );

    case 'callout': {
      const mediaPlaceholderData = getMediaPlaceholderData(block);
      if (mediaPlaceholderData) {
        return <MediaPlaceholderBlock {...mediaPlaceholderData} />;
      }

      const comparisonData = getComparisonData(block);
      if (comparisonData) {
        return comparisonData.imageCount >= 2
          ? <ComparisonBlock {...comparisonData} />
          : <ComparisonPlaceholderBlock {...comparisonData} />;
      }

      const calloutColor = data?.color || '';
      const calloutClass = calloutColor ? `notion-callout notion-callout--${calloutColor}` : 'notion-callout';
      return (
        <div className={calloutClass}>
          {data?.icon?.emoji && (
            <span className="notion-callout__icon" aria-hidden>{data.icon.emoji}</span>
          )}
          <div className="notion-callout__text">
            <RichText items={data?.rich_text} />
            {block.children?.length > 0 && <NotionRenderer blocks={block.children} />}
          </div>
        </div>
      );
    }

    case 'code':
      return (
        <pre className="notion-code">
          <code className={`language-${data?.language ?? 'plaintext'}`}>
            {data?.rich_text?.map(t => t.plain_text).join('')}
          </code>
        </pre>
      );

    case 'image': {
      const src = data?.external?.url ?? data?.file?.url;
      const caption = data?.caption?.map(t => t.plain_text).join('') ?? '';
      if (!src) return null;
      return (
        <figure className="notion-image">
          <Image
            src={src}
            alt={caption || ''}
            reveal
            delay={200}
          />
          {caption && <figcaption className="notion-image__caption">{caption}</figcaption>}
        </figure>
      );
    }

    case 'video': {
      const src = data?.external?.url ?? data?.file?.url;
      if (!src) return null;
      const ytMatch = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
      if (ytMatch) {
        return (
          <div className="notion-video notion-video--embed">
            <iframe
              src={`https://www.youtube.com/embed/${ytMatch[1]}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
              loading="lazy"
            />
          </div>
        );
      }
      return (
        <div className="notion-video">
          <video src={src} controls playsInline />
        </div>
      );
    }

    case 'embed': {
      const url = data?.url;
      if (!url) return null;
      return (
        <div className="notion-embed">
          <iframe src={url} title="Embedded content" loading="lazy" allowFullScreen />
        </div>
      );
    }

    case 'divider':
      return <hr className="notion-divider" />;

    case 'toggle': {
      return (
        <details className="notion-toggle">
          <summary className="notion-toggle__summary">
            <RichText items={data?.rich_text} />
          </summary>
          {block.children?.length > 0 && (
            <div className="notion-toggle__content">
              <NotionRenderer blocks={block.children} />
            </div>
          )}
        </details>
      );
    }

    case 'column_list':
      return (
        <div
          className="notion-columns"
          style={{ '--col-count': block.children?.length ?? 2 }}
        >
          {block.children?.map(col => (
            <div key={col.id} className="notion-column">
              {col.children?.length > 0 && <NotionRenderer blocks={col.children} />}
            </div>
          ))}
        </div>
      );

    case 'column':
      return null; // handled by column_list

    case 'table': {
      const rows = block.children ?? [];
      return (
        <div className="notion-table-wrapper">
          <table className="notion-table">
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.id} className={ri === 0 && data?.has_column_header ? 'notion-table__header-row' : ''}>
                  {(row.table_row?.cells ?? []).map((cell, ci) => {
                    const Tag = ri === 0 && data?.has_column_header ? 'th' : 'td';
                    return (
                      <Tag key={ci} className="notion-table__cell">
                        <RichText items={cell} />
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'bookmark':
    case 'link_preview': {
      const url = data?.url;
      if (!url) return null;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="notion-bookmark">
          <span className="notion-bookmark__url">{url}</span>
          <span className="notion-bookmark__arrow" aria-hidden>↗</span>
        </a>
      );
    }

    default:
      return null;
  }
}

// Check if a block is a text-type block (heading, paragraph, or text-heavy callout)
function isTextBlock(block) {
  if (!block) return false;
  return ['heading_2', 'heading_3', 'paragraph'].includes(block.type)
    || (block.type === 'callout' && !isMediaPlaceholderCallout(block) && !isComparisonCallout(block));
}

// Groups consecutive list items into proper <ul>/<ol> wrappers
// Also pairs text blocks followed by placeholder images into side-by-side layouts
function groupBlocks(blocks) {
  const groups = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (block.type === 'bulleted_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') items.push(blocks[i++]);
      groups.push({ type: 'bulleted_list', items, key: items[0].id });
    } else if (block.type === 'numbered_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') items.push(blocks[i++]);
      groups.push({ type: 'numbered_list', items, key: items[0].id });
    } else if (
      block.type === 'callout'
      && !isMediaPlaceholderCallout(block)
      && !isComparisonCallout(block)
      && i + 1 < blocks.length
      && blocks[i + 1].type === 'callout'
      && !isMediaPlaceholderCallout(blocks[i + 1])
      && !isComparisonCallout(blocks[i + 1])
    ) {
      // Group 2+ consecutive info callouts into a card grid
      const items = [];
      while (
        i < blocks.length
        && blocks[i].type === 'callout'
        && !isMediaPlaceholderCallout(blocks[i])
        && !isComparisonCallout(blocks[i])
      ) {
        items.push(blocks[i++]);
      }
      groups.push({ type: 'callout_grid', items, key: items[0].id });
    } else if (
      isTextBlock(block)
      && i + 1 < blocks.length
      && isMediaPlaceholderCallout(blocks[i + 1])
    ) {
      // Pair text + placeholder into side-by-side layout
      groups.push({
        type: 'side_by_side',
        textBlock: block,
        imageBlock: blocks[i + 1],
        key: block.id ?? `sbs-${i}`,
      });
      i += 2;
    } else {
      groups.push(block);
      i++;
    }
  }
  return groups;
}

export default function NotionRenderer({ blocks = [], animate = true }) {
  const grouped = groupBlocks(blocks);

  return (
    <div className="notion-renderer">
      {grouped.map((group, i) => {
        const delay = Math.min(i * 40, 200); // stagger plafonné à 200ms
        const previous = i > 0 ? grouped[i - 1] : null;
        const blockWidthClass = getBlockWidthClass(group, previous);
        const isWorkedOnSection = group.type === 'bulleted_list' && isWhatIWorkedOnHeading(previous);

        if (isWorkedOnSection) {
          const el = (
            <div key={group.key} className="notion-work-grid" aria-label="What I worked on">
              {group.items.map((b, idx) => (
                <article key={b.id} className="notion-work-card">
                  <span className="notion-work-card__index">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="notion-work-card__content">
                    <p className="notion-work-card__text">
                      <RichText items={b.bulleted_list_item?.rich_text} />
                    </p>
                    {b.children?.length > 0 && (
                      <ul className="notion-list notion-list--bulleted notion-work-card__sublist">
                        {b.children.map(child => <Block key={child.id} block={child} />)}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          );
          return animate
            ? <InViewBlock key={group.key} delay={delay} className={blockWidthClass}>{el}</InViewBlock>
            : <div className={`notion-block notion-block--entered ${blockWidthClass}`}>{el}</div>;
        }

        if (group.type === 'side_by_side') {
          const placeholderData = getMediaPlaceholderData(group.imageBlock);
          const el = (
            <div key={group.key} className="notion-side-by-side">
              <div className="notion-side-by-side__text">
                <Block block={group.textBlock} />
              </div>
              <div className="notion-side-by-side__image">
                <MediaPlaceholderBlock
                  title={placeholderData?.title}
                  description={placeholderData?.description}
                />
              </div>
            </div>
          );
          return animate
            ? <InViewBlock key={group.key} delay={delay} className="notion-block--full">{el}</InViewBlock>
            : <div className={`notion-block notion-block--entered notion-block--full`}>{el}</div>;
        }

        if (group.type === 'callout_grid') {
          const el = (
            <div key={group.key} className="notion-callout-grid">
              {group.items.map(callout => {
                const text = richTextToPlain(callout.callout?.rich_text ?? []);
                const icon = callout.callout?.icon?.emoji;
                // Detect if first word is a stat (number + optional symbol like % x ×)
                const statMatch = text.match(/^(\d[\d\s,.]*[%x×]?)/i);
                const statValue = statMatch?.[1]?.trim();
                const statDesc = statValue ? text.slice(statValue.length).replace(/^[\s–—-]+/, '') : text;
                return (
                  <div key={callout.id} className="notion-callout-grid__item">
                    {statValue
                      ? <>
                          <span className="notion-callout-grid__stat">{statValue}</span>
                          <p className="notion-callout-grid__desc">{statDesc}</p>
                        </>
                      : <>
                          {icon && <span className="notion-callout-grid__icon">{icon}</span>}
                          <p className="notion-callout-grid__desc">
                            <RichText items={callout.callout?.rich_text} />
                          </p>
                        </>
                    }
                  </div>
                );
              })}
            </div>
          );
          return animate
            ? <InViewBlock key={group.key} delay={delay} className="notion-block--full">{el}</InViewBlock>
            : <div className="notion-block notion-block--entered notion-block--full">{el}</div>;
        }

        if (group.type === 'bulleted_list') {
          const el = (
            <ul key={group.key} className="notion-list notion-list--bulleted">
              {group.items.map(b => <Block key={b.id} block={b} />)}
            </ul>
          );
          return animate
            ? <InViewBlock key={group.key} delay={delay} className={blockWidthClass}>{el}</InViewBlock>
            : <div className={`notion-block notion-block--entered ${blockWidthClass}`}>{el}</div>;
        }
        if (group.type === 'numbered_list') {
          const el = (
            <ol key={group.key} className="notion-list notion-list--numbered">
              {group.items.map(b => <Block key={b.id} block={b} />)}
            </ol>
          );
          return animate
            ? <InViewBlock key={group.key} delay={delay} className={blockWidthClass}>{el}</InViewBlock>
            : <div className={`notion-block notion-block--entered ${blockWidthClass}`}>{el}</div>;
        }

        const el = <Block key={group.id ?? i} block={group} />;
        return animate
          ? <InViewBlock key={group.id ?? i} delay={delay} className={blockWidthClass}>{el}</InViewBlock>
          : <div className={`notion-block notion-block--entered ${blockWidthClass}`}>{el}</div>;
      })}
    </div>
  );
}
