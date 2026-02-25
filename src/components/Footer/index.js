import Link from 'components/Link';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__divider" aria-hidden />
    <div className="footer__row">
      <span className="footer__date">{`© ${new Date().getFullYear()} `}</span>
      <Link secondary className="footer__link" href="/humans.txt" target="_self">
        Maxime Pocq
      </Link>
    </div>
  </footer>
);

export default Footer;
