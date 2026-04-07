import { useRef, useState, memo } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Monogram from 'components/Monogram';
import Icon from 'components/Icon';
import NavToggle from './NavToggle';
import ThemeToggle from './ThemeToggle';
import { useWindowSize, useAppContext } from 'hooks';
import { navLinks, socialLinks } from './navData';
import { reflow } from 'utils/transition';
import { media, msToNum, numToMs } from 'utils/style';
import { tokens } from 'components/ThemeProvider/theme';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

const NavbarIcons = () => (
  <div className="navbar__nav-icons">
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        className="navbar__nav-icon-link"
        aria-label={label}
        href={url}
        onMouseUp={blurOnMouseUp}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="navbar__nav-icon" icon={icon} />
      </a>
    ))}
  </div>
);

function Navbar(props) {
  const { menuOpen, dispatch } = useAppContext();
  const { location } = props;
  const [hashKey, setHashKey] = useState();
  const windowSize = useWindowSize();
  const navbarRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  const handleNavClick = () => {
    setHashKey(Math.random().toString(32).substr(2, 8));
  };

  const handleMobileNavClick = () => {
    handleNavClick();
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const isMatch = ({ match, hash = '' }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <header className="navbar" ref={navbarRef}>
      <RouterLink
        className="navbar__logo"
        to={{ pathname: '/', hash: '#intro', state: hashKey }}
        aria-label="Maxime Pocq, Designer"
        onClick={handleMobileNavClick}
        onMouseUp={blurOnMouseUp}
      >
        <Monogram highlight />
      </RouterLink>
      <NavbarIcons />
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <nav className="navbar__nav">
        <div className="navbar__nav-list">
          {navLinks.filter(l => !l.cta).map(({ label, pathname, hash, href, newTab, external }) => (
            href ? (
              <a
                key={label}
                className="navbar__nav-link"
                href={href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                onMouseUp={blurOnMouseUp}
              >
                {label}
                {external && (
                  <svg className="navbar__nav-link-external" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            ) : (
              <NavLink
                exact
                className="navbar__nav-link"
                activeClassName="navbar__nav-link--active"
                isActive={match => isMatch({ match, hash })}
                onClick={handleNavClick}
                key={label}
                to={{ pathname, hash, state: hashKey }}
                onMouseUp={blurOnMouseUp}
              >
                {label}
              </NavLink>
            )
          ))}
        </div>
        <div className="navbar__cta-group">
          {navLinks.filter(l => l.cta).map(({ label, href, newTab, cta, external }) => (
            <a
              key={label}
              className={`navbar__nav-cta navbar__nav-cta--${cta}`}
              href={href}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noopener noreferrer' : undefined}
              onMouseUp={blurOnMouseUp}
            >
              <span className="navbar__cta-bg" aria-hidden />
              <span className="navbar__cta-text">
                {label}
                {external && (
                  <svg className="navbar__cta-external" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </a>
          ))}
        </div>
      </nav>
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: msToNum(tokens.base.durationL) }}
        onEnter={reflow}
      >
        {status => (
          <nav className={`navbar__mobile-nav navbar__mobile-nav--${status}`}>
            {navLinks.filter(l => !l.cta).map(({ label, pathname, hash, href, newTab, external }) => (
              href ? (
                <a
                  key={label}
                  className={`navbar__mobile-nav-link navbar__mobile-nav-link--${status}`}
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  onClick={handleMobileNavClick}
                  onMouseUp={blurOnMouseUp}
                >
                  {label}
                  {external && (
                    <svg className="navbar__nav-link-external" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              ) : (
                <NavLink
                  className={`navbar__mobile-nav-link navbar__mobile-nav-link--${status}`}
                  activeClassName="navbar__mobile-nav-link--active"
                  key={label}
                  onClick={handleMobileNavClick}
                  to={{ pathname, hash, state: hashKey }}
                  onMouseUp={blurOnMouseUp}
                >
                  {label}
                </NavLink>
              )
            ))}
            <div className="navbar__mobile-cta-group">
              {navLinks.filter(l => l.cta).map(({ label, href, newTab, cta, external }) => (
                <a
                  key={label}
                  className={`navbar__mobile-nav-cta navbar__mobile-nav-cta--${cta} navbar__mobile-nav-link--${status}`}
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  onClick={handleMobileNavClick}
                  onMouseUp={blurOnMouseUp}
                >
                  <span className="navbar__cta-bg" aria-hidden />
                  <span className="navbar__cta-text">
                    {label}
                    {external && (
                      <svg className="navbar__cta-external" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </a>
              ))}
            </div>
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle />}
    </header>
  );
}

export default memo(Navbar);
