import React from "react";
import "./App.scss";
import "./LoadingComponent.scss";
import Logo from "./assets/logo192.png";

class LoadingComponent extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <img src={Logo} className="loading-image" alt="Loding..." />
        <div>Loading...</div>
      </div>
    );
  }
}

export default LoadingComponent;
