import React from 'react';
import Card from 'react-bootstrap/Card';

class SinsList extends React.Component {
  render() {
    let sinCards = this.props.sinsList.map((text, index) =>
      <Card key={index}>
        {text}
      </Card>
    );

    return (
      <div>
        <h2>Review</h2>
        {sinCards}
      </div>
    );
  }
}

export default SinsList;