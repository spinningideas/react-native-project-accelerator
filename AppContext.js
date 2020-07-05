import React from 'react';

const AppContext = React.createContext({
  userHasSignedIn: false, localeCode: 'enUS'
});

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
