import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../context/auth';

const Profile = () => {
  const {user, logout} = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTextInputs}>
        <View>
          <TextInput
            defaultValue={user.username}
            placeholder="Nombre"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            defaultValue={user.email}
            placeholder="Email"
            style={styles.textInput}
          />
        </View>
        <View>
          <TextInput
            defaultValue={user.mobile}
            placeholder="Numero de celular"
            style={styles.textInput}
          />
        </View>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity>
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
    </SafeAreaView>
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
