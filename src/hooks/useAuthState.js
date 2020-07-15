import {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

export default function useAuthState() {
  const [finishedFetching, setFinishedFetching] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('access_token').then(token => {
      setIsLoggedIn(!!token);
      setFinishedFetching(true);
    });
  }, []);

  return [finishedFetching, isLoggedIn];
}
