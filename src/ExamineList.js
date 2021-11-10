import React from 'react';
import CommandmentGroup from './CommandmentGroup';
import ExamineItem from './ExamineItem';
import {TranslatedText} from './TranslatedText';

class ExamineList extends React.Component {
  render() {
    let sinsdb = this.props.sinsdb;

    let sins = sinsdb.sins.reduce((obj, sin) => {
      if (!obj.hasOwnProperty(sin.commandment_id)) {
        obj[sin.commandment_id] = [];
      }

      obj[sin.commandment_id].push(
        <ExamineItem
          selected={this.props.selectedSinIds.includes(sin.sin_id)}
          sinId={sin.sin_id}
          text={<TranslatedText text={sin.text} locale={this.props.locale}/>}
          key={sin.sin_id}
          onAddSinId={this.props.onAddSinId}
          onRemoveSinItem={this.props.onRemoveSinItem}
          locale={this.props.locale}
        />
      );

      return obj;
    }, {});

    let elements = sinsdb.commandments.map( c =>
      <CommandmentGroup
          title={<TranslatedText text={c.title} locale={this.props.locale}/>}
          text={<TranslatedText text={c.text} locale={this.props.locale}/>}
          cmdId={c.commandment_id}
          key={c.commandment_id}
      >
        <div>
          {<TranslatedText text={sins[c.commandment_id]} locale={this.props.locale}/>}
        </div>
      </CommandmentGroup>
    );

    return <div>
      <h2><TranslatedText text={'app.navigation.examine'} locale={this.props.locale}/></h2>
      {elements}
    </div>;
  }
}

export default ExamineList;
