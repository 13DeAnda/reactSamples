import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import {Landing} from './Landing'


describe('Calculator component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <Landing/>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});