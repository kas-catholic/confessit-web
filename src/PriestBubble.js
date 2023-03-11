import React from "react";
import Card from "react-bootstrap/Card";

class PriestBubble extends React.Component {
  render() {
    return <Card className="priest-bubble p-4">Priest: {this.props.text}</Card>;
  }
}

export default PriestBubble;
