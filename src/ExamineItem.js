import React from 'react';
import './ExamineItem.scss';
import Card from 'react-bootstrap/Card';

class ExamineItem extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.checked) {
      this.props.onAddSinId(this.props.sinId);
    } else {
      this.props.onRemoveSinId(this.props.sinId);
    }
  }

  render() {
    return <Card>
      {this.props.text}
      <label className="examine-check-container">
        Yes
        <input type="checkbox" onClick={this.handleClick} />
        <span class="examine-checkmark"></span>
      </label>
    </Card>
  }
}

export default ExamineItem;