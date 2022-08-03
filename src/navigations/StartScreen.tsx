import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/TodoApp';
import DetailTask from '../screens/TodoApp/components/DetailTask';
import CreateTask from '../screens/TodoApp/components/CreateTask';
const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="DetailTask" component={DetailTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
