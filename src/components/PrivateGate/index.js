import { useState } from 'react';
import classNames from 'classnames';
import { useUnlock } from 'contexts/UnlockContext';
import { getPrivateMode } from 'utils/privateMode';
import Icon from 'components/Icon';
import './PrivateGate.css';

function GateForm() {
  const { unlock } = useUnlock();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const success = unlock(value);
    if (!success) {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className={classNames('private-gate', { 'private-gate--shake': shaking })}>
      <div className="private-gate__header">
        <span className="private-gate__name">Maxime Pocq</span>
        <span className="private-gate__role">Product Designer</span>
      </div>

      <div className="private-gate__divider" aria-hidden />

      <div className="private-gate__body">
        <p className="private-gate__desc">Private portfolio — access restricted.</p>
        <form className="private-gate__form" onSubmit={handleSubmit}>
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            placeholder="Access code"
            className={classNames('private-gate__input', {
              'private-gate__input--error': error,
            })}
            autoComplete="off"
            autoFocus
          />
          <button type="submit" className="private-gate__submit">
            Enter
            <Icon icon="arrowRight" />
          </button>
        </form>
        {error && <p className="private-gate__error">Incorrect code.</p>}
      </div>

      <span className="private-gate__katakana" aria-hidden>プライベート</span>
    </div>
  );
}

export default function PrivateGuard({ children }) {
  const { isUnlocked } = useUnlock();

  if (getPrivateMode() && !isUnlocked) {
    return <GateForm />;
  }

  return children;
}
