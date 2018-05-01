import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import RomanNumerals from '../component/RomanNumerals/RomanNumerals';

describe('RomanNumerals component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <RomanNumerals />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
