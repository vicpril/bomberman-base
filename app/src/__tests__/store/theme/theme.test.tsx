import '@testing-library/jest-dom/extend-expect';

import { store } from 'store/store';
import { setThemeLocally } from 'store/user/userSlice';

describe('Theme checking', () => {
  it('default is dark theme', () => {
    const themeState = store.getState().user.theme;
    expect(themeState).toBe('dark');
  });

  it('switch theme to light', () => {
    store.dispatch(setThemeLocally('light'));
    const themeState = store.getState().user.theme;
    expect(themeState).toBe('light');
  });

  it('switch theme back to dark', () => {
    store.dispatch(setThemeLocally('dark'));
    const themeState = store.getState().user.theme;
    expect(themeState).toBe('dark');
  });
});
