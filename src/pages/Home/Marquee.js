import './Marquee.css';

const items = [
  'Product Design',
  'UX Research',
  'Motion Design',
  'Interaction Dev',
  'AI',
  'Vibe Coding',
  '3D',
  'Product Strategy',
  'Creative Direction',
  'Prototyping',
  'Design Systems',
];

const MarqueeTrack = () => (
  <div className="marquee__track" aria-hidden>
    {items.map((item, i) => (
      <span key={i} className="marquee__item">
        {item}
        <span className="marquee__sep">·</span>
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="marquee" aria-label="Services">
    <div className="marquee__inner">
      {/* Duplicated for seamless loop */}
      <MarqueeTrack />
      <MarqueeTrack />
    </div>
  </div>
);

export default Marquee;
