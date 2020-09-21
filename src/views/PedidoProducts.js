import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useEmpresas} from '../context/empresas';
import backend from '../config/backend';

const PedidoProducts = () => {
  const {params} = useRoute();

  const detalle = params.orderDetail;
  const [empresas] = useEmpresas();
  let realEmpresas = empresas.filter(item =>
    item.products?.some(prod =>
      detalle.map(deta => deta.product_id).includes(prod.id),
    ),
  );

  realEmpresas = realEmpresas.map(item => ({
    ...item,
    products: item.products.filter(prod =>
      detalle.map(deta => deta.product_id).includes(prod.id),
    ),
  }));
  return (
    <View>
      {!!params.pleasure &&
        detalle.map(prod => {
          return <Text>{prod.description}</Text>;
        })}

      {!params.pleasure &&
        realEmpresas?.map(empresa => {
          return (
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {empresa.name}
              </Text>
              <View>
                {empresa.products.map(prod => {
                  return (
                    <View style={styles.item}>
                      <Image
                        source={{uri: backend.getProductImageURI(prod.image)}}
                        style={styles.image}
                      />
                      <View>
                        <Text>{prod.name}</Text>
                        <Text>{prod.description} Bs/c</Text>
                        <Text>
                          Cantidad:{' '}
                          {
                            detalle.find(item => item.product_id === prod.id)
                              ?.quantity
                          }
                        </Text>
                        <Text>
                          Total:{' '}
                          {detalle.find(item => item.product_id === prod.id)
                            ?.quantity * prod.price}{' '}
                          Bs
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default PedidoProducts;

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: '100%',
    backgroundColor: 'gray',
    borderRadius: 12,
    marginRight: 12,
  },
});
