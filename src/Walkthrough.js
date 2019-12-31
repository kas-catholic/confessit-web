import React from 'react';
import PriestBubble from './PriestBubble';
import UserBubble from './UserBubble';

class Walkthrough extends React.Component {
  render() {
    let sinCards = this.props.sinsList.map((text, index) =>
      <UserBubble text={text} key={index} />
    );

    return (
      <div>
        <h2>Walkthrough</h2>
        <PriestBubble text="In the name of the Father, and of the Son, and of the Holy Spirit. Amen." />
        <UserBubble text="Bless me father, for I have sinned. It has been ____ since my last confession, and these are my sins:" />
        <UserBubble text="These are my sins, and I am sorry for them with all my heart." />

        {sinCards}

        <PriestBubble text="(Your confessor may offer you some advice or have a short conversation with you." />
        <PriestBubble text="(Your confessor will assign you penance.) Now pray the act of contrition." />
        <UserBubble text="My God, I am sorry for my sins with all my heart. \n In choosing to do wrong and failing to do good, I have sinned against You, whom I should love above all things. \n I firmly intend with Your help to do penance, to sin no more, and to avoid whatever leads me to sin. \n Jesus Christ suffered and died for us. In His name, my God, have mercy." />
        <PriestBubble text="God, the Father of mercies..." />
        <UserBubble text="Amen." />
        <PriestBubble text="The Lord has freed you from sin. Go in peace." />
        <UserBubble text="Thanks be to God." />
      </div>
    );
  }
}

export default Walkthrough;