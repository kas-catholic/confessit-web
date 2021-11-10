import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {TranslatedText} from './TranslatedText';

class SinListItem extends React.Component
{
    constructor(props)
    {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete()
    {
        this.props.onRemoveSinItem(this.props.sinItem);
    }

    render()
    {
        return (
            <Card className="sin-list-item">
                <TranslatedText text={this.props.sinItem.text} locale={this.props.locale}/>
                <Button variant="danger" size="sm" onClick={this.handleDelete}>
                    <i className="fa fa-trash"></i>
                </Button>
            </Card>
        );
    }
}

export default SinListItem;
