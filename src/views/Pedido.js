import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Map from '../components/Map';
import {useRoute, useNavigation} from '@react-navigation/native';
import useBackendRequests from '../hooks/useBackend';

function Pedido() {
  const {params} = useRoute();
  const {navigate} = useNavigation();

  const {post} = useBackendRequests();
  const [pleasureOrder, setPleasureOrder] = useState();

  const orden = params?.pedido;

  const [currentOrder, setCurrentOrder] = useState(params?.pedido || {});

  useEffect(() => {
    post('get_order', {order_id: orden.id}).then(result => {
      setCurrentOrder(result[0]);
    });

    if (!!orden.pleasure) {
      setPleasureOrder(orden);
    }
  }, [orden.id]);

  function handleTake() {
    post('change_state', {
      status: 'en proceso',
      order_id: currentOrder.id,
    }).then(() => {
      setCurrentOrder({...currentOrder, state: 'en proceso'});
    });
  }
  console.log(currentOrder);
  return (
    <ScrollView>
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
        <Text style={styles.lightText}>
          Telefono:
          <Text style={styles.boldText}>{currentOrder?.user_id?.phone}</Text>
        </Text>
        <Text style={styles.lightText}>
          Celular:
          <Text style={styles.boldText}>{currentOrder?.user_id?.mobile}</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigate('PedidoProducts', {
            orderDetail: currentOrder.order_detail,
            pleasure: !!pleasureOrder,
          })
        }>
        <View style={styles.total}>
          <Text>TOTAL PEDIDO:</Text>
          <Text>Bs. {orden.total.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      {!!pleasureOrder?.longitude_start && (
        <>
          <Text>Recoger de</Text>
          <View style={styles.map}>
            <Map
              startLocation={[
                parseFloat(pleasureOrder.longitude_start),
                parseFloat(pleasureOrder.latitude_start),
              ]}
              fullDestination
            />
          </View>
          <Text>Llevar a</Text>
          <View style={styles.map}>
            <Map
              startLocation={[
                parseFloat(pleasureOrder.longitude_end),
                parseFloat(pleasureOrder.latitude_end),
              ]}
              fullDestination
            />
          </View>
        </>
      )}
      {!!currentOrder.longitude && !pleasureOrder && (
        <View style={styles.map}>
          <Map
            startLocation={[
              parseFloat(currentOrder.longitude),
              parseFloat(currentOrder.latitude),
            ]}
            fullDestination
          />
        </View>
      )}
      <View style={styles.total}>
        <Text>TOTAL:</Text>
        <Text>Bs. {orden.total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={handleTake}>
        <View style={styles.take}>
          <Text>Tomar Pedido</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
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
