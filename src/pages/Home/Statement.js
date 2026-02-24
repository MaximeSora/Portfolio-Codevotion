import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Statement.css';

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
          I design products that move people — and business metrics. Fluent in
          UX strategy, comfortable with product building and dev constraints,
          I use AI throughout the process to prototype faster, validate smarter,
          and deliver experiences that earn their place in the roadmap.
        </p>
      </div>
    </Section>
  );
};

export default Statement;
