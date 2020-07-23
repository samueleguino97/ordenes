import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useEmpresas} from '../context/empresas';

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
  console.log(realEmpresas);
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
                {!params.pleasure &&
                  empresa.products.map(prod => {
                    return (
                      <Text>
                        {prod.name} {prod.price}Bs -{' '}
                        {
                          detalle.find(item => item.product_id === prod.id)
                            ?.quantity
                        }
                      </Text>
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

const styles = StyleSheet.create({});
