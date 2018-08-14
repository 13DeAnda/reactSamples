import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import ToDoList from '../component/ToDoList/ToDoList';

const wrapper = shallow(<ToDoList />);

describe('ToDoList component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <ToDoList />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('types on textbox', function(){
    var textToAdd = 'test 1';
    wrapper.find('.addInput').simulate('change', {target: {value: textToAdd}});
    expect(wrapper.state().textToAdd).toEqual(textToAdd);
  });

  it('clicks button to addToList and expects item to show on list state', function(){
    wrapper.find('.addButton').simulate('click');
    expect(wrapper.state().toDoList.length).toEqual(1);
  });
  it('trying to add an empty text should not add', function(){
    var textToAdd = '';
    wrapper.find('.addInput').simulate('change', {target: {value: textToAdd}});
    wrapper.find('.addButton').simulate('click');
    expect(wrapper.state().toDoList.length).toEqual(1);
  });

  it('selecting the first item should display delete button', function(){
    var textToAdd = '';
    wrapper.find('.checkListBox').simulate('click');
    wrapper.find('.deleteButton').simulate('click');
    expect(wrapper.state().toDoList.length).toEqual(0);
  });
});
