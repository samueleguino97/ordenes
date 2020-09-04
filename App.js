import React, {useEffect} from 'react';
import Providers from './src/Providers';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Confirm,
  Login,
  Empresa,
  Empresas,
  Pedidos,
  Product,
  Opinion,
  Profile,
  Signup,
} from './src/views';
import Loader from './src/views/Loader';
import Cart from './src/views/Cart';
import LogoutButton from './src/views/LogoutButton';
import ProfileButton from './src/components/ProfileButton';
import Pedido from './src/views/Pedido';
import Geolocation from '@react-native-community/geolocation';
import Map from './src/components/Map';
import Success from './src/views/Success';
import {ScrollView, PermissionsAndroid} from 'react-native';
import PedidosGusto from './src/views/PedidosGusto';
import PedidoProducts from './src/views/PedidoProducts';
import OpinionEmpresa from './src/views/OpinionEmpresa';
import PedidosUsuario from './src/views/PedidosUsuario';

Geolocation.setRNConfiguration({
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 10000,
});

const noBackAndCenter = {headerLeft: () => null, headerTitleAlign: 'center'};
const center = {headerTitleAlign: 'center'};

const MainStack = createStackNavigator();

function Main() {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(res => {
      if (res === 'granted') {
        // Geolocation.getCurrentPosition(info => console.log(info));
      }
    });
  }, []);

  return (
    <Providers>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Empresas">
          <MainStack.Screen
            name="Loader"
            component={Loader}
            options={{header: () => null}}
          />
          <MainStack.Screen
            name="Cart"
            component={Cart}
            options={{title: 'Carro'}}
          />
          <MainStack.Screen
            name="FullMap"
            component={Map}
            options={{title: 'Mapa'}}
          />
          <MainStack.Screen
            name="Pedidos"
            component={Pedidos}
            options={{title: 'Pedidos', headerLeft: () => <LogoutButton />}}
          />
          <MainStack.Screen
            name="PedidosGusto"
            component={PedidosGusto}
            options={{title: 'Pedidos Gusto'}}
          />
          <MainStack.Screen
            name="PedidosUsuario"
            component={PedidosUsuario}
            options={{title: 'Pedidos'}}
          />
          <MainStack.Screen
            name="PedidoProducts"
            component={PedidoProducts}
            options={{title: 'Productos'}}
          />
          <MainStack.Screen
            name="Success"
            component={Success}
            options={{title: 'Pedidos'}}
          />
          <MainStack.Screen
            name="Pedido"
            component={Pedido}
            options={{title: 'Detalle Pedido'}}
          />
          <MainStack.Screen
            name="Opinion"
            component={Opinion}
            options={{title: 'Opinion'}}
          />
          <MainStack.Screen
            name="Profile"
            component={Profile}
            options={{title: 'Perfil'}}
          />
          <MainStack.Screen
            name="Confirmar"
            component={Confirm}
            options={{title: 'Confirmar Orden'}}
          />
          <MainStack.Screen
            name="Signup"
            component={Signup}
            options={{title: 'Crear Cuenta', ...center}}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{title: 'Login', ...noBackAndCenter}}
          />
          <MainStack.Screen
            name="Empresas"
            component={Empresas}
            options={{
              title: 'Empresas',
              ...noBackAndCenter,
              headerLeft: () => <LogoutButton />,
              headerRight: () => <ProfileButton />,
            }}
          />
          <MainStack.Screen
            name="OpinionEmpresa"
            component={OpinionEmpresa}
            options={{title: 'Opiniones'}}
          />
          <MainStack.Screen
            name="Empresa"
            component={Empresa}
            options={{title: 'Productos'}}
          />
          <MainStack.Screen
            name="Producto"
            component={Product}
            options={{title: 'Detalles del Producto'}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}

export default Main;
