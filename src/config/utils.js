import Geolocation from '@react-native-community/geolocation';

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(info => {
      resolve([info.coords.longitude, info.coords.latitude]);
    });
  });
}
