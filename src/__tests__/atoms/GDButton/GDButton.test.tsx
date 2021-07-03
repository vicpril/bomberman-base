import React from 'react';
import classNames from 'classnames';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import '@testing-library/jest-dom/extend-expect';

const mockFunction = () => 'returns stuff';

describe('GDButton', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(
        <GDButton title="title" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with all props passed', () => {
    const tree = renderer
      .create(
        <GDButton
          title="title"
          onClick={mockFunction}
          styleOption="secondary"
          size="l"
          type="submit"
          className={classNames('extra-class-name')}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with the right title', () => {
    const { getByText } = render(<GDButton title="title being checked" />);
    expect(getByText('title being checked')).toBeInTheDocument();
  });
});
