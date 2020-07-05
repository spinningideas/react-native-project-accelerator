import { Dimensions } from 'react-native';
export const primaryThemeDark = '#1976d2';
const { width, height } = Dimensions.get('window');
export const SCREEN_WIDTH = width < height ? width : height;
// https://react-native-elements.github.io/react-native-elements/docs/customization.html#the-theme-object
// https://www.materialpalette.com/colors
// https://material.io/resources/color/#!/?view.left=0&view.right=0
// color pallette builder: https://material-ui.com/customization/color/
export const theme = {
  colors: {
    primary: primaryThemeDark,
    secondary: '#616161',
    background: '#ffffff',
    text: '#212121',
		border: '#212121',
		success:'#388e3c',
		warning: '#d32f2f'
  },
  Card: {
    margin: 0,
    containerStyle: { margin: 0 }
  },
  Button: {
    raised: false
  },
  Icon: {
    color: '#616161'
  }
};
