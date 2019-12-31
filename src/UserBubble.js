import React from 'react';
import Card from 'react-bootstrap/Card';

class UserBubble extends React.Component {
    render() {
        return <Card><b>{this.props.text}</b></Card>;
    }
}

export default UserBubble;