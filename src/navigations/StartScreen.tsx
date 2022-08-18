import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/TodoApp';
import DetailTask from '@/screens/TodoApp/components/DetailTask';
import CreateTask from '@/screens/TodoApp/components/CreateTask';
import LoginScreen from '@/screens/Auth/LoginScreen';
import RegisterScreen from '@/screens/Auth/RegisterScreen';

import MyStreaksScreen from '@/screens/Menu/MyStreaksScreen';
import SettingsScreen from '@/screens/Menu/SettingsScreen';
import MenuScreen from '@/screens/Menu';
import UserInfoScreen from '@/screens/Menu/UserInfoScreen';
import TutorialScreen from '@/screens/Menu/TutorialScreen';
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
    </Drawer.Navigator>
  );
};
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeDrawer">
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        /> */}
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
