import { NativeModules, Platform } from 'react-native';

const RCTToast = Platform.select({
  ios: NativeModules.LRDRCTSimpleToast,
  android: require('react-native').ToastAndroid
});

// duration constants
export const SHORT = RCTToast.SHORT;
export const LONG = RCTToast.LONG;

// gravity constants
export const TOP = RCTToast.TOP;
export const BOTTOM = RCTToast.BOTTOM;
export const CENTER = RCTToast.CENTER;

// Presents light weight "toast" style messages
const Notification = () => {
  const show = (message, duration, gravity) => {
    RCTToast.show(
      message,
      duration === undefined ? RCTToast.SHORT : duration,
      gravity === undefined ? RCTToast.TOP : gravity
    );
  };
  return {
    show
  };
};

export default Notification;
