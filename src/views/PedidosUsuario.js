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
    get('get_orders').then(result => {
      setOrdenes(result);
    });
    get('get_pleasure').then(result => {
      setPleasures(result);
    });
  });
  return (
    <ScrollView>
      {[...ordenes, ...pleasures]
        ?.filter(
          item => item.user_id?.id === user?.id || item.user_id === user?.id,
        )
        .map(item => (
          <TouchableOpacity
            onPress={() =>
              navigate('FullMap', {
                start: [parseFloat(item?.lng), parseFloat(item?.lat)],
              })
            }>
            <View>
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
        ))}
    </ScrollView>
  );
};

export default PedidosUsuario;

const styles = StyleSheet.create({});
