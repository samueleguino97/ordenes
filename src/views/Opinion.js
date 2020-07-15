import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AirbnbRating as Rating} from 'react-native-ratings';
import useBackendRequests from '../hooks/useBackend';
import {useAuth} from '../context/auth';
import useFormState from '../hooks/useFormState';
import {CommonActions} from '@react-navigation/native';

const Opinion = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const {post} = useBackendRequests();
  const {user} = useAuth();
  const [formState, setField] = useFormState(user || {});

  async function handleSendOpinion() {
    await post('set_opinion', {
      title: formState.username,
      opinion_message: formState.opinion,
      qualification: rating,
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Empresas'}],
      }),
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerTextInputName}>
          <TextInput
            onChangeText={setField('username')}
            value={formState?.username}
            placeholder="Nombre"
            style={styles.textInputName}
          />
        </View>
        <View style={styles.containerRate}>
          <Text>Calificar</Text>
          <View style={styles.ratingContainer}>
            <Rating
              onFinishRating={setRating}
              ratingCount={5}
              size={25}
              defaultRating={0}
              startingValue={rating}
              showRating={false}
            />
          </View>
        </View>
        <View style={styles.containerTextInputOpinion}>
          <Text>Opinion</Text>
          <TextInput
            onChangeText={setField('opinion')}
            value={formState?.opinion}
            multiline
            numberOfLines={10}
            style={styles.textInputOpinion}
          />
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity onPress={handleSendOpinion}>
            <View style={styles.sendButton}>
              <Text style={styles.textButton}>Enviar opinion</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.cancelButton}>
              <Text style={styles.textButton}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Opinion;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  containerTextInputName: {},

  textInputName: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },

  containerRate: {
    marginVertical: 20,
    marginTop: 20,
    flexDirection: 'column',
    width: '100%',
  },

  containerTextInputOpinion: {},

  textInputOpinion: {
    marginVertical: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    textAlignVertical: 'top',
  },

  containerButtons: {
    marginVertical: 15,
  },

  sendButton: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    width: '100%',
  },

  cancelButton: {
    marginVertical: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 60,
    width: '100%',
  },

  textButton: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  ratingContainer: {
    alignItems: 'flex-start',
  },
});
