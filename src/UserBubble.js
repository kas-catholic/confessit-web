import React from "react";
import Card from "react-bootstrap/Card";

class UserBubble extends React.Component {
  render() {
    return (
      <Card className="user-bubble">
        <b>{this.props.children}</b>
      </Card>
    );
  }
}

export default UserBubble;
