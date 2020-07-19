import {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

export default function useAuthState() {
  const [finishedFetching, setFinishedFetching] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('access_token').then(token => {
      AsyncStorage.getItem('user').then(userToken => {
        if (userToken) {
          setUser(JSON.parse(userToken));
        }
        if (token) {
          setIsLoggedIn(!!token);
        }
        setFinishedFetching(true);
      });
    });
  }, []);

  return [finishedFetching, isLoggedIn, user];
}
