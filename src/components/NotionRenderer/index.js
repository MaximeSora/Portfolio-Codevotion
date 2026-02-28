import Image from 'components/Image';
import './NotionRenderer.css';

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
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={spanStyle} className="notion-link">
          {node}
        </a>
      );
    }

    return spanStyle
      ? <span key={i} style={spanStyle}>{node}</span>
      : <span key={i}>{node}</span>;
  });
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
        <h2 className="notion-h1">
          <RichText items={data?.rich_text} />
        </h2>
      );

    case 'heading_2':
      return (
        <h3 className="notion-h2">
          <RichText items={data?.rich_text} />
        </h3>
      );

    case 'heading_3':
      return (
        <h4 className="notion-h3">
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

    case 'callout':
      return (
        <div className="notion-callout">
          {data?.icon?.emoji && (
            <span className="notion-callout__icon" aria-hidden>{data.icon.emoji}</span>
          )}
          <div className="notion-callout__text">
            <RichText items={data?.rich_text} />
            {block.children?.length > 0 && <NotionRenderer blocks={block.children} />}
          </div>
        </div>
      );

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

    case 'toggle':
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

// Groups consecutive list items into proper <ul>/<ol> wrappers
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
    } else {
      groups.push(block);
      i++;
    }
  }
  return groups;
}

export default function NotionRenderer({ blocks = [] }) {
  const grouped = groupBlocks(blocks);

  return (
    <div className="notion-renderer">
      {grouped.map((group, i) => {
        if (group.type === 'bulleted_list') {
          return (
            <ul key={group.key} className="notion-list notion-list--bulleted">
              {group.items.map(b => <Block key={b.id} block={b} />)}
            </ul>
          );
        }
        if (group.type === 'numbered_list') {
          return (
            <ol key={group.key} className="notion-list notion-list--numbered">
              {group.items.map(b => <Block key={b.id} block={b} />)}
            </ol>
          );
        }
        return <Block key={group.id ?? i} block={group} />;
      })}
    </div>
  );
}
