import React from 'react';
import ExpandableListRow from './ExpandableListRow';

class ExamineList extends React.Component {
    render() {
        let sinsdb = this.props.sinsdb;

        let elements = sinsdb.commandments.map( c =>
            <ExpandableListRow title={c.title} text={c.text} key={c.title} />
        );

        return <div>
            <h2>Examine List</h2>
            {elements}
        </div>;
    }
}

export default ExamineList;