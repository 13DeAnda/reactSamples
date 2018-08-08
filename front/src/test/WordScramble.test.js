import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import WordScramble from '../component/WordScramble/WordScramble';

const wrapper = shallow(<WordScramble />);
const instance = wrapper.instance();

const correctWord = "test";

describe('WordScramble component', () => {

  //unit test
  it('expects  scrambleText() result the same length', () => {
    var scrambledText = instance.scrambleText(correctWord);
    expect(scrambledText.length).toEqual(correctWord.length);
  });

  it('expects the scrambledText result not equal the original', () => {
    var scrambledText = instance.scrambleText(correctWord);
    expect(scrambledText).not.toEqual(correctWord);
  });

  it('expects the getWord() result to not be the same length', () => {
    var scrambledText = instance.getWord(correctWord);
    expect(scrambledText.length).toEqual(correctWord.length);
  });

  it('expects the getWord() to not be the same length', () => {
    var scrambledText = instance.getWord(correctWord);
    expect(scrambledText).not.toEqual(correctWord);
  });

  //UI testing
  it('should render snapshot', () => {
    const component = renderer.create(
      <WordScramble />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });



  it('types on the textbox and expects usedWords to increase and display on view', () => {
    var userText = "te";
    wrapper.find('.userTextBox').simulate('change', {target: {value: userText}});

    expect(wrapper.state().userWord).toEqual(userText);
  });

  it('should not display letters not in the scrambled  word', () => {
    var userText = "km";
    wrapper.find('.userTextBox').simulate('change', {target: {value: userText}});
    expect(wrapper.state().userWord.length).not.toEqual(userText.length);
  });


  it('should display changed score if correct word is typed', () => {
    wrapper.find('.userTextBox').simulate('change', {target: {value: correctWord}});
    expect(wrapper.state().score).toEqual(1);
  });

});
