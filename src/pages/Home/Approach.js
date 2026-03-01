import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import { useInViewport } from 'hooks';
import './Approach.css';

const stackTools = [
  { name: 'Figma', icon: 'figma' },
  { name: 'Notion', icon: 'notion' },
  { name: 'Cursor', icon: 'cursor' },
  { name: 'Claude', icon: 'claude' },
  { name: 'Miro', icon: 'miro' },
  { name: 'Github', icon: 'github' },
  { name: 'Gemini', icon: 'gemini' },
  { name: 'N8N', icon: 'n8n' },
  { name: 'Adobe CC', icon: 'adobecc' },
];

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
  const stackRef = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -10% 0px' });
  const stackInView = useInViewport(stackRef, true, { rootMargin: '0px 0px -25% 0px' });

  return (
    <Section className="approach" as="section" id={id}>
      <div
        ref={ref}
        className={classNames('approach__content', {
          'approach__content--entered': inView,
        })}
      >
        <span aria-hidden className="approach__katakana">アプローチ</span>
        <div className="approach__header">
          <div className="approach__tag" aria-hidden>
            <Divider
              notchWidth="64px"
              notchHeight="8px"
              collapsed={!inView}
              collapseDelay={400}
            />
            <div className={classNames('approach__tag-text', { 'approach__tag-text--entered': inView })}>
              My approach
            </div>
          </div>
        </div>

        <div className="approach__columns">
          {/* Left — disciplines */}
          <div
            className={classNames('approach__col', { 'approach__col--entered': inView })}
            style={{ '--col-delay': '200ms' }}
          >
            <span className="approach__col-label">// Disciplines</span>
            <h2 className="approach__col-title">What I do</h2>
            <ul className="approach__list">
              {disciplines.map(({ name, description }, i) => (
                <li
                  key={name}
                  className={classNames('approach__list-item', { 'approach__list-item--entered': inView })}
                  style={{ '--item-delay': `${300 + i * 80}ms` }}
                >
                  <span className="approach__list-name">{name}</span>
                  <span className="approach__list-desc">{description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — collaboration modes */}
          <div
            className={classNames('approach__col', { 'approach__col--entered': inView })}
            style={{ '--col-delay': '400ms' }}
          >
            <span className="approach__col-label">// How I work</span>
            <h2 className="approach__col-title">
              Multiple ways <em>to collaborate</em>
            </h2>
            <div className="approach__cards">
              {collaborations.map(({ num, title, description }, i) => (
                <div
                  key={title}
                  className={classNames('approach__card', { 'approach__card--entered': inView })}
                  style={{ '--item-delay': `${500 + i * 100}ms` }}
                >
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

        {/* My Stack */}
        <div ref={stackRef} className={classNames('approach__stack', { 'approach__stack--entered': stackInView })}>
          <span className="approach__col-label">// My Stack</span>
          <div className="approach__stack-pills">
            {stackTools.map(({ name, icon }, i) => (
              <span
                key={name}
                className={classNames('approach__stack-pill', { 'approach__stack-pill--entered': stackInView })}
                style={{ '--pill-delay': `${i * 60}ms` }}
              >
                {icon && (
                  <span className="approach__stack-pill-icon" aria-hidden>
                    <Icon icon={icon} />
                  </span>
                )}
                <span className="approach__stack-pill-name">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Approach;
