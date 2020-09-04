import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import useBackendRequests from '../hooks/useBackend';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import {useAuth} from '../context/auth';
import {useNavigation} from '@react-navigation/native';

const PedidosUsuario = () => {
  const {get} = useBackendRequests();
  const [ordenes, setOrdenes] = useState([]);
  const [pleasures, setPleasures] = useState([]);
  const {user} = useAuth();
  const {navigate} = useNavigation();

  useEffect(() => {
    refresh();
  }, []);
  function refresh() {
    get('get_orders').then(result => {
      setOrdenes(result);
    });
    get('get_pleasure').then(result => {
      setPleasures(result);
    });
  }
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {[...ordenes, ...pleasures]
          ?.filter(
            item => item.user_id?.id === user?.id || item.user_id === user?.id,
          )
          .map(item => {
            console.log(item);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate('FullMap', {
                    start: [
                      parseFloat(
                        item.longitude_start ? item.longitude_start : item.lng,
                      ),
                      parseFloat(
                        item.latitude_start ? item.latitude_start : item.lat,
                      ),
                    ],
                  })
                }>
                <View
                  style={{
                    margin: 8,
                    padding: 8,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    elevation: 8,
                  }}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.result1}>{item.mobility}</Text>
                    <Text style={styles.result1}>{item.address}</Text>
                    <Text style={styles.result1}>{item.state}</Text>
                  </View>
                  <View>
                    <Text>Bs. {parseFloat(item.total).toFixed(2)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default PedidosUsuario;

const styles = StyleSheet.create({});
