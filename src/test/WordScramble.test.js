import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import WordScramble from '../component/WordScramble/WordScramble';

const wrapper = shallow(<WordScramble />);
const correctWord = "test";

describe('WordScramble component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <WordScramble />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('expects a word scrambled to not be the same as original', () => {
    var correctWord = "bigTest";
    wrapper.instance().getWord(correctWord);
    expect(wrapper.state().scrambledWord.length).toEqual(correctWord.length);
    expect(wrapper.state().scrambledWord).not.toEqual(correctWord);
  });

  it('expects used letters to be empty, and scrambledWordObj to be the apropiate length', () => {

    wrapper.instance().getWord(correctWord);
    expect(wrapper.state().scrambledWord.length).toEqual(wrapper.state().scrambledWordObj.length);
    expect(wrapper.state().usedLetters.length).toEqual(0);
  });
  it('types on the textbox and expects usedWords to increase and display on view', () => {
    var userText = "te";
    wrapper.find('.userTextBox').simulate('change', {target: {value: userText}});
    expect(wrapper.state().userWord.length).toEqual(userText.length);
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
