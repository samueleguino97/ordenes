import {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

export default function useAuthState() {
  const [finishedFetching, setFinishedFetching] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('access_token').then(token => {
      setIsLoggedIn(!!token);
      setFinishedFetching(true);
    });
    AsyncStorage.getItem('user').then(token => {
      if (token) {
        setUser(JSON.parse(token));
      }
    });
  }, []);

  return [finishedFetching, isLoggedIn, user];
}
