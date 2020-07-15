import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Success = ({onClose = () => {}}) => {
  const {dispatch} = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Su Orden se Realizo con exito</Text>
      <Text>Recibira un mensaje cuando este cerca.</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            onClose();
            dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Empresas'}],
              }),
            );
          }}>
          <View style={styles.containerButton}>
            <Text>Continuar Comprando</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Opinion'}],
              }),
            );
          }}>
          <View style={styles.transparentButton}>
            <Text>Dar Opinion</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
  },
  containerButton: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  transparentButton: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderStyle: 'solid',
    borderRadius: 10,
  },
});
