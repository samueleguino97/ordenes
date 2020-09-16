import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useEmpresas} from '../context/empresas';
import backend from '../config/backend';

const Empresa = () => {
  const {params: empresa} = useRoute();
  const [empresas] = useEmpresas();
  const {navigate} = useNavigation();
  let productos = [];

  if (empresa) {
    productos = empresa.products;
  } else {
    productos = empresas[0].products;
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        {empresa?.products?.map(producto => {
          return (
            <TouchableOpacity onPress={() => navigate('Producto', producto)}>
              <View style={styles.producto}>
                <Text style={styles.title}>{producto.name}</Text>
                <Image
                  source={{uri: backend.getProductImageURI(producto.image)}}
                  style={styles.productoImage}
                />
                <Text>{parseFloat(producto.price).toFixed(2)} Bs.</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        onPress={() =>
          navigate('FullMap', {
            start: [parseFloat(empresa?.lng), parseFloat(empresa?.lat)],
          })
        }>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightgray',
          }}>
          <Text>Ver Ubicacion</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Empresa;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  producto: {
    height: 200,
    width: 150,
    borderRadius: 12,
    marginVertical: 14,
    padding: 12,

    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
    alignItems: 'center',
  },
  title: {},
  productoImage: {
    height: 100,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 12,
    borderRadius: 12,
  },
});
