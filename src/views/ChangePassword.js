import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import backend from '../config/backend';

const Success = ({onClose = () => {}}) => {
  const {dispatch} = useNavigation();

  const [new_password, setNewPass] = useState();
  async function resetPass() {
    const result = await backend.request('update_password', 'POST', {
      new_password,
    });
    if (result.errors) {
      console.log(result.errors);
    }
    ToastAndroid.show('Se ha actualizado contraseña', ToastAndroid.LONG);
    onClose();
  }

  return (
    <View style={styles.container}>
      <Text>Nueva Contraseña</Text>
      <TextInput
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          borderStyle: 'solid',
          width: '100%',
        }}
        secureTextEntry
        onChangeText={setNewPass}
      />
      <Button
        onPress={resetPass}
        title="Cambiar Contraseña"
        buttonStyle={{marginTop: 16}}
      />
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
  },
  containerButton: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  transparentButton: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderStyle: 'solid',
    borderRadius: 10,
  },
});
