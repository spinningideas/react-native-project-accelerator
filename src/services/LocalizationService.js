import StorageService from 'src/services/StorageService';

const LocalizationService = () => {
  const defaultLocale = 'enUS';

  const storageService = StorageService;

  const getSupportedLocales = () => {
    return [
      { localeCode: 'enUS', text: 'English' },
      { localeCode: 'zhCN', text: 'Chinese' },
      { localeCode: 'esES', text: 'Spanish' }
    ];
  };

  const getUserLocale = async () => {
    let locale = await storageService.getItem('locale');
    if (locale) {
      return locale;
    }
    return defaultLocale;
  };

  const setUserLocale = async (loc) => {
    return await storageService.setItem('locale', loc);
  };

  const getCurrentLocale = async () => {
    // OPTIONAL ADDITION: lookup current user local and populate found and return this
    let found = [];
    if (found.length === 0) {
      return await getUserLocale();
    }
    return found[0];
  };

  const getLocalizedTextSet = async (keys, locale) => {
    // async import the locale file for given locale
    // and extract the set of localized text values for given keys
    let textSet = {};
    const localizedData = await getLocalizedData(locale);
    if (localizedData) {
      let localizedTextSet = localizedData;
      const keysLocalizedTextSet = Object.keys(localizedTextSet);
      for (const desiredKey of keys) {
        for (const key of keysLocalizedTextSet) {
          if (desiredKey === key) {
            textSet[key] = localizedTextSet[key];
          }
        }
      }
    }
    return textSet;
  };

  const getLocalizedData = async (localeCode) => {
    // get data from folder by locale
    //let path = `assets/i18n/${localeCode}.json`;
    //const localizedDataFile = require(path);
    const languages = {
      enUS: require('./data/i18n/enUS.json'),
      esES: require('./data/i18n/esES.json'),
      zhCN: require('./data/i18n/zhCN.json')
    };
    const localeData = languages[localeCode];
    return localeData;
  };

  return {
    getSupportedLocales,
    setUserLocale,
    getUserLocale,
    getCurrentLocale,
    getLocalizedTextSet
  };
};

export default LocalizationService;
