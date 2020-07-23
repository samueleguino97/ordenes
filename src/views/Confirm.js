import React, {useState, useEffect} from 'react';
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
import cart from '../config/cart';
import RadioButton from '../components/RadioButton';
import Map from '../components/Map';
import useBackendRequests from '../hooks/useBackend';
import {useRoute} from '@react-navigation/native';
import {getUserLocation} from '../config/utils';
import Modal from 'react-native-modal';
import Success from './Success';
import useFormState from '../hooks/useFormState';

const Confirm = ({navigation}) => {
  const {user} = useAuth();
  const {params} = useRoute();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [vehicle, setVehicle] = useState(3);
  const [confirmForm, setConfirmField] = useFormState();

  const [startingLocation, setStartingLocation] = useState(null);

  useEffect(() => {
    async function getLocation() {
      if (params) {
        setStartingLocation(params.location);
      } else {
        setStartingLocation(await getUserLocation());
      }
    }
    getLocation();
  }, [params]);

  const {post} = useBackendRequests();

  async function handleOrder() {
    await post('set_order', {
      total: cart.getTotal(),
      lng: startingLocation[0],
      lat: startingLocation[1],
      address: confirmForm.address,
      title: confirmForm.title,
      mobility_id: vehicle,
      description: confirmForm.description,
      products_name: (await cart.getItems()).map(item => item.name),
      products_quantity: (await cart.getItems()).map(item => item.quantity),
    });
    await cart.cleanCart();
    setModalIsOpen(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Titulo"
            multiline={true}
            style={styles.textInputSmall}
            onChangeText={setConfirmField('title')}
            value={confirmForm.title}
          />
        </View>
      </View>
      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Descripcion"
            multiline={true}
            style={styles.textInput}
            onChangeText={setConfirmField('description')}
            value={confirmForm.description}
          />
        </View>
      </View>

      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Direccion"
            multiline={true}
            style={styles.textInputSmall}
            onChangeText={setConfirmField('address')}
            value={confirmForm.address}
          />
        </View>
      </View>
      <View style={styles.containerMap}>
        <Map startLocation={startingLocation} mutable />
      </View>
      <View style={styles.containerMovilOptions}>
        <TouchableOpacity onPress={() => setVehicle(vehicle === 3 ? 1 : 3)}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton selected={vehicle === 1} />
            <View>
              <Text style={styles.movilOptions}>Automovil</Text>
              <Text style={styles.movilOptions}>
                Elija en caso de que su pedido sea grande o delicado{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerDetails}>
        <View style={styles.containerTotalPrice}>
          <View style={styles.priceItem}>
            <Text>TOTAL PEDIDO:</Text>
            <Text style={styles.price}> Bs {cart.getTotal()}</Text>
          </View>
        </View>
        <View style={styles.containerTotalPrice}>
          <View style={styles.priceItem}>
            <Text>TOTAL:</Text>
            <Text style={styles.price}> Bs {cart.getTotal()}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleOrder}>
        <View style={styles.containerButton}>
          <Text>ORDENAR</Text>
        </View>
      </TouchableOpacity>
      <Modal isVisible={modalIsOpen}>
        <Success onClose={() => setModalIsOpen(false)} />
      </Modal>
    </ScrollView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  textInput: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    height: 120,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },

  textInputSmall: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    height: 45,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },

  containerMap: {
    marginTop: 20,
    height: 200,
    width: '100%',
    backgroundColor: 'gray',
  },

  containerMovilOptions: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerSendingPrice: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  movilOptions: {
    marginHorizontal: 25,
  },

  containerTotalPrice: {
    flexDirection: 'row',
  },

  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderStyle: 'solid',
    height: 50,
    width: '100%',
  },

  containerButton: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 10,
  },
});
