import { getPrivateMode } from 'utils/privateMode';
import './DevModeSwitcher.css';

const DevModeSwitcher = () => {
  if (!import.meta.env.DEV) return null;

  const isPrivate = getPrivateMode();

  const switchTo = value => {
    localStorage.setItem('dev_private_override', String(value));
    window.location.reload();
  };

  return (
    <div className="dev-switcher" role="toolbar" aria-label="Dev mode switcher">
      <span className="dev-switcher__label">DEV</span>
      <button
        className={`dev-switcher__btn ${!isPrivate ? 'dev-switcher__btn--active' : ''}`}
        onClick={() => switchTo(false)}
      >
        Public
      </button>
      <button
        className={`dev-switcher__btn ${isPrivate ? 'dev-switcher__btn--active' : ''}`}
        onClick={() => switchTo(true)}
      >
        Private
      </button>
    </div>
  );
};

export default DevModeSwitcher;
