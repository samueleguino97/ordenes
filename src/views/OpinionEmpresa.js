import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import useBackendRequests from '../hooks/useBackend';
import {AirbnbRating as Rating} from 'react-native-ratings';

const map = {
  Regular: 3,
  Mala: 2,
  'Muy Buena': 4,
  Excelente: 5,
};
const OpinionEmpresa = () => {
  const [opiniones, setOpiniones] = useState([]);
  const {get} = useBackendRequests();

  useEffect(() => {
    get('get_opinions').then(res => {
      setOpiniones(res || []);
    });
  }, []);
  return (
    <ScrollView>
      {opiniones?.map(opinion => {
        console.log(opinion.qualification);
        return (
          <View style={styles.producto}>
            <Text style={styles.title}>{opinion.title}</Text>
            <Text>{opinion.opinion_message}</Text>
            <Rating
              ratingCount={5}
              size={25}
              isDisabled
              defaultRating={map[opinion.qualification]}
              startingValue={map[opinion.qualification]}
              showRating={false}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default OpinionEmpresa;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  producto: {
    height: 100,
    width: '90%',
    borderRadius: 12,
    marginVertical: 14,
    padding: 12,
    marginHorizontal: 8,

    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  title: {
    fontWeight: 'bold',
  },
  productoImage: {
    height: 100,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 12,
    borderRadius: 12,
  },
});
