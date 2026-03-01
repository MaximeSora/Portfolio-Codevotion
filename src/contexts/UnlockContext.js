import { createContext, useContext, useState } from 'react';

const UnlockContext = createContext({ isUnlocked: false, unlock: () => false });

const SESSION_KEY = 'portfolio_unlocked';
const PASSWORD = import.meta.env.VITE_UNLOCK_PASSWORD;

export function UnlockProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  );

  const unlock = password => {
    if (password === PASSWORD) {
      setIsUnlocked(true);
      sessionStorage.setItem(SESSION_KEY, '1');
      return true;
    }
    return false;
  };

  return (
    <UnlockContext.Provider value={{ isUnlocked, unlock }}>
      {children}
    </UnlockContext.Provider>
  );
}

export const useUnlock = () => useContext(UnlockContext);
