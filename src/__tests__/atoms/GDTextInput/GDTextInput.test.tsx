import React from 'react';
import classNames from 'classnames';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { GDTextInput } from 'components/atoms/GDTextInput/GDTextInput';
import '@testing-library/jest-dom/extend-expect';

const mockFunction = () => 'returns stuff';

describe('GDTextInput', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(
        <GDTextInput id="name" title="name" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with all props passed', () => {
    const tree = renderer
      .create(
        <GDTextInput
          id="name"
          title="name"
          name="name"
          type="text"
          className={classNames('class-name')}
          placeholder="placeholder value"
          value="value"
          onChange={mockFunction}
          onBlur={mockFunction}
          isInvalid={false}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with the right title', () => {
    const { getByText } = render(<GDTextInput id="id" title="title" />);
    expect(getByText('title:')).toBeInTheDocument();
  });
});
