import React from 'react';

const AppContext = React.createContext({
  userHasSignedIn: false
});

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
