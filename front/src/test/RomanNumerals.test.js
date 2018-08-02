import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import RomanNumerals from '../component/RomanNumerals/RomanNumerals';

const wrapper = shallow(<RomanNumerals />);
describe('RomanNumerals component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <RomanNumerals />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('adds a roman numeral and converts it to number', function(){
    var textToAdd = 'V';
    wrapper.find('.textInput').simulate('change', {target: {value: textToAdd}});
    expect(wrapper.state().textToConvert).toEqual(textToAdd);
    wrapper.find('.convertButton').simulate('click');
    expect(wrapper.state().converted).toEqual(5);
  });

  it('adds a number and converts it to number', function(){
    var textToAdd = '5';
    wrapper.find('.textInput').simulate('change', {target: {value: textToAdd}});
    expect(wrapper.state().textToConvert).toEqual(textToAdd);
    wrapper.find('.convertButton').simulate('click');
    expect(wrapper.state().converted).toEqual("V");
  });

   it('adds a roman numeral on lowercase and still transforms', function(){
    var textToAdd = 'v';
    wrapper.find('.textInput').simulate('change', {target: {value: textToAdd}});
    expect(wrapper.state().textToConvert).toEqual(textToAdd);
    wrapper.find('.convertButton').simulate('click');
    expect(wrapper.state().converted).toEqual(5);
  });

   it('adds non valid value should give error', function(){
    var textToAdd = 'v.s';
    wrapper.find('.textInput').simulate('change', {target: {value: textToAdd}});
    expect(wrapper.state().textToConvert).toEqual(textToAdd);
    wrapper.find('.convertButton').simulate('click');
    expect(wrapper.state().message).toEqual("Invalid Input");
  });
});
