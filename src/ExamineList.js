import React from 'react';

class ExamineList extends React.Component {
    render() {
        let sinsdb = this.props.sinsdb;

        let elements = sinsdb.commandments.map( c =>
            <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
            </div>
        );

        return <div>
            <h2>Examine List</h2>
            {elements}
        </div>;
    }
}

export default ExamineList;