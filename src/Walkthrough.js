import React from 'react';
import './Walkthrough.scss';
import PriestBubble from './PriestBubble';
import UserBubble from './UserBubble';

class Walkthrough extends React.Component {
  render() {
    const  {translator} = this.props;
    let sinCards = this.props.sinsList.map((sinItem, index) =>
      <UserBubble key={index}>{sinItem.text}</UserBubble>
    );

    return (
      <div>
        <h2>{translator.translate('app.navigation.walkthrough', this.props.locale)}</h2>
        <PriestBubble
            text={translator.translate('app.walkthrough.priest.introductory_prayer', this.props.locale)}
        />
        <UserBubble>
            {translator.translate('app.walkthrough.penitant.bless_me_father', this.props.locale)}
        </UserBubble>

        {sinCards}

        <UserBubble>
            {translator.translate('app.walkthrough.penitant.these_are_my_sins', this.props.locale)}
        </UserBubble>
        <PriestBubble text="(Your confessor may offer you some advice or have a short conversation with you." />
        <PriestBubble text="(Your confessor will assign you penance.) Now pray the act of contrition." />
        <UserBubble>
          <p>My God, I am sorry for my sins with all my heart.</p>
          <p>In choosing to do wrong and failing to do good, I have sinned against You, whom I should love above all things.</p>
          <p>I firmly intend with Your help to do penance, to sin no more, and to avoid whatever leads me to sin.</p>
          <p>Jesus Christ suffered and died for us. In His name, my God, have mercy.</p>
        </UserBubble>
        <PriestBubble text="God, the Father of mercies..." />
        <UserBubble>
          Amen.
        </UserBubble>
        <PriestBubble text="The Lord has freed you from sin. Go in peace." />
        <UserBubble>
          Thanks be to God.
        </UserBubble>
      </div>
    );
  }
}

export default Walkthrough;
