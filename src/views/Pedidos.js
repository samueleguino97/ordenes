import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAuth} from '../context/auth';
import useBackendRequests from '../hooks/useBackend';

function Pedidos({navigation}) {
  const [activeButton, setActiveButton] = useState(0);
  const {get} = useBackendRequests();

  const [ordenes, setOrdenes] = useState([]);

  const {user} = useAuth();
  useEffect(() => {
    get('get_orders').then(result => {
      setOrdenes(result);
    });
  }, []);

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
        <ScrollView contentContainerStyle={styles.containerResults}>
          {ordenes
            ?.filter(orden => orden.state === 'En espera')
            .map((orden, index) => (
              <TouchableOpacity
                key={orden.id}
                onPress={() => navigation.navigate('Pedido', {pedido: orden})}>
                <View
                  style={{
                    ...styles.itemResult,
                    backgroundColor:
                      index % 2 === 0 ? 'transparent' : 'lightgray',
                  }}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.result1}>{orden.mobility}</Text>
                    <Text style={styles.result1}>Av. Cala Cala #45</Text>
                  </View>
                  <View>
                    <Text>Bs. {orden.total}</Text>
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
    width: 180,
    justifyContent: 'space-between',
  },

  containerResults: {},
});
