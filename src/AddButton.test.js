import React from 'react';
import AddButton from './AddButton';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter.default() });

describe('AddButton', () => {
  const addCustomSinMock = jest.fn();
  const wrapper = shallow(<AddButton addCustomSin={addCustomSinMock} />);
  const instance = wrapper.instance();

  describe('constructor', () => {
    const state = instance.state
    it('should be defined', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should have showModal as false by default', () => {
      expect(state.showModal).toBe(false);
    });

    it('should have inputValue of empty string by default', () => {
      expect(state.inputValue).toEqual('');
    });
  });

  describe('handleShow', () => {
    it('should set showModal to true', () => {
      instance.handleShow();

      expect(instance.state.showModal).toBe(true);
    });
  });

  describe('handleClose', () => {
    it('should set showModal to false', () => {
      instance.state.showModal = true;
      instance.handleClose();

      expect(instance.state.showModal).toBe(false);
    });
  });

  describe('handleAdd', () => {
    beforeEach(() => {
      jest.spyOn(instance, 'handleClose');
      instance.handleAdd();
    });

    it('should call addCustomSin', () => {
      expect(addCustomSinMock).toHaveBeenCalled();
    });

    it('should set inputValue to empty string', () => {
      expect(instance.state.inputValue).toEqual('');
    });

    it('should call handleClose', () => {
      expect(instance.handleClose).toHaveBeenCalled();
    });
  });
});

