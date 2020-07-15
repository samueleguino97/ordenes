import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  SafeAreaView,
  ScrollView,
  CheckBox,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from '../context/auth';
import useFormState from '../hooks/useFormState';
import {useNavigation, CommonActions} from '@react-navigation/native';

export default function Signup() {
  const {register} = useAuth();
  const navigation = useNavigation();

  const [clientType, setClientType] = useState('Client');

  const [signupForm, setField] = useFormState({
    first_name: '',
    type_mobility: 1,
    type_dni: 1,
    last_name: '',
    email: '',
    password: '',
  });

  async function handleSignup() {
    signupForm.username = `${signupForm.first_name.trim()} ${signupForm.last_name.trim()}`;
    signupForm.user_role = clientType;
    await register(signupForm);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Empresas'}],
      }),
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerInputs}>
          <View style={styles.textInput}>
            <TextInput
              onChangeText={setField('first_name')}
              placeholder="Nombres"
              style={{width: '100%'}}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              onChangeText={setField('last_name')}
              placeholder="Apellidos"
              style={{width: '100%'}}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              onChangeText={setField('email')}
              style={{width: '100%'}}
              placeholder="Email"
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              secureTextEntry={true}
              onChangeText={setField('password')}
              placeholder="Password"
              style={{width: '100%'}}
            />
          </View>
        </View>

        <View>
          <CheckBox
            onChange={() =>
              setClientType(clientType === 'Client' ? 'Employed' : 'Client')
            }
            value={clientType === 'Employed'}
          />
          <Text>Taxista?</Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={handleSignup}>
            <View style={styles.button}>
              <Text style={styles.fontButton}>Crear cuenta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
    borderRadius: 10,
    borderWidth: 1,
  },
  containerButton: {
    marginTop: 20,
  },

  button: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#CDCACA',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  fontButton: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
