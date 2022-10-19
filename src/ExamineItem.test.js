import React from "react";
import ExamineItem from "./ExamineItem";
import { shallow, configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter.default() });

describe("ExamineItem", () => {
  const onAddSinIdMock = jest.fn();
  const onRemoveSinItemMock = jest.fn();
  const wrapper = shallow(
    <ExamineItem
      onAddSinId={onAddSinIdMock}
      onRemoveSinItem={onRemoveSinItemMock}
      sinId={1}
    />
  );
  const instance = wrapper.instance();

  describe("handleClick", () => {
    const eventObject = {
      target: {
        checked: true,
      },
    };

    describe("when the target has been checked", () => {
      it("calls onAddSinId", () => {
        instance.handleClick(eventObject);

        expect(onAddSinIdMock).toHaveBeenCalledWith(1);
      });
    });

    describe("when the target has not een checked", () => {
      it("calls onRemoveSinItem", () => {
        eventObject.target.checked = false;
        instance.handleClick(eventObject);

        expect(onRemoveSinItemMock).toHaveBeenCalledWith({ id: 1 });
      });
    });
  });
});
