import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Home } from '@src/screens';
import { i18n } from '@src/assets/i18n';

export const MenuScreen = () => {
  const navigation = useNavigation();
  const handleTabMenu = (screen: string) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.flex}>
      <DrawerContentScrollView>
        <View style={styles.container}>
          <View style={styles.flexRow}>
            <Image source={require('@src/assets/ic_home.png')} style={styles.icHome} />
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
              <Image source={require('@src/assets/x.png')} style={styles.icX} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View>
              <View style={styles.container}>
                <View>
                  <Image source={require('@src/assets/ava.png')} style={styles.icAva} />
                  <Text style={styles.name}>James B.</Text>
                </View>
              </View>
              <Drawer.Section>
                <LinearGradient
                  start={{ x: 0, y: 0.0 }}
                  end={{ x: 1.3643, y: 0.0 }}
                  style={styles.borderActive}
                  colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
                  <TouchableOpacity onPress={() => handleTabMenu('Home')} style={[styles.row, styles.bgActive]}>
                    <Image source={require('@src/assets/ic_menu_1.png')} style={styles.icMenu} />
                    <Text style={styles.textActive}>{i18n.t('home')}</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity
                  onPress={() => handleTabMenu('MyStreaksScreen')}
                  style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_2.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('myStreaks')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabMenu('TutorialScreen')} style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_3.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('tutorial')}</Text>
                </TouchableOpacity>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_4.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('testimonial')}</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_5.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('welVideo')}</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_6.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('rewards')}</Text>
                </View>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_7.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('help')}</Text>
                </View>
                <TouchableOpacity onPress={() => handleTabMenu('SettingsScreen')} style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_8.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('settings')}</Text>
                </TouchableOpacity>
                <View style={[styles.row, styles.bgActive]}>
                  <Image source={require('@src/assets/ic_menu_9.png')} style={styles.icMenu} />
                  <Text style={styles.text}>{i18n.t('disclaimer')}</Text>
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
            {i18n.t('powered')} <Text style={styles.textUpNow}>{i18n.t('upNow')}</Text>
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
