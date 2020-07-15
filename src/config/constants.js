import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Percentage {
  width(percent = '100%') {}
  height(percent = '100%') {}
}

export const ScreenPercentage = new Percentage();
