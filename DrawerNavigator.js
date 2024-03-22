// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Slide1 from './screens/Slide1';
import Slide2 from './screens/Slide2';
import Slide3 from './screens/Slide3';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Slide1"  screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Slide1" component={Slide1} />
        <Drawer.Screen name="Slide2" component={Slide2} />
        <Drawer.Screen name="Slide3" component={Slide3} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
