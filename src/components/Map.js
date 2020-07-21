import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
function Map({
  navigation,
  startLocation,
  destinationLocation,
  mutable,
  fullDestination,
}) {
  let [userLocation, setUserLocation] = useState(null);
  let [destination, setDestination] = useState(null);
  let [deviceLocation, setDeviceLocation] = useState(null);
  const mapRef = useRef(null);
  let [loading, setLoading] = useState(true);

  const {navigate} = useNavigation();
  const {params} = useRoute();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(res => {
      if (res === 'granted') {
        Geolocation.getCurrentPosition(info => {
          setDeviceLocation([info.coords.longitude, info.coords.latitude]);
        });
        Geolocation.watchPosition(info => {
          setDeviceLocation([info.coords.longitude, info.coords.latitude]);
        });
        setLoading(false);
        // Geolocation.getCurrentPosition(info => console.log(info));
      }
    });
  }, []);

  useEffect(() => {
    if (startLocation) {
      setUserLocation(startLocation);
      setLoading(false);

      return;
    }
    if (params && params.start) {
      setUserLocation(params.start);
      setLoading(false);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(res => {
        if (res === 'granted') {
          Geolocation.getCurrentPosition(info => {
            setUserLocation([info.coords.longitude, info.coords.latitude]);
          });
          setLoading(false);
          // Geolocation.getCurrentPosition(info => console.log(info));
        }
      });
    }
  }, [params, startLocation]);

  useEffect(() => {
    if (destinationLocation) {
      setDestination(destinationLocation);
      return;
    }
    if (params) {
      setDestination(params.destination || null);
    }
    if (!destinationLocation && !params) {
      setDestination(null);
    }
  }, [params, destinationLocation]);

  // Action to center the map on user position
  //   const centeringButtonPress = () => {
  //     _camera.flyTo(userLocation, 1500);
  //     _camera.zoomTo(14);
  //   };

  // Update userposition on update location

  // Start Button
  const renderActions = () => (
    <TouchableOpacity
      style={styles.startRouteButton}
      onPress={() =>
        navigate('FullMap', {
          destination: fullDestination ? userLocation : destinationLocation,
          mutable: mutable,
          start: fullDestination ? deviceLocation : userLocation,
        })
      }
    />
  );

  if (!userLocation) {
    return null;
  }
  return (
    <>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          <MapView
            ref={e => (mapRef.current = e)}
            region={{
              latitude: userLocation[1],
              longitude: userLocation[0],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={({nativeEvent: {coordinate}}) =>
              setUserLocation([coordinate.longitude, coordinate.latitude])
            }
            style={styles.flex}>
            <Marker
              coordinate={{
                latitude: userLocation[1],
                longitude: userLocation[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            {destination && (
              <MapViewDirections
                origin={{
                  latitude: userLocation[1],
                  longitude: userLocation[0],
                }}
                destination={{
                  latitude: destination[1],
                  longitude: destination[0],
                }}
                strokeWidth={3}
                strokeColor="red"
                optimizeWaypoints={true}
                apikey={'AIzaSyA3fqPOvBKUx6byEqD67Cu7aSF8Sdn9_wA'}
                onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20,
                    },
                  });
                }}
              />
            )}

            {destination && (
              <Marker
                coordinate={{
                  latitude: destination[1],
                  longitude: destination[0],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            )}
          </MapView>
          {!navigation && renderActions()}
          {params && params.mutable && (
            <TouchableOpacity
              onPress={() => navigate('Confirmar', {location: userLocation})}>
              <View style={styles.select}>
                <Text>Seleccionar</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  select: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  flex: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, .5)',
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startRouteButton: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 200,
    backgroundColor: 'transparent',
  },
  text: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(68, 154, 235, .4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(68, 154, 235, 1)',
  },
});
