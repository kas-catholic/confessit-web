import React from "react";
import Card from "react-bootstrap/Card";

class UserBubble extends React.Component {
  render() {
    return <Card className="user-bubble fw-bold">{this.props.children}</Card>;
  }
}

export default UserBubble;
