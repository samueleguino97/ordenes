import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProfileButton = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        <View>
          <Text>Perfil</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Cart')}>
        <View>
          <Text>Carrito</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
    width: 120,
  },
});
