import { t } from "i18next";

const DummyTranslation = () => {
  return (
    <div>
      <h1>
        dummy component that allows the i18next-scanner to pick up on
        commandments and sins translations
      </h1>
      <span>
        {t(
          "commandments.1.description",
          "I am the Lord your God, who brought you out of the land of Egypt, out of the house of bondage. You shall have no other gods before me… you shall not bow down to them or serve them; for I the Lord your God am a jealous God… showing steadfast love to thousands of those who love me and keep my commandments. (Ex 20:2-6) The capital sins of pride and gluttony are often considered to break this commandment.",
        )}
      </span>
      <span>
        {t(
          "commandments.1.text",
          "You shall have no other gods before Me. (Ex 20:3)",
        )}
      </span>
      <span>{t("commandments.1.title", "First Commandment")}</span>
      <span>
        {t(
          "commandments.2.description",
          "You shall not take the name of the Lord your God in vain; for the Lord will not hold him guiltless who takes his name in vain. (Ex 20:7)",
        )}
      </span>
      <span>
        {t(
          "commandments.2.text",
          "You shall not take the name of the Lord your God in vain. (Ex 20:7)",
        )}
      </span>
      <span>{t("commandments.2.title", "Second Commandment")}</span>
      <span>
        {t(
          "commandments.3.description",
          "Remember the sabbath day, to keep it holy. Six days you shall labor, and do all your work; but the seventh day is a sabbath to the Lord your God; in it you shall not do any work… For in six days the Lord made heaven and earth, the sea, and all that is in them, and rested the seventh day; therefore the Lord blessed the sabbath day and hallowed it. (Ex 20:8-11)",
        )}
      </span>
      <span>
        {t(
          "commandments.3.text",
          "Remember the sabbath day, to keep it holy. (Ex 20:8)",
        )}
      </span>
      <span>{t("commandments.3.title", "Third Commandment")}</span>
      <span>
        {t(
          "commandments.4.description",
          "Honor your father and mother, that your days may be long in the land which the Lord your God gives you. (Ex 20:12)",
        )}
      </span>
      <span>
        {t(
          "commandments.4.text",
          "Honor your father and your mother. (Ex 20:12)",
        )}
      </span>
      <span>{t("commandments.4.title", "Fourth Commandment")}</span>
      <span>
        {t(
          "commandments.5.description",
          "You shall not kill. (Ex 20:13) The capital sin of anger is often associated with this commandment.",
        )}
      </span>
      <span>{t("commandments.5.text", "You shall not kill. (Ex 20:13)")}</span>
      <span>{t("commandments.5.title", "Fifth Commandment")}</span>
      <span>
        {t(
          "commandments.6.description",
          "You shall not commit adultery. (Ex 20:14) The capital sin of lust breaks this commandment.",
        )}
      </span>
      <span>
        {t("commandments.6.text", "You shall not commit adultery. (Ex 20:14)")}
      </span>
      <span>{t("commandments.6.title", "Sixth Commandment")}</span>
      <span>
        {t(
          "commandments.7.description",
          "You shall not steal. (Ex 20:15) The capital sins of greed and sloth are often considered to break this commandment.",
        )}
      </span>
      <span>{t("commandments.7.text", "You shall not steal. (Ex 20:15)")}</span>
      <span>{t("commandments.7.title", "Seventh Commandment")}</span>
      <span>
        {t(
          "commandments.8.description",
          "You shall not bear false witness against your neighbor. (Ex 20:16)",
        )}
      </span>
      <span>
        {t(
          "commandments.8.text",
          "You shall not bear false witness against your neighbor. (Ex 20:16)",
        )}
      </span>
      <span>{t("commandments.8.title", "Eighth Commandment")}</span>
      <span>
        {t(
          "commandments.9.description",
          "You shall not covet your neighbor's wife. (Ex 20:17) The capital sin of jealousy can break this commandment.",
        )}
      </span>
      <span>
        {t(
          "commandments.9.text",
          "You shall not covet your neighbor's wife. (Ex 20:17)",
        )}
      </span>
      <span>{t("commandments.9.title", "Ninth Commandment")}</span>
      <span>
        {t(
          "commandments.10.description",
          "You shall not covet your neighbor's house… or his manservant, or his maidservant, or his ox, or his ass, or anything that is your neighbor's. (Ex 20:17) The capital sin of jealousy can break this commandment.",
        )}
      </span>
      <span>
        {t(
          "commandments.10.text",
          "You shall not covet your neighbor's goods. (Ex 20:17)",
        )}
      </span>
      <span>{t("commandments.10.title", "Tenth Commandment")}</span>
      <span>
        {t(
          "commandments.11.description",
          "The precepts of the Church are set in the context of a moral life bound to and nourished by liturgical life. The obligatory character of these positive laws decreed by the pastoral authorities is meant to guarantee to the faithful the very necessary minimum in the spirit of prayer and moral effort, in the growth in love of God and neighbor (CCC 2041).",
        )}
      </span>
      <span>
        {t(
          "commandments.11.text",
          "The precepts of the Catholic Church are the minimum requirements that all Catholics should fulfill.",
        )}
      </span>
      <span>{t("commandments.11.title", "Precepts of the Church")}</span>
      <span>
        {t(
          "sins.1.detail",
          "To obey in faith is to submit freely to the word that has been heard, because its truth is guaranteed by God, who is Truth itself (CCC 144). It is important to believe in all of the teachings of the church.",
        )}
      </span>
      <span>
        {t(
          "sins.1.text",
          "Did I refuse to believe the teachings of the Catholic Church?",
        )}
      </span>
      <span>
        {t(
          "sins.1.text_past",
          "I refused to believe the teachings of the Catholic Church.",
        )}
      </span>
      <span>
        {t(
          "sins.2.detail",
          "The first commandment forbids honoring gods other than the one Lord who has revealed himself to his people (CCC 2110). It is wrong to practice a religion other than Catholicism because it weakens our relationship with our Lord.",
        )}
      </span>
      <span>
        {t("sins.2.text", "Did I practice any religion besides Catholicism?")}
      </span>
      <span>
        {t("sins.2.text_past", "I practiced a religion besides Catholicism.")}
      </span>
      <span>
        {t(
          "sins.3.detail",
          "Presuming God's mercy is hoping to obtain forgiveness without conversion and glory without merit (CCC 2092). It is wrong to do something immoral because you expect God to forgive you.",
        )}
      </span>
      <span>{t("sins.3.text", "Did I presume God's mercy?")}</span>
      <span>{t("sins.3.text_past", "I presumed God's mercy.")}</span>
      <span>
        {t(
          "sins.4.detail",
          "Adoring God, praying to him, offering him the worship that belongs to him, fulfilling the promises and vows made to him are acts of the virtue of religion which fall under obedience to the first commandment (CCC 2135). Prayer is important because without prayer we cannot have a relationship with God.",
        )}
      </span>
      <span>
        {t(
          "sins.4.text",
          "How is my prayer life? Do I need to pray more often?",
        )}
      </span>
      <span>{t("sins.4.text_past", "I need to pray more often.")}</span>
      <span>{t("sins.5.detail", "")}</span>
      <span>
        {t(
          "sins.5.text",
          "Our culture often conflicts with Catholic ideals. Did I fail to stand up for Catholic moral values?",
        )}
      </span>
      <span>
        {t(
          "sins.5.text_past",
          "I failed to stand up for Catholic moral values.",
        )}
      </span>
      <span>{t("sins.6.detail", "")}</span>
      <span>{t("sins.6.text", "Did I use foul language?")}</span>
      <span>{t("sins.6.text_past", "I used foul language.")}</span>
      <span>
        {t(
          "sins.7.detail",
          "The second commandment forbids every improper use of God's name. Blasphemy is the use of the name of God, of Jesus Christ, of the Virgin Mary, and of the saints in an offensive way (CCC 2162).",
        )}
      </span>
      <span>{t("sins.7.text", "Did I use God's name without respect?")}</span>
      <span>{t("sins.7.text_past", "I used God's name without respect.")}</span>
      <span>
        {t(
          "sins.8.detail",
          "Respect for His name is an expression of the respect owed to the mystery of God himself and to the whole sacred reality it evokes (CCC 2144).",
        )}
      </span>
      <span>{t("sins.8.text", "Did I insult God?")}</span>
      <span>{t("sins.8.text_past", "I insulted God.")}</span>
      <span>
        {t(
          "sins.9.detail",
          'The first precept of the Catholic church is "You shall attend Mass on Sundays and holy days of obligation and rest from servile labor" (CCC 2042). As Catholics, we look forward to celebrating the Eucharist every Sunday. It is a sin to skip mass because it weakens our relationship with God.',
        )}
      </span>
      <span>{t("sins.9.text", "Did I skip mass on Sunday?")}</span>
      <span>{t("sins.9.text_past", "I skipped mass on Sunday.")}</span>
      <span>
        {t(
          "sins.10.detail",
          'The first precept of the Catholic church is "You shall attend Mass on Sundays and holy days of obligation and rest from servile labor" (CCC 2042). As Catholics, we look forward to celebrating the Eucharist on holy days of obligation. It is a sin to skip mass because it weakens our relationship with God.',
        )}
      </span>
      <span>
        {t("sins.10.text", "Did I skip mass on a holy day of obligation?")}
      </span>
      <span>
        {t("sins.10.text_past", "I skipped mass on a holy day of obligation.")}
      </span>
      <span>
        {t(
          "sins.11.detail",
          "Come to church early, approach the Lord, and confess your sins, repent in prayer… Be present at the sacred and divine liturgy, conclude its prayer and do not leave before dismissal… (CCC 2178). It is also rude and distracting to others who are worshipping to arrive late or leave early.",
        )}
      </span>
      <span>
        {t("sins.11.text", "Did I arrive to mass late or leave early?")}
      </span>
      <span>
        {t("sins.11.text_past", "I arrived to mass late or left early.")}
      </span>
      <span>{t("sins.12.detail", "")}</span>
      <span>{t("sins.12.text", "Did I disobey my parents?")}</span>
      <span>{t("sins.12.text_past", "I disobeyed my parents.")}</span>
      <span>{t("sins.13.detail", "")}</span>
      <span>
        {t(
          "sins.13.text",
          "Did I fail to raise my children in the Catholic faith?",
        )}
      </span>
      <span>
        {t(
          "sins.13.text_past",
          "I failed to raise my children in the Catholic faith.",
        )}
      </span>
      <span>{t("sins.14.detail", "")}</span>
      <span>
        {t("sins.14.text", "Did I fail to care for my elderly relatives?")}
      </span>
      <span>
        {t("sins.14.text_past", "I failed to care for my elderly relatives.")}
      </span>
      <span>{t("sins.15.detail", "")}</span>
      <span>{t("sins.15.text", "Did I neglect my family?")}</span>
      <span>{t("sins.15.text_past", "I neglected my family.")}</span>
      <span>{t("sins.16.detail", "")}</span>
      <span>{t("sins.16.text", "Did I disobey any responsible adult?")}</span>
      <span>{t("sins.16.text_past", "I disobeyed a responsible adult.")}</span>
      <span>{t("sins.17.detail", "")}</span>
      <span>
        {t(
          "sins.17.text",
          "Did I fail to teach my children about their human sexuality?",
        )}
      </span>
      <span>
        {t(
          "sins.17.text_past",
          "I failed to teach my children about their human sexuality.",
        )}
      </span>
      <span>{t("sins.18.detail", "")}</span>
      <span>{t("sins.18.text", "Did I break a just law?")}</span>
      <span>{t("sins.18.text_past", "I broke a just law.")}</span>
      <span>{t("sins.19.detail", "")}</span>
      <span>{t("sins.19.text", "Did I physically hurt anyone?")}</span>
      <span>{t("sins.19.text_past", "I physically hurt someone.")}</span>
      <span>{t("sins.20.detail", "")}</span>
      <span>
        {t(
          "sins.20.text",
          "Did I have an abortion? Did I participate in an abortion?",
        )}
      </span>
      <span>
        {t("sins.20.text_past", "I had or participated in an abortion.")}
      </span>
      <span>
        {t(
          "sins.21.detail",
          '"Every action which, whether in anticipation of the conjugal act, or in its accomplishment, or in the development of its natural consequences, proposes, whether as an end or as a means, to render procreation impossible is intrinsically evil" (CCC 2370). "Legitimate intentions on the part of the spouses do not justify recourse to morally unacceptable means (for example, direct sterilization or contraception)" (CCC 2399). Artificial contraception is wrong because it makes a beautiful act of love into something selfish.',
        )}
      </span>
      <span>{t("sins.21.text", "Did I use artificial birth control?")}</span>
      <span>{t("sins.21.text_past", "I used artificial birth control.")}</span>
      <span>{t("sins.22.detail", "")}</span>
      <span>{t("sins.22.text", "Did I attempt suicide?")}</span>
      <span>{t("sins.22.text_past", "I attempted suicide.")}</span>
      <span>{t("sins.23.detail", "")}</span>
      <span>{t("sins.23.text", "Did I participate in euthanasia?")}</span>
      <span>{t("sins.23.text_past", "I participated in Euthanasia.")}</span>
      <span>{t("sins.24.detail", "")}</span>
      <span>{t("sins.24.text", "Did I abuse drugs or alcohol?")}</span>
      <span>{t("sins.24.text_past", "I abused drugs or alcohol.")}</span>
      <span>{t("sins.25.detail", "")}</span>
      <span>{t("sins.25.text", "Did I have sex outside marriage?")}</span>
      <span>{t("sins.25.text_past", "I had sex outside marriage.")}</span>
      <span>{t("sins.26.detail", "")}</span>
      <span>{t("sins.26.text", "Am I guilty of the sin of lust?")}</span>
      <span>{t("sins.26.text_past", "I am guilty of the sin of lust.")}</span>
      <span>{t("sins.27.detail", "")}</span>
      <span>{t("sins.27.text", "Did I look at pornography?")}</span>
      <span>{t("sins.27.text_past", "I looked at pornography.")}</span>
      <span>{t("sins.28.detail", "")}</span>
      <span>{t("sins.28.text", "Did I act on homosexual desires?")}</span>
      <span>{t("sins.28.text_past", "I acted on homosexual desires.")}</span>
      <span>{t("sins.29.detail", "")}</span>
      <span>
        {t("sins.29.text", "Did I fail to honor my husband or wife?")}
      </span>
      <span>
        {t("sins.29.text_past", "I failed to honor my husband or wife.")}
      </span>
      <span>{t("sins.30.detail", "")}</span>
      <span>{t("sins.30.text", "Did I read erotic literature?")}</span>
      <span>{t("sins.30.text_past", "I read erotic literature.")}</span>
      <span>{t("sins.31.detail", "")}</span>
      <span>{t("sins.31.text", "Did I engage in sexually immoral acts?")}</span>
      <span>
        {t("sins.31.text_past", "I engaged in sexually immoral acts.")}
      </span>
      <span>{t("sins.32.detail", "")}</span>
      <span>
        {t(
          "sins.32.text",
          "Did I give in to overly passionate kissing for pleasure?",
        )}
      </span>
      <span>
        {t(
          "sins.32.text_past",
          "I gave in to overly passionate kissing for pleasure.",
        )}
      </span>
      <span>{t("sins.33.detail", "")}</span>
      <span>
        {t("sins.33.text", "Did I steal anything? If so, to what extent?")}
      </span>
      <span>
        {t(
          "sins.33.text_past",
          "I stole something. (To such and such an extent.)",
        )}
      </span>
      <span>{t("sins.34.detail", "")}</span>
      <span>
        {t("sins.34.text", "Did I pirate movies, music, or software?")}
      </span>
      <span>
        {t("sins.34.text_past", "I pirated movies, music, or software.")}
      </span>
      <span>{t("sins.35.detail", "")}</span>
      <span>{t("sins.35.text", "Did I lie or cheat?")}</span>
      <span>{t("sins.35.text_past", "I lied or cheated.")}</span>
      <span>{t("sins.36.detail", "")}</span>
      <span>{t("sins.36.text", "Did I gossip about others?")}</span>
      <span>{t("sins.36.text_past", "I gossiped about others.")}</span>
      <span>{t("sins.37.detail", "")}</span>
      <span>
        {t(
          "sins.37.text",
          "Did I fail to fast on Ash Wednesday and Good Friday?",
        )}
      </span>
      <span>
        {t(
          "sins.37.text_past",
          "I failed to fast on Ash Wednesday or Good Friday.",
        )}
      </span>
      <span>{t("sins.38.detail", "")}</span>
      <span>
        {t(
          "sins.38.text",
          "Did I fail to abstain from meat on Fridays of Lent and Ash Wednesday?",
        )}
      </span>
      <span>
        {t(
          "sins.38.text_past",
          "I failed to abstain from meat on a Friday during Lent or Ash Wednesday.",
        )}
      </span>
      <span>{t("sins.39.detail", "")}</span>
      <span>
        {t(
          "sins.39.text",
          "Did I fail to receive the Eucharist at least once during Easter?",
        )}
      </span>
      <span>
        {t(
          "sins.39.text_past",
          "I failed to receive the Eucharist at least once during Easter.",
        )}
      </span>
      <span>{t("sins.40.detail", "")}</span>
      <span>
        {t(
          "sins.40.text",
          "Did I fail to fast for an hour before receiving the Eucharist?",
        )}
      </span>
      <span>
        {t(
          "sins.40.text_past",
          "I failed to fast for an hour before receiving the Eucharist.",
        )}
      </span>
      <span>{t("sins.41.detail", "")}</span>
      <span>
        {t(
          "sins.41.text",
          "Did I receive the Eucharist in a state of mortal sin?",
        )}
      </span>
      <span>
        {t(
          "sins.41.text_past",
          "I received the Eucharist in a state of mortal sin.",
        )}
      </span>
      <span>{t("sins.42.detail", "")}</span>
      <span>
        {t("sins.42.text", "Did I intentionally hide something at confession?")}
      </span>
      <span>
        {t("sins.42.text_past", "I intentionally hid something at confession.")}
      </span>
      <span>{t("sins.43.detail", "")}</span>
      <span>
        {t(
          "sins.43.text",
          "Was I too busy to rest and spend time with my family on Sunday?",
        )}
      </span>
      <span>
        {t(
          "sins.43.text_past",
          "I was too busy to rest and spend time with my family on Sunday.",
        )}
      </span>
      <span>{t("sins.44.detail", "")}</span>
      <span>
        {t(
          "sins.44.text",
          "Was I jealous of someone else's wife/husband or fiancée/fiancé?",
        )}
      </span>
      <span>
        {t(
          "sins.44.text_past",
          "I was jealous of someone else's wife/husband or fiancée/fiancé.",
        )}
      </span>
      <span>{t("sins.45.detail", "")}</span>
      <span>
        {t(
          "sins.45.text",
          "Was I jealous of something that belongs to someone else?",
        )}
      </span>
      <span>
        {t(
          "sins.45.text_past",
          "I was jealous of something that belongs to someone else.",
        )}
      </span>
      <span>{t("sins.46.detail", "")}</span>
      <span>
        {t(
          "sins.46.text",
          "Did I vote for a candidate or policy that does not uphold my Catholic values?",
        )}
      </span>
      <span>
        {t(
          "sins.46.text_past",
          "I voted for a candidate or policy that does not uphold my Catholic values.",
        )}
      </span>
      <span>{t("sins.47.detail", "")}</span>
      <span>
        {t(
          "sins.47.text",
          "Did I listen to music or watch TV or a movie that have a bad influence on me?",
        )}
      </span>
      <span>
        {t(
          "sins.47.text_past",
          "I listened to music or watched TV or a movie that had a bad influence on me.",
        )}
      </span>
      <span>{t("sins.48.detail", "")}</span>
      <span>
        {t(
          "sins.48.text",
          "Was I greedy, or did I fail to give generously to my church and to the poor?",
        )}
      </span>
      <span>
        {t(
          "sins.48.text_past",
          "I was greedy or failed to give generously to my church or to the poor.",
        )}
      </span>
      <span>{t("sins.49.detail", "")}</span>
      <span>{t("sins.49.text", "Did I knowingly lead others into sin?")}</span>
      <span>{t("sins.49.text_past", "I knowingly led others into sin.")}</span>
      <span>{t("sins.50.detail", "")}</span>
      <span>
        {t("sins.50.text", "Did I fail to make God a priority in my life?")}
      </span>
      <span>
        {t("sins.50.text_past", "I failed to make God a priority in my life.")}
      </span>
      <span>{t("sins.51.detail", "")}</span>
      <span>{t("sins.51.text", "Have I acted selfishly?")}</span>
      <span>{t("sins.51.text_past", "I acted selfishly.")}</span>
      <span>{t("sins.52.detail", "")}</span>
      <span>{t("sins.52.text", "Did I participate in occult practices?")}</span>
      <span>
        {t("sins.52.text_past", "I participated in occult practices.")}
      </span>
      <span>{t("sins.53.detail", "")}</span>
      <span>
        {t("sins.53.text", "Have I been slothful at work or at home?")}
      </span>
      <span>
        {t("sins.53.text_past", "I was slothful at work or at home.")}
      </span>
      <span>{t("sins.54.detail", "")}</span>
      <span>{t("sins.54.text", "Have I been lazy with my school work?")}</span>
      <span>{t("sins.54.text_past", "I was lazy with my school work.")}</span>
      <span>{t("sins.55.detail", "")}</span>
      <span>{t("sins.55.text", "Have I been prideful or vain?")}</span>
      <span>{t("sins.55.text_past", "I was prideful or vain.")}</span>
      <span>{t("sins.56.detail", "")}</span>
      <span>{t("sins.56.text", "Have I committed the sin of gluttony?")}</span>
      <span>{t("sins.56.text_past", "I am guilty of gluttony.")}</span>
      <span>{t("sins.57.detail", "")}</span>
      <span>
        {t("sins.57.text", "Have I allowed myself to be controlled by anger?")}
      </span>
      <span>
        {t("sins.57.text_past", "I allowed myself to be controlled by anger.")}
      </span>
    </div>
  );
};

export default DummyTranslation;
