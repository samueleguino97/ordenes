import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useAuth} from '../context/auth';
import {useNavigation, CommonActions} from '@react-navigation/native';

function LogoutButton() {
  const {logout} = useAuth();
  const {dispatch} = useNavigation();

  async function handleLogout() {
    await logout();
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  }
  return (
    <TouchableOpacity onPress={handleLogout}>
      <View>
        <Text>Logout</Text>
      </View>
    </TouchableOpacity>
  );
}

export default LogoutButton;

const styles = StyleSheet.create({});
