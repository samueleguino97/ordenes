import React, {useState, useContext, useEffect} from 'react';
import useBackendRequests from '../hooks/useBackend';
import {AsyncStorage} from 'react-native';
import backend from '../config/backend';
import User from '../models/User';

const AuthContext = React.createContext({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
});

export function useAuth() {
  const authContext = useContext(AuthContext);
  const {login, logout, post} = useBackendRequests();

  useEffect(() => {
    async function checkLoginStatus() {
      const token = await AsyncStorage.getItem('user');
      if (token) {
        authContext.setUser(JSON.parse(token));
      }
    }
    checkLoginStatus();
  }, [authContext.isLoggedIn]);

  async function handleRegister(userData) {
    const userResult = await post('register', userData);
    const retrievedUser = new User(userResult);

    backend.setAccessToken(retrievedUser.access_token);
    await AsyncStorage.setItem('access_token', retrievedUser.access_token);
    await AsyncStorage.setItem('user', JSON.stringify(userResult));
    authContext.setUser(retrievedUser);
    return retrievedUser;
  }

  async function handleLogin(email, password) {
    const userResult = await login(email, password);

    const retrievedUser = new User(userResult);
    console.log(retrievedUser);
    backend.setAccessToken(retrievedUser.access_token);
    await AsyncStorage.setItem('access_token', retrievedUser.access_token);
    await AsyncStorage.setItem('user', JSON.stringify(userResult));
    authContext.setUser(retrievedUser);
    return userResult;
  }

  async function handleLogout() {
    console.log('LOGGIN OUT');
    await logout();
    await AsyncStorage.removeItem('access_token');
    authContext.setUser(null);
  }

  return {
    user: authContext.user,
    register: handleRegister,
    login: handleLogin,
    isLoggedIn: authContext.isLoggedIn,
    logout: handleLogout,
  };
}

function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{user, setUser, isLoggedIn: !!user}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
