import React from 'react';
import CommandmentGroup from './CommandmentGroup';
import ExamineItem from './ExamineItem';

class ExamineList extends React.Component {
  render() {
    let sinsdb = this.props.sinsdb;

    let sins = sinsdb.sins.reduce((obj, sin) => {
      if (!obj.hasOwnProperty(sin.commandment_id)) {
        obj[sin.commandment_id] = [];
      }

      obj[sin.commandment_id].push(
        <ExamineItem
          sinId={sin.sin_id}
          text={sin.text}
          key={sin.sin_id}
          onAddSinId={this.props.onAddSinId}
          onRemoveSinId={this.props.onRemoveSinId}
        />
      );

      return obj;
    }, {});
      
    let elements = sinsdb.commandments.map( c =>
      <CommandmentGroup title={c.title} text={c.text} cmdId={c.commandment_id} key={c.commandment_id}>
        <div>
          {sins[c.commandment_id]}
        </div>
      </CommandmentGroup>
    );

    return <div>
      <h2>Examine List</h2>
      {elements}
    </div>;
  }
}

export default ExamineList;