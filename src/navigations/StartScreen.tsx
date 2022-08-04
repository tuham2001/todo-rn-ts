import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/TodoApp';
import DetailTask from '../screens/TodoApp/components/DetailTask';
import CreateTask from '../screens/TodoApp/components/CreateTask';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
