import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DeatailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Cart from '../screens/Cart';


const homeName = "Trang chủ";
const detailsName = "Thêm SP";
const profileName = "Cá nhân";
const cartName="Giỏ hàng"

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused
              ? require('../assets/images/home.png')
              : require('../assets/images/home.png');
            } else if (rn === detailsName) {
              iconName = focused 
              ? require('../assets/images/detail.png')
              : require('../assets/images/detail.png');

            } else if (rn === profileName) {
              iconName = focused  
              ? require('../assets/images/profile.jpg')
              : require('../assets/images/profile.jpg');
             
            }else if (rn === cartName) {
              iconName = focused 
              ? require('../assets/images/wishlist.png')
              : require('../assets/images/wishlist.png');
            }

          
            return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={cartName} component={Cart} />
        <Tab.Screen name={detailsName} component={DetailScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
  
  );
}

export default MainContainer;