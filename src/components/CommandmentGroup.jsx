import React, { useState, useEffect, useCallback } from "react";

const CommandmentGroup = ({ title, text, cmdId, children }) => {
  // TODO: Use a daisyUI Collapse component to make this group collapsible.
  // Store any necessary collapse state in this component.
  return (
    <div className="collapse collapse-arrow mb-8 bg-base-200">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title">
        <h3 className="text-2xl">{title}</h3>
        <p>{text}</p>
      </div>

      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default CommandmentGroup;
