import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import './Skills.css';

const skills = [
  {
    category: 'Design',
    items: [
      'UX Research',
      'Visual Design',
      'Design System',
      'Information Architecture',
      'Wireframing',
      'Prototyping',
      'Data Analysis',
      'Motion Design',
      'Graphic Design',
    ],
  },
  {
    category: 'Tools',
    items: [
      'Figma',
      'Adobe CC',
      'Rive',
      'Protopie',
      'Miro',
      'Webflow',
      'Notion',
      'Sketch',
      'VS Code',
      'Github',
      'Cursor',
      'Claude Code',
    ],
  },
  {
    category: 'Tech',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Three.js', 'Vite', 'Node', 'PHP', 'MySQL'],
  },
  {
    category: 'Other',
    items: [
      'Project Management',
      'Agile/SAFe',
      'Webmarketing',
      'English (Fluent)',
      'French (Native)',
    ],
  },
];

const Skills = ({ id }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -15% 0px' });

  return (
    <Section className="skills" as="section" id={id}>
      <div
        ref={ref}
        className={classNames('skills__content', {
          'skills__content--entered': inView,
        })}
      >
        <span className="skills__label">Skills</span>
        <div className="skills__grid">
          {skills.map(({ category, items }) => (
            <div key={category} className="skills__group">
              <h3 className="skills__category">{category}</h3>
              <div className="skills__tags">
                {items.map(item => (
                  <span key={item} className="skills__tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;
