import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {Landing} from '../src/component/Landing/Landing'


// Snapshot for Home React Component
describe('>>>Landing --- Snapshot',()=>{
    console.log("this is run");
    it('+++capturing Snapshot of Home', () => {
        const renderedValue =  renderer.create(<Landing/>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});
describe('>>>H O M E --- Shallow Render REACT COMPONENTS',()=>{
    let wrapper
     const output = 10

    beforeEach(()=>{
        wrapper = shallow(<Landing />)
        
    })

    it('+++ render the DUMB component', () => {
       expect(wrapper.length).toEqual(1)
    });

});
