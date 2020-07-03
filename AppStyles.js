import { Dimensions } from 'react-native';
export const primaryThemeDark = '#2cd18a';
const { width, height } = Dimensions.get('window');
export const SCREEN_WIDTH = width < height ? width : height;
