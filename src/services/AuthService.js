import StorageService from 'src/services/StorageService';

const AuthService = () => {
  const storageService = StorageService;

  const userHasSignedIn = () => {
    let signedInVal = storageService.getItem('usersignedin');
    if (signedInVal) {
      return signedInVal === 'true';
    }
    return false;
  };

  const setUserHasSignedIn = (signedInVal) => {
    storageService.setItem('usersignedin', Boolean(signedInVal));
  };

  const signIn = () => {
    setUserHasSignedIn(true);
  };

  const signOut = () => {
    setUserHasSignedIn(false);
  };

  return {
    userHasSignedIn,
    setUserHasSignedIn,
    signIn,
    signOut
  };
};

export default AuthService;
