import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Calendars from './components/Calendars';
import Header from '../components/Header';
import { i18n } from '@src/assets/i18n';

export const MyStreaksScreen = () => {
  return (
    <View style={styles.bgColor}>
      <Header header="My Streaks" />
      <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1.3643, y: 0.0 }}
        style={styles.streak}
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
        <View style={styles.flexRow}>
          <Image source={require('@src/assets/ic_myStreaks.png')} style={styles.icHeader} />
          <View>
            <Text style={[styles.textWhite, styles.mt14]}>{i18n.t('curStreak')} 1</Text>
            <Text style={[styles.textLongest, styles.mt2]}>{i18n.t('logStreak')} 2</Text>
          </View>
        </View>
      </LinearGradient>
      <Calendars />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 24,
  },
  textHeader: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 20,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    marginRight: 20,
  },
  icLeft: {
    height: 24,
    width: 24,
  },
  textLongest: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 20,
    color: '#828187',
  },
  mt14: {
    marginTop: 14,
  },
  mt2: {
    marginTop: 2,
  },
  textWhite: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  bgColor: {
    backgroundColor: '#2D3748CC',
    flex: 1,
  },
  streak: {
    marginLeft: 19,
    marginRight: 21,
    borderRadius: 20,
  },
  icHeader: {
    height: 50,
    width: 50,
    margin: 10,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});
