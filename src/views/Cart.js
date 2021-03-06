import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import cart from '../config/cart';
import {useNavigation} from '@react-navigation/native';
import backend from '../config/backend';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const {navigate} = useNavigation();

  useEffect(() => {
    cart.getItems().then(items => {
      setCartItems(items);
    });
  }, []);

  function handleClean() {
    cart.cleanCart();
    setCartItems([]);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        {cartItems?.map(item => (
          <View style={styles.item}>
            <Image
              source={{uri: backend.getProductImageURI(item.image)}}
              style={styles.image}
            />
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.price * item.quantity}</Text>
            </View>
          </View>
        ))}
        {!cartItems.length && (
          <Text>No tienes ningun producto en tu carrito</Text>
        )}
      </ScrollView>
      <View style={styles.totalCart}>
        <Text>TOTAL: {cart.getTotal()}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigate('Confirmar')}>
          <View style={{...styles.button, marginTop: 15}}>
            <Text>Continuar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClean}>
          <View style={{...styles.button, marginTop: 15}}>
            <Text>Limpiar Carrito</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  image: {
    width: 100,
    height: '100%',
    backgroundColor: 'gray',
    borderRadius: 12,
    marginRight: 12,
  },
  container: {
    paddingHorizontal: 24,
  },
  totalCart: {
    fontWeight: 'bold',
    alignItems: 'center',
  },
  actions: {
    height: 150,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});
