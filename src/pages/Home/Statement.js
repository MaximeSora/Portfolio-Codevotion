import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Statement.css';

const segments = [
  { text: 'Senior', highlight: true },
  { text: 'Product', highlight: true },
  { text: 'Designer', highlight: true },
  { text: 'with', highlight: false },
  { text: '6+', highlight: false },
  { text: 'years', highlight: false },
  { text: 'building', highlight: false },
  { text: 'user-centered', highlight: true },
  { text: 'digital', highlight: false },
  { text: 'products', highlight: true },
  { text: 'across', highlight: false },
  { text: 'strategy,', highlight: true },
  { text: 'UX,', highlight: true },
  { text: 'and', highlight: false },
  { text: 'high-fidelity', highlight: true },
  { text: 'UI.', highlight: true, suffix: ' ' },
  { text: 'I', highlight: false },
  { text: 'bridge', highlight: false },
  { text: 'research', highlight: true },
  { text: 'insight,', highlight: true },
  { text: 'system', highlight: true },
  { text: 'thinking,', highlight: true },
  { text: 'and', highlight: false },
  { text: 'AI-enabled', highlight: true },
  { text: 'execution', highlight: true },
  { text: 'to', highlight: false },
  { text: 'ship', highlight: false },
  { text: 'measurable', highlight: true },
  { text: 'outcomes.', highlight: true },
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
