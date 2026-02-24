import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { Button } from 'components/Button';
import { useInViewport } from 'hooks';
import './Contact.css';

const infoCards = [
  { label: 'Location', value: 'Lyon, France' },
  { label: 'Remote', value: 'Worldwide' },
  {
    label: 'Networks',
    value: 'LinkedIn',
    href: 'https://www.linkedin.com/in/maxime-pocq/',
  },
  { label: 'Resume', value: 'Download PDF', href: '/resume.pdf' },
];

const Contact = ({ id }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -5% 0px' });

  return (
    <Section className="contact" as="section" id={id}>
      <div
        ref={ref}
        className={classNames('contact__content', {
          'contact__content--entered': inView,
        })}
      >
        <div className="contact__left">
          <span className="contact__label">// Contact</span>
          <h2 className="contact__heading">
            Let's build your<br />
            <span className="contact__heading-accent">next project</span>
          </h2>
          <p className="contact__sub">
            Available for new projects and collaborations in product design, UX, visual, and interaction.
          </p>
          <div className="contact__actions">
            <Button iconHoverShift href="mailto:hello@maximepocq.com" icon="send">
              Send me an email
            </Button>
            <a className="contact__email" href="mailto:hello@maximepocq.com">
              hello@maximepocq.com
            </a>
          </div>
        </div>

        <div className="contact__right">
          <div className="contact__cards">
            {infoCards.map(({ label, value, href }) => (
              <div key={label} className="contact__card">
                <span className="contact__card-label">{label}</span>
                {href ? (
                  <a
                    className="contact__card-value contact__card-link"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="contact__card-value">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
