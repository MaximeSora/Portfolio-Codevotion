import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Statement.css';

const segments = [
  { text: 'I', highlight: false },
  { text: 'design', highlight: false },
  { text: 'products', highlight: true },
  { text: 'people', highlight: true },
  { text: 'love', highlight: true },
  { text: '—', highlight: false },
  { text: 'built', highlight: false },
  { text: 'to', highlight: false },
  { text: 'scale', highlight: true },
  { text: 'and', highlight: false },
  { text: 'perform.', highlight: true },
];

const Statement = ({ id, sectionRef }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px 15% 0px' });

  return (
    <Section className="statement" as="section" id={id} ref={sectionRef}>
      <div className="statement__inner">
        <p
          ref={ref}
          className={classNames('statement__lead', {
            'statement__lead--entered': inView,
          })}
        >
          {segments.map((seg, i) => (
            <span
              key={i}
              className={classNames('statement__word', {
                'statement__word--highlight': seg.highlight,
              })}
              style={{ '--word-index': i }}
            >
              {seg.text}{seg.suffix && <span className="statement__suffix">{seg.suffix}</span>}
            </span>
          ))}
        </p>
      </div>
    </Section>
  );
};

export default Statement;
