import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import {
  Home,
  DetailTask,
  CreateTask,
  LoginScreen,
  RegisterScreen,
  MyStreaksScreen,
  SettingsScreen,
  MenuScreen,
  UserInfoScreen,
  TutorialScreen,
  ProductScreen,
} from '@src/screens';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#2D3748CC',
          width: '100%',
        },
      }}
      drawerContent={(props) => <MenuScreen {...props} />}
      initialRouteName="Home">
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="MyStreaksScreen"
        component={MyStreaksScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="UserInfoScreen"
        component={UserInfoScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="TutorialScreen"
        component={TutorialScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="ProductScreen"
        component={ProductScreen}
      />
    </Drawer.Navigator>
  );
};
const Navigator = () => {
  const user = useSelector((state: any) => state.user.userReducer.user);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'HomeDrawer' : 'LoginScreen'}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="DetailTask" component={DetailTask} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeDrawer"
          component={HomeDrawer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
