export default class ResolveFallbackLocale
{
    AVAILABLE_LOCALES = ['en', 'de', 'el', 'es'];
    DEFAULT_FALLBACK = 'en';


    resolve()
    {
        const browserLocales = window.navigator.languages;
        for (const browserLocale of browserLocales)
        {
            const splitBrowserLocale = browserLocale.split('-')[0];
            if (this.AVAILABLE_LOCALES.includes(splitBrowserLocale))
            {
                return splitBrowserLocale;
            }
        }

        return this.DEFAULT_FALLBACK;
    }
}
