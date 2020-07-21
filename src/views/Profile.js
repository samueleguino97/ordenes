import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAuth} from '../context/auth';
import useFormState from '../hooks/useFormState';
import backend from '../config/backend';

const Profile = () => {
  const {user, logout} = useAuth();
  console.log(user);
  const [profileForm, setProfileField] = useFormState(user);

  async function updateUser() {
    const result = await backend.request('edit_client', 'POST', {
      username: profileForm.username,
      first_name: profileForm.first_name,
      last_name: profileForm.last_name,
      email: profileForm.email,
      dni: 123456789,
    });
    console.log(result);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTextInputs}>
        <View>
          <TextInput
            value={profileForm.first_name}
            onChangeText={setProfileField('first_name')}
            placeholder="Nombre"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            value={profileForm.last_name}
            onChangeText={setProfileField('last_name')}
            placeholder="Apellido"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            value={profileForm.username}
            onChangeText={setProfileField('username')}
            placeholder="Nombre de Usuario"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            value={profileForm.email}
            onChangeText={setProfileField('email')}
            placeholder="Correo"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            value={profileForm.phone}
            onChangeText={setProfileField('phone')}
            placeholder="Numero de Telefono"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            value={profileForm.mobile}
            onChangeText={setProfileField('mobile')}
            placeholder="Numero de Celular"
            style={styles.textInput}
          />
        </View>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity onPress={updateUser}>
          <View style={styles.updateButton}>
            <Text style={styles.textButton}>ACTUALIZAR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changePasswordButton}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Cambiar Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.textButton} onPress={logout}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  textInput: {
    marginVertical: 10,
    marginLeft: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: '95%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  containerButtons: {
    marginTop: 20,
  },
  updateButton: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#CDCACA',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  changePasswordButton: {
    marginBottom: 20,
  },
});
