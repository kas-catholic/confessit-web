import React from 'react';
import SinListItem from './SinListItem';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter.default() });

describe('SinListItem', () => {
  const sinItemMock = {};
  const onRemoveSinItemMock = jest.fn();
  const wrapper = shallow(
    <SinListItem
      onRemoveSinItem={onRemoveSinItemMock}
      sinItem={sinItemMock}
    />
  );
  const instance = wrapper.instance();

  describe('handleDelete', () => {
    it('calls onRemoveSinItem', () => {
      instance.handleDelete();

      expect(onRemoveSinItemMock).toHaveBeenCalledWith(sinItemMock);
    });
  });
});
