import { useRef } from 'react';
import classNames from 'classnames';
import Section from 'components/Section';
import { useInViewport } from 'hooks';
import Link from 'components/Link';
import portraitPhoto from 'assets/portrait-photo.png';
import './ContactV2.css';

const ContactV2 = ({ id }) => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px -10% 0px' });

  return (
    <Section className="contact2" as="section" id={id}>
      <div
        ref={ref}
        className={classNames('contact2__inner', {
          'contact2__inner--entered': inView,
        })}
      >
        {/* ── Top row ── */}
        <div className="contact2__top">
          <p className="contact2__line1">
            <a href="mailto:maxime.pocq@gmail.com" className="contact2__line1-link">Talk to me</a>
          </p>

          {/* Spinning badge */}
          <div className="contact2__badge" aria-hidden>
            <svg className="contact2__badge-ring" viewBox="0 0 200 200">
              <defs>
                <path
                  id="contact2-circle-path"
                  d="M 100,100 m -83,0 a 83,83 0 1,1 166,0 a 83,83 0 1,1 -166,0"
                />
              </defs>
              <text fontSize="24" fontWeight="600" letterSpacing="2" fill="currentColor">
                <textPath href="#contact2-circle-path">
                  Contact me · Contact me · Contact me ·
                </textPath>
              </text>
            </svg>
            <div className="contact2__badge-photo-clip">
              <img
                src={portraitPhoto}
                alt=""
                className="contact2__badge-photo"
              />
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="contact2__divider" />

        {/* ── Line 2 ── */}
        <p className="contact2__line2">
          {'& '}
          <a
            href="https://www.linkedin.com/in/maxime-pocq/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact2__accent contact2__accent-link"
          >connect.</a>
        </p>

        {/* ── Bottom strip ── */}
        <div className="contact2__bottom">
          <div className="contact2__bottom-left">
            <Link secondary href="mailto:maxime.pocq@gmail.com">
              maxime.pocq@gmail.com
            </Link>
            <Link
              secondary
              href="https://www.linkedin.com/in/maxime-pocq/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link
              secondary
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </Link>
          </div>
          <span className="contact2__katakana">
            © 2026 Maxime Pocq
          </span>
        </div>
      </div>
    </Section>
  );
};

export default ContactV2;
