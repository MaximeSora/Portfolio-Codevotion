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
import Notion from 'assets/icons/notion.svg?react';
import Miro from 'assets/icons/miro.svg?react';
import Cursor from 'assets/icons/cursor.svg?react';
import Claude from 'assets/icons/claude.svg?react';
import Gemini from 'assets/icons/gemini.svg?react';
import N8n from 'assets/icons/n8n.svg?react';
import Adobecc from 'assets/icons/adobecc.svg?react';
import Gamepad from 'assets/icons/gamepad.svg?react';
import Book from 'assets/icons/book.svg?react';
import Plane from 'assets/icons/plane.svg?react';
import Sport from 'assets/icons/sport.svg?react';
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
  notion: Notion,
  miro: Miro,
  cursor: Cursor,
  claude: Claude,
  gemini: Gemini,
  n8n: N8n,
  adobecc: Adobecc,
  gamepad: Gamepad,
  book: Book,
  plane: Plane,
  sport: Sport,
};

const Icon = ({ icon, style, className, ...rest }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden className={classNames('icon', className)} {...rest} />
  );
};

export default Icon;
