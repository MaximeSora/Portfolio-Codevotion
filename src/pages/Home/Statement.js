import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Statement.css';

const segments = [
  { text: 'With', highlight: false },
  { text: '6', highlight: false },
  { text: 'years', highlight: false },
  { text: 'of', highlight: false },
  { text: 'experience,', highlight: false },
  { text: 'I', highlight: false },
  { text: 'design', highlight: false },
  { text: 'high-impact', highlight: true },
  { text: 'digital', highlight: false },
  { text: 'products', highlight: true },
  { text: 'that', highlight: false },
  { text: 'people', highlight: true },
  { text: 'love', highlight: true },
  { text: 'and', highlight: false },
  { text: 'businesses', highlight: true },
  { text: 'measure.', highlight: true, suffix: ' ' },
  { text: 'Bridging', highlight: false },
  { text: 'user', highlight: true },
  { text: 'insight,', highlight: true },
  { text: 'visual', highlight: true },
  { text: 'craft,', highlight: true },
  { text: 'engineering,', highlight: true },
  { text: 'and', highlight: false },
  { text: 'AI', highlight: true },
  { text: 'to', highlight: false },
  { text: 'ship', highlight: false },
  { text: 'scalable', highlight: false },
  { text: 'experiences', highlight: false },
  { text: 'that', highlight: false },
  { text: 'drive', highlight: true },
  { text: 'real', highlight: true },
  { text: 'results.', highlight: true },
];

const Statement = ({ id, sectionRef }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -20% 0px' });

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
