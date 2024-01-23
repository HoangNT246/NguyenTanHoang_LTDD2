import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from './navigation/MainContainer';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DeatailScreen';
import Cart from './screens/Cart';
import ProductDetail from './screens/ProductDetail';
import Signin from'./screens/Signin';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
