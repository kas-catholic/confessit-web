import Translator from './Translator';
import {enTranslations} from '../../data/translations/en';
import {deTranslations} from '../../data/translations/de';
import {elTranslations} from '../../data/translations/el';
import {esTranslations} from '../../data/translations/es';

const translator = new Translator();
translator.addTranslationSet('en', enTranslations);
translator.addTranslationSet('de', deTranslations);
translator.addTranslationSet('el', elTranslations);
translator.addTranslationSet('es', esTranslations);


export default translator;
