import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import ToDoList from '../component/ToDoList/ToDoList';

describe('ToDoList component', () => {
  it('should render snapshot', () => {
    const component = renderer.create(
      <ToDoList />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add to the list array', () => {
    const toDoList = new ToDoList();
    let state = {toDoList: []};
    const toDoListArray = toDoList.addToList("someText");
    expect(toDoListArray).toEqual(["someText"]);
  });

  // it('should render required form elements', () => {
  //   const calculator = shallow(
  //     <Calculator />
  //   );

  //   const form = calculator.find('form');
  //   expect(form.length).toBe(1);
  //   expect(form.find('input').length).toBe(2);
  //   expect(form.find('button').length).toBe(1);
  //   expect(form.find('p.result').length).toBe(1);
  // });

  // it('should display the result on add', () => {
  //   const calculator = mount(
  //     <Calculator />
  //   );

  //   const form = calculator.find('form');

  //   form.childAt(0).instance().value = 3;
  //   form.childAt(1).instance().value = 5;
  //   form.find('button').simulate('click');

  //   const result = calculator.find('.result');
  //   expect(result.text()).toEqual('8');
  // });
});
