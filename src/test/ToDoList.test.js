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
    const toDoListArray = toDoList.addToList("someText");
    expect(toDoListArray).toEqual(["someText"]);
  });
});
