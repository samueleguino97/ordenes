import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import useAuthState from '../hooks/useAuthState';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useAuth} from '../context/auth';

const Loader = () => {
  const [finished, isLoggedIn, user] = useAuthState();
  useAuth();
  const {dispatch} = useNavigation();
  useEffect(() => {
    if (finished && isLoggedIn && user) {
      if (user.user_role === 'Employed') {
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Pedidos'}],
          }),
        );
      } else {
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Empresas'}],
          }),
        );
      }
    } else if (finished && !isLoggedIn) {
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }
    //eslint-disable-next-line
  }, [finished, isLoggedIn, user]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
