import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useAuth} from '../context/auth';
import useFormState from '../hooks/useFormState';
import backend from '../config/backend';
import {useNavigation, CommonActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import {Image} from 'react-native-elements';
import ChangePassword from './ChangePassword';
import Modal from 'react-native-modal';
const Profile = () => {
  const {user, logout} = useAuth();
  const [profileForm, setProfileField] = useFormState(user);
  const [imageToUpload, setImageToUpload] = useState();
  const {dispatch, navigate} = useNavigation();

  const [modalIsOpen, setModalIsOpen] = useState(false);

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

          setProfileField('image')(response.uri);
          setImageToUpload(response.data);
        }
      },
    );
  }
  async function updateUser() {
    const result = await backend.request('edit_client', 'POST', {
      username: profileForm.username,
      first_name: profileForm.first_name,
      last_name: profileForm.last_name,
      email: profileForm.email,
      dni: 1,
      image: imageToUpload ? imageToUpload : profileForm.image,
    });
    ToastAndroid.show('Se han actualizado tus datos', ToastAndroid.LONG);
  }
  async function resetPass() {
    const result = await backend.request('recovery_password', 'POST');
    ToastAndroid.show(
      'Se te ha enviado un correo con tu nueva contraseña',
      ToastAndroid.LONG,
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTextInputs}>
        <TouchableOpacity onPress={updateImage}>
          <View
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: profileForm.image}}
              style={{height: 80, width: 80}}
            />
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() => setModalIsOpen(true)}
          style={styles.changePasswordButton}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Cambiar Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('PedidosUsuario')}
          style={styles.changePasswordButton}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Ver Pedidos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text
              style={styles.textButton}
              onPress={async () => {
                await logout();
                dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  }),
                );
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        onBackButtonPress={() => setModalIsOpen(false)}
        isVisible={modalIsOpen}>
        <ChangePassword onClose={() => setModalIsOpen(false)} />
      </Modal>
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
