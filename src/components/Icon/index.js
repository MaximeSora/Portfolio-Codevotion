import classNames from 'classnames';
import ArrowRight from 'assets/icons/arrow-right.svg?react';
import ChevronRight from 'assets/icons/chevron-right.svg?react';
import Close from 'assets/icons/close.svg?react';
import Dribbble from 'assets/icons/dribbble.svg?react';
import Email from 'assets/icons/email.svg?react';
import Error from 'assets/icons/error.svg?react';
import Figma from 'assets/icons/figma.svg?react';
import Github from 'assets/icons/github.svg?react';
import Linkedin from 'assets/icons/linkedin.svg?react';
import Menu from 'assets/icons/menu.svg?react';
import Pause from 'assets/icons/pause.svg?react';
import Play from 'assets/icons/play.svg?react';
import Send from 'assets/icons/send.svg?react';
import Behance from 'assets/icons/behance.svg?react';
import Twitter from 'assets/icons/twitter.svg?react';
import './index.css';

export const icons = {
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
  close: Close,
  dribbble: Dribbble,
  email: Email,
  error: Error,
  figma: Figma,
  github: Github,
  linkedin: Linkedin,
  menu: Menu,
  pause: Pause,
  play: Play,
  send: Send,
  behance: Behance,
  twitter: Twitter,
};

const Icon = ({ icon, style, className, ...rest }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden className={classNames('icon', className)} {...rest} />
  );
};

export default Icon;
