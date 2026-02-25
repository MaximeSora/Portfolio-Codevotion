import './index.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__divider" aria-hidden />
    <div className="footer__inner">
      <div className="footer__left">
        <p className="footer__copyright">{`© ${new Date().getFullYear()} Maxime Pocq`}</p>
        <p className="footer__subtitle">Product Designer</p>
      </div>
      <p className="footer__made">
        Made with <span className="footer__heart" aria-hidden>❤️</span> & AI
      </p>
    </div>
  </footer>
);

export default Footer;
