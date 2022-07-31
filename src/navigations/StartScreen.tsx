import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoApp from '../screens/TodoApp';
import DetailTask from '../screens/TodoApp/components/DetailTask';
const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoApp">
        <Stack.Screen name="TodoApp" component={TodoApp} />
        <Stack.Screen name="DetailTask" component={DetailTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
