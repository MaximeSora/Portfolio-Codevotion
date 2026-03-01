import './index.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__divider" aria-hidden />
    <div className="footer__row">
      <span className="footer__date">{`© ${new Date().getFullYear()} Maxime Pocq`}</span>
    </div>
  </footer>
);

export default Footer;
