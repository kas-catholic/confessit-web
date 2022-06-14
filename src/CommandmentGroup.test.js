import React from 'react';
import CommandmentGroup from './CommandmentGroup';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter.default() });

describe('CommandmentGroup', () => {
  const wrapper = shallow(<CommandmentGroup cmdId={1} />);
  const instance = wrapper.instance();

  describe('constructor', () => {
    it('should have a default open state of false', () => {
      expect(instance.state.open).toBe(true);
    });
  });

  describe('handleClick', () => {
    it('should set open to the opposite of its current value', () => {
      instance.state.open = false;
      instance.handleClick();

      expect(instance.state.open).toBe(true);
    });
  });

  describe('getClassName', () => {
    it('should return fa fa-angle-up if state.open is true', () => {
      instance.state.open = true;
      const result = instance.getClassName();

      expect(result).toEqual('fa fa-angle-up');
    });

    it('should return fa fa-angle-down if state.open is false', () => {
      instance.state.open = false;
      const result = instance.getClassName();

      expect(result).toEqual('fa fa-angle-down');
    });
  });

  describe('getCollapseId', () => {
    it('should return the id', () => {
      const result = instance.getCollapseId();

      expect(result).toEqual('cmd-collapse-1');
    });
  });
});