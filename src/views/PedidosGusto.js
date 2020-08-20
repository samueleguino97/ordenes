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
import {getPreciseDistance} from 'geolib';
import useFormState from '../hooks/useFormState';

const PedidosGusto = ({navigation}) => {
  const {user} = useAuth();
  const {params} = useRoute();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [vehicle, setVehicle] = useState(3);
  const [confirmForm, setConfirmField] = useFormState();

  const [startingLocation, setStartingLocation] = useState(null);
  const [PedidosLocation, setPedidosLocation] = useState(null);

  function distance(coordsStart, coordsEnd) {
    const result = getPreciseDistance(
      {latitude: coordsStart[1], longitude: coordsStart[0]},
      {latitude: coordsEnd[1], longitude: coordsEnd[1]},
    );
    return result;
  }

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
    await post('set_pleasure', {
      title: confirmForm.title,
      total: cart.getTotal(),
      lng1: startingLocation[0],
      lat1: startingLocation[1],
      lng2: PedidosLocation[0],
      lat2: PedidosLocation[1],
      distance: distance(startingLocation, PedidosLocation) / 1000,
      mobility_id: vehicle,
      description: confirmForm.description,
      address: confirmForm.address,
      celular_from: confirmForm.celular_from,
      celular_to: confirmForm.celular_to,
    });
    setModalIsOpen(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Titulo"
            style={styles.textInputSmall}
            value={confirmForm.title}
            onChangeText={setConfirmField('title')}
          />
        </View>
      </View>
      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Descripcion"
            multiline={true}
            style={styles.textInput}
            value={confirmForm.description}
            onChangeText={setConfirmField('description')}
          />
        </View>
      </View>
      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Su Telefono"
            style={styles.textInputSmall}
            keyboardType="numeric"
            value={confirmForm.celular_to}
            onChangeText={setConfirmField('celular_to')}
          />
        </View>
      </View>
      <View style={styles.containerTextInput}>
        <View>
          <TextInput
            placeholder="Telefono del Lugar"
            style={styles.textInputSmall}
            keyboardType="numeric"
            value={confirmForm.celular_from}
            onChangeText={setConfirmField('celular_from')}
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
        <TouchableOpacity onPress={() => setVehicle(vehicle === 3 ? 1 : 3)}>
          <View style={{alignItems: 'center'}}>
            <RadioButton selected={vehicle === 1} />
            <Text style={styles.movilOptions}>Automovil</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerDetails}>
        <View style={styles.containerTotalPrice}>
          <View style={styles.priceItem}>
            <Text>TOTAL PEDIDO:</Text>
            <Text style={styles.price}> Bs {+cart.getTotal().toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.containerTotalPrice}>
          <View style={styles.priceItem}>
            <Text>Costo Distancia:</Text>
            <Text style={styles.price}>
              {' '}
              Bs{' '}
              {!!startingLocation && !!PedidosLocation
                ? (
                    distance(startingLocation, PedidosLocation) /
                    1000 /
                    100
                  ).toFixed(2)
                : 'Inserte ubicaciones'}
            </Text>
          </View>
        </View>

        <View style={styles.containerTotalPrice}>
          <View style={styles.priceItem}>
            <Text>TOTAL:</Text>
            <Text style={styles.price}> Bs {+cart.getTotal().toFixed(2)}</Text>
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
  textInputSmall: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    height: 50,
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
