export const getPrivateMode = () => {
  if (import.meta.env.DEV) {
    const override = localStorage.getItem('dev_private_override');
    if (override !== null) return override === 'true';
  }
  return import.meta.env.VITE_PRIVATE_MODE === 'true';
};
