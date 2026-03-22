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
  { name: 'Product Design', description: 'End-to-end design from discovery to launch' },
  { name: 'UX Design', description: 'Journey mapping, flows, wireframes, and prototyping' },
  { name: 'Visual Design', description: 'Interface craft, visual systems, and motion language' },
  { name: 'Interaction Design', description: 'Interaction patterns, micro-interactions, and prototyping' },
  { name: 'AI-Enhanced Workflows', description: 'Faster iteration and stronger decisions with AI tooling' },
];

const collaborations = [
  {
    num: '01',
    title: 'End-to-End Project',
    description:
      'From discovery to delivery, I lead the full design track and provide implementation-ready outputs.',
  },
  {
    num: '02',
    title: 'Embedded Senior Designer',
    description:
      'I integrate with your product squad for focused sprints or long-term ownership.',
  },
  {
    num: '03',
    title: 'Consulting',
    description:
      'Targeted audits, design reviews, and rapid prototyping to unblock product decisions.',
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
              How I create impact
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
            <h2 className="approach__col-title">Core capabilities</h2>
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
            <span className="approach__col-label">// Collaboration models</span>
            <h2 className="approach__col-title">
              Flexible ways <em>to collaborate</em>
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
          <span className="approach__col-label">// Tool stack</span>
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
