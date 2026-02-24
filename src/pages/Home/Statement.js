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
  { text: 'craft', highlight: false },
  { text: 'engaging', highlight: true, suffix: ',' },
  { text: 'user', highlight: true },
  { text: 'focused', highlight: true },
  { text: 'experiences', highlight: true },
  { text: 'that', highlight: false },
  { text: 'seamlessly', highlight: false },
  { text: 'blend', highlight: false },
  { text: 'aesthetics', highlight: false },
  { text: 'and', highlight: false },
  { text: 'functionality,', highlight: false },
  { text: 'designed', highlight: false },
  { text: 'to', highlight: false },
  { text: 'delight', highlight: true },
  { text: 'users', highlight: true },
  { text: 'and', highlight: false },
  { text: 'drive', highlight: false },
  { text: 'tangible', highlight: true },
  { text: 'business', highlight: true },
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
