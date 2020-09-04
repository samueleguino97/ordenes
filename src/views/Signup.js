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
import ImagePicker from 'react-native-image-picker';
import {Image} from 'react-native-elements';

export default function Signup() {
  const {register} = useAuth();
  const navigation = useNavigation();

  const [clientType, setClientType] = useState('Client');
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState();

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
    signupForm.image = image;
    const user = await register(signupForm);
    if (user.errors) {
      setErrors(Object.entries(user.errors));
      return;
    }

    if (user.user_role === 'Employed') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Pedidos'}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Empresas'}],
        }),
      );
    }
  }
  function updateImage() {
    ImagePicker.launchImageLibrary(
      {
        title: 'Selecciona tu foto de perfil',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          setImage(response.data);
        }
      },
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerInputs}>
          <TouchableOpacity onPress={updateImage}>
            <View
              style={{
                width: '100%',
                height: 100,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: 'grey',
                }}>
                <Image
                  source={{uri: 'data:image/jpeg;base64,' + image}}
                  style={{width: 100, height: 100}}
                  resizeMode="cover"
                />
              </View>
            </View>
          </TouchableOpacity>
          {errors?.map(
            error =>
              !console.log(error) && (
                <Text style={styles.error}>{error[1][0]}</Text>
              ),
          )}
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
          <View style={styles.textInput}>
            <TextInput
              onChangeText={setField('address')}
              placeholder="Direccion"
              style={{width: '100%'}}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              keyboardType="numeric"
              onChangeText={setField('phone')}
              placeholder="Telefono Fijo"
              style={{width: '100%'}}
              maxLength={8}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              keyboardType="numeric"
              onChangeText={setField('mobile')}
              placeholder="Telefono Celular"
              style={{width: '100%'}}
              maxLength={8}
            />
          </View>
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
  error: {color: 'red'},
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
