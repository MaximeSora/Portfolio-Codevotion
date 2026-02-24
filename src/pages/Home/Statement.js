import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Statement.css';

const words = 'I craft engaging, user-centric experiences that seamlessly blend aesthetics and functionality — designed to delight users and drive tangible business results.'.split(' ');

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
          {words.map((word, i) => (
            <span
              key={i}
              className="statement__word"
              style={{ '--word-index': i }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </Section>
  );
};

export default Statement;
