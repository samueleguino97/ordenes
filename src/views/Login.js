import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from '../context/auth';
import {CommonActions} from '@react-navigation/native';

export default function Login({navigation}) {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const {login} = useAuth();

  async function handleLogin() {
    try {
      await login(userCredentials.email, userCredentials.password);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Empresas'}],
        }),
      );
    } catch (e) {
      console.warn(e);
    }
  }

  function goToSignup() {
    navigation.navigate('Signup');
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.img}>
          <Image style={styles.image} />
        </View>
        <View style={styles.inputs}>
          <View style={styles.textInput}>
            <TextInput
              style={{width: '100%'}}
              onChangeText={text =>
                setUserCredentials({...userCredentials, email: text})
              }
              placeholder="Correo Electronico"
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              onChangeText={text =>
                setUserCredentials({...userCredentials, password: text})
              }
              placeholder="Password"
              secureTextEntry
              style={{width: '100%'}}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.button}>
              <Text style={styles.textLogin}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSignup}>
            <View style={styles.button}>
              <Text style={styles.fontAccount}>Crear cuenta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  img: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '100%',
  },
  image: {
    backgroundColor: 'grey',
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  inputs: {
    marginTop: 20,
  },
  textInput: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttons: {
    marginTop: 10,
  },
  button: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#CDCACA',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  fontAccount: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textLogin: {
    fontSize: 20,
  },
});
