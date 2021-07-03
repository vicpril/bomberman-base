import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18nForTests';
import { BackButton } from 'components/molecules/BackButton/BackButton';

describe('BackButton', () => {
  it('check i18n setup', () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <BackButton />
        </I18nextProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
