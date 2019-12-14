import React from 'react';
import Card from 'react-bootstrap/Card'

class SinItem extends React.Component {
  render() {
    return <Card>
      {this.props.text}
    </Card>
  }
}

export default SinItem;