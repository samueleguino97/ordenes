import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useAuth} from '../context/auth';
import useBackendRequests from '../hooks/useBackend';

function Pedidos({navigation}) {
  const [activeButton, setActiveButton] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const {get} = useBackendRequests();

  const [ordenes, setOrdenes] = useState([]);
  const [pleasures, setPleasures] = useState([]);

  const {user} = useAuth();
  useEffect(() => {
    get('get_orders').then(result => {
      setOrdenes(result);
    });
    get('get_pleasure').then(result => {
      setPleasures(result);
    });
  }, []);
  function filterOrdenes() {
    if (activeButton === 3) {
      return pleasures.map(pleasure => ({...pleasure, pleasure: true}));
    }

    return ordenes.filter(item =>
      activeButton === 0
        ? true
        : (item.mobility === 'Auto' && activeButton === 1) ||
          ((item.mobility === 'Moto' || item.mobility === 'Bicicleta') &&
            activeButton === 2),
    );
  }

  function onRefresh() {
    setRefreshing(true);
    get('get_orders').then(result => {
      setOrdenes(result);
      setRefreshing(false);
    });
    get('get_pleasure').then(result => {
      setPleasures(result);
      setRefreshing(false);
    });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerButtons}>
          <TouchableOpacity onPress={() => setActiveButton(0)}>
            <View
              style={{
                ...styles.button,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: activeButton === 0 ? 'gray' : 'lightgray',
              }}>
              <Text style={activeButton === 0 ? styles.textButton : {}}>
                Todos
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveButton(1)}>
            <View
              style={{
                ...styles.button,
                borderRadius: 0,
                backgroundColor: activeButton === 1 ? 'gray' : 'lightgray',
              }}>
              <Text style={activeButton === 1 ? styles.textButton : {}}>
                Auto
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveButton(2)}>
            <View
              style={{
                ...styles.button,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: activeButton === 2 ? 'gray' : 'lightgray',
              }}>
              <Text style={activeButton === 2 ? styles.textButton : {}}>
                Moto
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setActiveButton(3)}>
          <View
            style={{
              ...styles.button,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: activeButton === 3 ? 'gray' : 'lightgray',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text style={activeButton === 3 ? styles.textButton : {}}>
              Pedidos Gusto
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.containerResults}>
          {filterOrdenes()?.map((orden, index) => (
            <TouchableOpacity
              key={orden.id}
              disabled={
                orden.state === 'enviado' ||
                orden.state === 'rechazado' ||
                orden.state === 'en camino'
              }
              onPress={() => navigation.navigate('Pedido', {pedido: orden})}>
              <View
                style={{
                  ...styles.itemResult,
                  backgroundColor:
                    index % 2 === 0 ? 'transparent' : 'lightgray',
                }}>
                <View style={styles.itemInfo}>
                  <Text style={styles.result1}>{orden.mobility}</Text>
                  <Text style={styles.result1}>{orden.address}</Text>
                  <Text style={styles.result1}>{orden.state}</Text>
                </View>
                <View>
                  <Text>Bs. {parseFloat(orden.total).toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Pedidos;

const styles = StyleSheet.create({
  container: {},
  result1: {
    flex: 1,
  },

  containerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    backgroundColor: 'lightgray',
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRadius: 10,
  },

  textButton: {
    color: '#fff',
  },
  itemResult: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 24,
  },
  itemInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },

  containerResults: {},
});
