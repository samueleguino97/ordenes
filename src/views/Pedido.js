import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Map from '../components/Map';
import {useRoute} from '@react-navigation/native';
import useBackendRequests from '../hooks/useBackend';

function Pedido() {
  const {params} = useRoute();

  const {post} = useBackendRequests();

  const orden = params?.pedido;

  const [currentOrder, setCurrentOrder] = useState(params?.pedido || {});

  useEffect(() => {
    post('get_order', {order_id: orden.id}).then(result => {
      setCurrentOrder(result[0]);
    });
  }, []);

  function handleTake() {
    post('change_state', {status: 'en camino', order_id: orden.id});
  }
  console.log(currentOrder.longitude);
  return (
    <View>
      <View style={styles.infoContainer}>
        <Text style={styles.lightText}>
          Nombre:
          <Text style={styles.boldText}>
            {' '}
            {currentOrder?.user_id?.username}
          </Text>
        </Text>
        <Text style={styles.lightText}>
          Email:
          <Text style={styles.boldText}>{currentOrder?.user_id?.email}</Text>
        </Text>
      </View>
      <View style={styles.total}>
        <Text>TOTAL PEDIDO:</Text>
        <Text>Bs. {orden.total}</Text>
      </View>
      <View style={styles.map}>
        {!!currentOrder.longitude && (
          <Map
            startLocation={[
              parseFloat(currentOrder.longitude),
              parseFloat(currentOrder.latitude),
            ]}
            fullDestination
          />
        )}
      </View>
      <View style={styles.total}>
        <Text>TOTAL:</Text>
        <Text>Bs. {orden.total}</Text>
      </View>
      <TouchableOpacity onPress={handleTake}>
        <View style={styles.take}>
          <Text>Tomar Pedido</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Pedido;

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },

  lightText: {fontWeight: '400'},
  total: {
    height: 60,
    justifyContent: 'space-between',

    alignItems: 'center',
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  map: {
    height: 180,
    width: '100%',
    backgroundColor: 'gray',
  },
  take: {
    height: 60,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
});
