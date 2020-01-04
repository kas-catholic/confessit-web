import React from 'react';
import Card from 'react-bootstrap/Card';

class UserBubble extends React.Component {
    render() {
        return <Card className="user-bubble"><b>{this.props.text}</b></Card>;
    }
}

export default UserBubble;