import React from 'react';
import './CommandmentGroup.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

class CommandmentGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => (
      {open: !state.open}
    ));
  }

  getClassName() {
    return this.state.open ?
      "fa fa-angle-up" :
      "fa fa-angle-down";
  }

  getCollapseId() {
    return `cmd-collapse-${this.props.cmdId}`
  }

  render() {
    return <Card className="examine-group">
      <Card.Header className="examine-header">
          <h3>{this.props.title}</h3>
          <p>{this.props.text}</p>
          <Button onClick={this.handleClick} aria-controls={this.getCollapseId()}>
            <i className={this.getClassName()}></i>
          </Button>
      </Card.Header>
  
      <Collapse in={this.state.open} id={this.getCollapseId()}>
        {this.props.children}
      </Collapse>
    </Card>
  }
}

export default CommandmentGroup;