import React, { useState, useEffect, useCallback } from "react";

const CommandmentGroup = ({ title, text, cmdId, children }) => {
  // TODO: Use a daisyUI Collapse component to make this group collapsible.
  // Store any necessary collapse state in this component.
  return (
    <div className="bg-red-600">
      <div className="bg-blue-400">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default CommandmentGroup;
