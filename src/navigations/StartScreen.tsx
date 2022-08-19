import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
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
    </Drawer.Navigator>
  );
};
const Navigator = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return null;
  }

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
