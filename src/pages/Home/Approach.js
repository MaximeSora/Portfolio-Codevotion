import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Approach.css';

const disciplines = [
  { name: 'Product Design', description: 'Full product cycle, research to dev handoff' },
  { name: 'UX Design', description: 'User flows, wireframing, prototyping' },
  { name: 'Visual Design', description: 'UI systems, motion, brand identity' },
  { name: 'Interaction Design', description: 'Micro-interactions, animations, immersive web' },
  { name: 'AI-Assisted Design', description: 'Rapid iteration with AI workflows' },
];

const collaborations = [
  {
    num: '01',
    title: 'Full Project',
    description:
      'End-to-end design from discovery to delivery. I own the process and deliver production-ready assets.',
  },
  {
    num: '02',
    title: 'Embedded Designer',
    description:
      'I join your team for a sprint or the long run, fitting into your workflow and culture.',
  },
  {
    num: '03',
    title: 'Consulting',
    description:
      'Design reviews, audits, and rapid prototyping sprints to unblock your team.',
  },
];

const Approach = ({ id }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -10% 0px' });

  return (
    <Section className="approach" as="section" id={id}>
      <div
        ref={ref}
        className={classNames('approach__content', {
          'approach__content--entered': inView,
        })}
      >
        <div className="approach__header">
          <span className="approach__eyebrow">My approach</span>
        </div>

        <div className="approach__columns">
          {/* Left — disciplines */}
          <div className="approach__col">
            <span className="approach__col-label">// Disciplines</span>
            <h2 className="approach__col-title">What I do</h2>
            <ul className="approach__list">
              {disciplines.map(({ name, description }) => (
                <li key={name} className="approach__list-item">
                  <span className="approach__list-name">{name}</span>
                  <span className="approach__list-desc">{description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — collaboration modes */}
          <div className="approach__col">
            <span className="approach__col-label">// How we work</span>
            <h2 className="approach__col-title">
              Multiple ways <em>to collaborate</em>
            </h2>
            <div className="approach__cards">
              {collaborations.map(({ num, title, description }) => (
                <div key={title} className="approach__card">
                  <span className="approach__card-num">{num}</span>
                  <div className="approach__card-body">
                    <h3 className="approach__card-title">{title}</h3>
                    <p className="approach__card-desc">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Approach;
