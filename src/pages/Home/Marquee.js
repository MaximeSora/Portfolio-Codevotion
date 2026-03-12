import { useRef } from 'react';
import classNames from 'classnames';
import { useInViewport } from 'hooks';
import mfs from 'assets/mfs.png';
import ercom from 'assets/ercom_logo.png';
import thales from 'assets/thales-logo-white.png';
import renaultDigital from 'assets/renault-digital.png';
import './Marquee.css';

const logos = [
  { src: renaultDigital, alt: 'Renault Digital', width: 160 },
  { src: thales,         alt: 'Thales',          width: 100 },
  { src: mfs,            alt: 'Mobilize Financial Services', width: 130, height: 48 },
  { src: ercom,          alt: 'Ercom',            width: 100 },
];

const MarqueeTrack = () => (
  <div className="marquee__track" aria-hidden>
    {logos.map((logo, i) => (
      <span key={i} className="marquee__item">
        <img
          src={logo.src}
          alt={logo.alt}
          className="marquee__logo"
          style={{ width: logo.width, ...(logo.height && { height: logo.height }) }}
        />
      </span>
    ))}
  </div>
);

const Marquee = () => {
  const ref = useRef();
  const inView = useInViewport(ref, true, { rootMargin: '0px 0px 15% 0px' });

  return (
    <div ref={ref} className={classNames('marquee', { 'marquee--entered': inView })} aria-label="Services">
      <div className="marquee__inner">
        {/* Duplicated for seamless loop */}
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  );
};

export default Marquee;
