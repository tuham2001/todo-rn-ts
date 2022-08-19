/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from '@src/navigations/StartScreen';
import { requestUserPermission, NotificationListner } from '@src/utils/pushnotification_helper';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
});
export default App;

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React, { type PropsWithChildren } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import A from './src/screens/A';
// import B from './src/screens/B';
// import C from './src/screens/C';

// const Stack = createNativeStackNavigator()
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='A'>
//         <Stack.Screen name="A" component={A} />
//         <Stack.Screen name="B" component={B} />
//         <Stack.Screen name="C" component={C} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
