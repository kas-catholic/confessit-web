import React from 'react';
import './SinsList.scss';
import SinListItem from './SinListItem';

class SinsList extends React.Component {
  render() {
    let sinCards = this.props.sinsList.map((sinItem, index) =>
      <SinListItem
        key = {index}
        sinItem = {sinItem}
        onRemoveSinItem = {this.props.onRemoveSinItem}
      />
    );

    return (
      <div>
        <h2>{this.props.translator.translate('app.navigation.review', this.props.locale)}</h2>
        {sinCards}
      </div>
    );
  }
}

export default SinsList;
