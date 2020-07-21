import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import backend from '../config/backend';
import {useRoute} from '@react-navigation/native';
import cart from '../config/cart';
import {useEmpresas} from '../context/empresas';

const Product = ({navigation: {navigate}}) => {
  const {params: product} = useRoute();
  const [quantity, setQuantity] = useState(1);
  const [empresas] = useEmpresas();
  const empresa = empresas.filter(item => item.id === product.company_id);

  function navigateToExtras() {}
  console.log(empresa);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: backend.getImageURI(product.image)}}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
          {product.name}
        </Text>
        <Text style={{textAlign: 'center'}}>{product.description}</Text>
      </View>
      <View style={styles.information}>
        <View style={styles.quantity}>
          <View>
            <Text>Cantidad</Text>
            <Text>{quantity}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setQuantity(before => before + 1)}>
              <Text>U</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setQuantity(before => (before > 0 ? before - 1 : before))
              }>
              <Text>D</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.total}>
          <Text>Total</Text>
          <Text>{product.price * quantity}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={async () => {
            await cart.setCartItem(product, quantity);
            navigate('Cart');
          }}>
          <View style={styles.add}>
            <Text>Agregar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  add: {
    height: 60,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  extras: {
    height: 60,
    width: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 80,
    alignItems: 'center',
    marginTop: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginBottom: 12,
  },
  image: {
    borderRadius: 10,
    width: 200,
    height: 200,
    backgroundColor: 'grey',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: 'gray',
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  total: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});
