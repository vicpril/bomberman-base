import '@testing-library/jest-dom/extend-expect';

import { store } from 'store/store';
import { toggleTheme } from 'store/user/userSlice';

describe('Theme checking', () => {
  it('default is dark theme', () => {
    const themeState = store.getState().user.theme;
    expect(themeState).toBe('dark');
  });

  it('switch theme to light', () => {
    store.dispatch(toggleTheme());
    const themeState = store.getState().user.theme;
    expect(themeState).toBe('light');
  });

  it('switch theme back to dark', () => {
    store.dispatch(toggleTheme());
    const themeState = store.getState().user.theme;
    expect(themeState).toBe('dark');
  });
});
