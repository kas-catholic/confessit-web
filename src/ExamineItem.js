import React from 'react';
import Card from 'react-bootstrap/Card'

class ExamineItem extends React.Component {
  render() {
    return <Card>
      {this.props.text}
      <label>
        <input type="checkbox" />
        Yes
      </label>
    </Card>
  }
}

export default ExamineItem;