import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class SinListItem extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onRemoveSinItem(this.props.sinItem);
  }

  render() {
    return (
      <Card className="sin-list-item">
        {this.props.sinItem.text}
        <Button variant="danger" size="sm" onClick={this.handleDelete}>
          <i className="fa fa-trash"></i>
        </Button>
      </Card>
    );
  }
}

export default SinListItem;
