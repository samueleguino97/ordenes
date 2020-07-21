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

const PedidosGusto = ({navigation}) => {
  const {user} = useAuth();
  const {params} = useRoute();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [vehicle, setVehicle] = useState(1);

  const [startingLocation, setStartingLocation] = useState(null);
  const [PedidosLocation, setPedidosLocation] = useState(null);

  useEffect(() => {
    async function getLocation() {
      if (params) {
        console.log(params.id);
        if (params.id === 'pedido') {
          setPedidosLocation(params.location);
        } else {
          setStartingLocation(params.location);
        }
      } else {
        setStartingLocation(await getUserLocation());
        setPedidosLocation(await getUserLocation());
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
      mobility_id: vehicle,
      description: 'detalle de la orden',
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
            placeholder="Descripcion"
            multiline={true}
            style={styles.textInput}
          />
        </View>
      </View>
      <Text>De donde recoger</Text>
      <View style={styles.containerMap}>
        <Map
          id="pedido"
          backTo="PedidosGusto"
          startLocation={PedidosLocation}
          mutable
        />
      </View>
      <Text>A donde llevar</Text>
      <View style={styles.containerMap}>
        <Map
          id="destino"
          backTo="PedidosGusto"
          startLocation={startingLocation}
          mutable
        />
      </View>
      <View style={styles.containerMovilOptions}>
        <TouchableOpacity onPress={() => setVehicle(vehicle === 1 ? 2 : 1)}>
          <View style={{alignItems: 'center'}}>
            <RadioButton selected={vehicle === 2} />
            <Text style={styles.movilOptions}>Automovil</Text>
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
            <Text style={styles.price}> Bs {cart.getTotal() + 15}</Text>
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

export default PedidosGusto;

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
