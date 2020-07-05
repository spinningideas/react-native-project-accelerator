import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
import LocalizationService from 'src/services/LocalizationService';

const styles = StyleSheet.create({
  languageContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  languageIcon: {
    height: 25,
    width: 25,
    color: '#616161'
  },
  languageText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
  }
});

const LanguageDialog = (props) => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState('enUS');
  const localizationService = LocalizationService();

  useEffect(() => {
    async function loadLocaleCode() {
      let localeCode = await localizationService.getUserLocale();
      setSelectedLanguageCode(localeCode);
    }
    loadLocaleCode();
  }, [selectedLanguageCode]);

  const onSelectLanguage = async (item) => {
    setSelectedLanguageCode(item.localeCode);
    await localizationService.setUserLocale(item.localeCode);
    props.onDialogClose();
    props.onLanguageSelection(item.localeCode);
  };

  const getIconName = (lang) => {
    let iconName = 'radio-button-unchecked';
    if (lang.localeCode == selectedLanguageCode) {
      iconName = 'radio-button-checked';
    }
    return iconName;
  };

  const LanguagesListItems = () => {
    const supportedLanguages = localizationService.getSupportedLocales();
    return supportedLanguages.map((lang) => {
      return (
        <View style={styles.languageContainer} key={lang.localeCode}>
          <Icon style={styles.languageIcon} name={getIconName(lang)} onPress={() => onSelectLanguage(lang)} />
          <Text style={styles.languageText} onPress={() => onSelectLanguage(lang)}>
            {lang.text}
          </Text>
        </View>
      );
    });
  };

  const LanguagesList = (props) => {
    if (props.open) {
      return <LanguagesListItems />;
    } else {
      return <View></View>;
    }
  };

  return (
    <Overlay
      isVisible={props.open}
      windowBackgroundColor='#ffffff'
      overlayBackgroundColor='#ffffff'
      width='auto'
      height='200'
      onBackdropPress={props.onDialogClose}
    >
      <LanguagesList open={props.open} />
    </Overlay>
  );
};

export default LanguageDialog;
