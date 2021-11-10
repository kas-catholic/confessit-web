import React from 'react';
import './SinsList.scss';
import SinListItem from './SinListItem';
import {TranslatedText} from './TranslatedText';

class SinsList extends React.Component {
  render() {
    let sinCards = this.props.sinsList.map((sinItem, index) =>
      <SinListItem
        locale={this.props.locale}
        key = {index}
        sinItem = {sinItem}
        onRemoveSinItem = {this.props.onRemoveSinItem}
      />
    );

    return (
      <div>
        <h2><TranslatedText text={'app.navigation.review'}  locale={this.props.locale}/></h2>
        {sinCards}
      </div>
    );
  }
}

export default SinsList;
