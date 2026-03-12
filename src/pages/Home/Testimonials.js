import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import Divider from 'components/Divider';
import { useInViewport } from 'hooks';
import pierreAvatar from 'assets/pierre.jpeg';
import florianAvatar from 'assets/florian.jpeg';
import './Testimonials.css';

const testimonials = [
  {
    quote:
      "Maxime is exceptionally methodical. He brings real structure to projects through Design Systems, leverages AI to elevate deliverable quality, and constantly raises the technical bar. An invaluable colleague.",
    name: 'Pierre Delahaye',
    role: 'UX & Product Designer',
    company: '',
    avatar: pierreAvatar,
  },
  {
    quote:
      "He doesn't just design interfaces. He drives product decisions and owns the end-to-end process from UX strategy to pixel-perfect UI. His design systems mindset makes the whole team sharper.",
    name: 'Florian Gouloubi',
    role: 'Senior Product Designer',
    company: 'Design Systems & Product Architecture',
    avatar: florianAvatar,
  },
];

const Testimonials = ({ id }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px 0% 0px' });

  return (
    <Section className="testimonials" as="section" id={id}>
      <div
        ref={ref}
        className={classNames('testimonials__content', {
          'testimonials__content--entered': inView,
        })}
      >
        <div className="testimonials__header">
          <div className="testimonials__tag" aria-hidden>
            <Divider
              notchWidth="64px"
              notchHeight="8px"
              collapsed={!inView}
              collapseDelay={400}
            />
            <div
              className={classNames('testimonials__tag-text', {
                'testimonials__tag-text--entered': inView,
              })}
            >
              Testimonials
            </div>
          </div>
        </div>

        <div className="testimonials__intro">
          <h2 className="testimonials__title">
            What people <em>say</em>
          </h2>
        </div>

        <ul className="testimonials__grid" aria-label="Testimonials">
          {testimonials.map(({ quote, name, role, company, avatar }, i) => (
            <li
              key={name}
              className={classNames('testimonials__card', {
                'testimonials__card--entered': inView,
              })}
              style={{ '--card-delay': `${200 + i * 120}ms` }}
            >
              <svg
                className="testimonials__quote-icon"
                viewBox="0 0 44 32"
                fill="none"
                aria-hidden
              >
                <path
                  d="M0 32V19.556C0 8.741 6.222 2.37 18.667 0L20 3.556C14.37 5.037 11.111 8.148 10.222 12.889H17.778V32H0ZM22.222 32V19.556C22.222 8.741 28.444 2.37 40.889 0L42.222 3.556C36.593 5.037 33.333 8.148 32.444 12.889H40V32H22.222Z"
                  fill="currentColor"
                />
              </svg>

              <blockquote className="testimonials__quote">{quote}</blockquote>

              <footer className="testimonials__author">
                <img className="testimonials__avatar" src={avatar} alt={name} />
                <div className="testimonials__author-info">
                  <span className="testimonials__author-name">{name}</span>
                  <span className="testimonials__author-role">
                    {role}
                    {company && <> · {company}</>}
                  </span>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Testimonials;
