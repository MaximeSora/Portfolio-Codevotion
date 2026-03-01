import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import Divider from 'components/Divider';
import { Button } from 'components/Button';
import Link from 'components/Link';
import { useInViewport } from 'hooks';
import './Contact.css';

const infoCards = [
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
        <span aria-hidden className="contact__katakana">コンタクト</span>
        <div className="contact__left">
          <div className="contact__tag" aria-hidden>
            <Divider
              notchWidth="64px"
              notchHeight="8px"
              collapsed={!inView}
              collapseDelay={400}
            />
            <div className={classNames('contact__tag-text', { 'contact__tag-text--entered': inView })}>
              Contact
            </div>
          </div>
          <h2 className="contact__heading">
            Let's build your<br />
            <span className="contact__heading-accent">next project</span>
          </h2>
          <p className="contact__sub">
            Got a product to shape, a Design System to scale, or a team to embed into? I bring senior craft, AI-powered processes, and a bias for real results.
          </p>
          <div className="contact__actions">
            <Button iconHoverShift href="mailto:maxime.pocq@gmail.com" icon="send">
              Send me an email
            </Button>
            <div className="contact__links">
              <Link secondary className="contact__link" href="https://www.linkedin.com/in/maxime-pocq/">
                LinkedIn
              </Link>
              <Link secondary className="contact__link" href="/resume.pdf">
                See my Resume
              </Link>
            </div>
          </div>
        </div>

        <div className="contact__right" aria-hidden style={{ display: 'none' }}>
          {/* infoCards kept for potential future use */}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
