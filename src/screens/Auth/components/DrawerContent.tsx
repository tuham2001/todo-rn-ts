import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Home from '../../TodoApp';

const DrawerContent = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('MyStreaks');
  };
  return (
    <View style={styles.flex}>
      <DrawerContentScrollView>
        <View style={styles.container}>
          <View style={styles.flexRow}>
            <Image source={require('../../../assets/ic_home.png')} style={styles.icHome} />
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
              <Image source={require('../../../assets/x.png')} style={styles.icX} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View>
              <View style={styles.container}>
                <View>
                  <Image source={require('../../../assets/ava.png')} style={styles.icAva} />
                  <Text style={styles.name}>James B.</Text>
                </View>
              </View>
              <Drawer.Section>
                <LinearGradient
                  start={{ x: 0, y: 0.0 }}
                  end={{ x: 1.3643, y: 0.0 }}
                  style={styles.borderActive}
                  colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
                  <View style={[styles.row, styles.bgActive]}>
                    <Image source={require('../../../assets/ic_menu_1.png')} style={styles.icMenu} />
                    <Text style={styles.textActive}>Home</Text>
                  </View>
                </LinearGradient>
                <TouchableOpacity onPress={() => handleRegister()} style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_2.png')} style={styles.icMenu} />
                  <Text style={styles.text}>My streaks</Text>
                </TouchableOpacity>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_2.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Reminder</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_3.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Invite your friends</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_4.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Send a testimonial</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_5.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Welcome video</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_6.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Rewards</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_7.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Help & Support</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_8.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Settings</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('../../../assets/ic_menu_9.png')} style={styles.icMenu} />
                  <Text style={styles.text}>Disclaimer</Text>
                </View>
              </Drawer.Section>
            </View>
            <View style={styles.home}>
              <Home drawer={true} />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <View>
          <Text style={styles.textPower}>
            Powered by <Text style={styles.textUpNow}>UpNow</Text>
          </Text>
        </View>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: '100%',
    marginLeft: 40,
  },
  text: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 20,
    color: '#959EA7',
  },
  borderActive: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  bgActive: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textActive: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
  },
  icMenu: {
    width: 28,
    height: 28,
    marginLeft: 20,
  },
  name: {
    marginTop: 21,
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  textUpNow: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  textPower: {
    marginLeft: 26,
    fontWeight: '300',
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  container: {
    margin: 20,
  },
  icHome: {
    width: 45,
    height: 45,
  },
  icX: {
    width: 15,
    height: 15,
    marginTop: 10,
  },
  icAva: {
    width: 65,
    height: 65,
  },
});
export default DrawerContent;
