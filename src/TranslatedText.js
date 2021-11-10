import React from 'react';
import translator from './service/translation/translatorInstance';

export function TranslatedText(props) {
    const {text} = props;
    const {locale} = props;

    return <span>{translator.translate(text, locale)}</span>;
}
