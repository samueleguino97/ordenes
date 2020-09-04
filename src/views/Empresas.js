import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import useBackendRequests from '../hooks/useBackend';
import {useNavigation} from '@react-navigation/native';
import {useEmpresas} from '../context/empresas';
import backend from '../config/backend';

export default function Empresas() {
  const [empresas, refresh] = useEmpresas();
  const {navigate} = useNavigation();

  useEffect(() => {
    console.log('huh');
    refresh();
  }, []);

  function navigateToBusinessDetail(empresa) {
    navigate('Empresa', empresa);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {empresas?.map(empresa => {
          return (
            <TouchableOpacity
              key={empresa.id}
              onPress={() => navigateToBusinessDetail(empresa)}>
              <View style={styles.item}>
                <View style={styles.itemImageContainer}>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={styles.itemImage}
                    source={{uri: backend.getImageURI(empresa.image)}}
                  />
                </View>
                <View>
                  <Text>{empresa.name}</Text>
                  <Text>
                    {empresa.type_company} - {empresa.type_category}
                  </Text>
                  <Text>
                    {empresa.phone} - {empresa.mobile}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity onPress={() => navigate('OpinionEmpresa')}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightgray',
          }}>
          <Text>Ver Opiniones</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('PedidosGusto')}>
        <View
          style={{
            height: 50,
            backgroundColor: 'lightgray',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Pedidos Gusto</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 120,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
  },
  itemImageContainer: {
    width: 100,
    backgroundColor: 'gray',
    height: '100%',
    marginRight: 16,
    borderRadius: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
