import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import WordScramble from '../component/WordScramble/WordScramble';

describe('WordScramble component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <WordScramble />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('scrambles a text', () => {
  	const wrapper = shallow(<WordScramble />);
  	// console.log("the state", wrapper.state());

  });

});
