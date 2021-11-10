export default class Translator
{
    /**
     * @var {Map<string, Record<string, string>>} translationSet;
     */
    translationMap;

    constructor()
    {
        this.translationMap = new Map();
    }

    /**
     * @param {string} translationKey
     * @param {Record<string, string>} translations
     * @return {Translator}
     */
    addTranslationSet(translationKey, translations)
    {
        this.translationMap.set(translationKey, translations);

        return this;
    }

    /**
     * @param translationKey
     * @param languageKey
     * @param dataToReplace
     * @returns string
     */
    translate(translationKey, languageKey, dataToReplace)
    {
        const map = this.translationMap.get(languageKey);
        if (!map)
        {
            throw new Error(`Translation map for language ${languageKey} does not exist.`);
        }

        const translation = map[translationKey];

        if (!translation)
        {
            return translationKey;
        }

        let newTranslation = translation;
        if (dataToReplace && Object.keys(dataToReplace).length) {
            for (let replaceEntry in dataToReplace) {
                newTranslation = newTranslation.replace(`{{${replaceEntry}}}`, dataToReplace[replaceEntry]);
            }
        }

        return newTranslation;
    }

}
