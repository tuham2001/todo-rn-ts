import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/core';
import Header from '../components/Header';
import { i18n } from '@src/assets/i18n';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bgColor}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header header="Settings" />
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={styles.items}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <TouchableOpacity onPress={() => navigation.navigate('UserInfoScreen')} style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14]}>{i18n.t('userInfo')}</Text>
            <Image source={require('@src/assets/ic_right_pink.png')} style={[styles.icRight, styles.mt14]} />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={[styles.items, styles.mt8]}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14]}>{i18n.t('mySub')}</Text>
            <Image source={require('@src/assets/ic_right_pink.png')} style={[styles.icRight, styles.mt14]} />
          </View>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={[styles.items, styles.mt8]}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14]}>{i18n.t('proTags')}</Text>
            <Image source={require('@src/assets/ic_right_pink.png')} style={[styles.icRight, styles.mt14]} />
          </View>
        </LinearGradient>
      </ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1.3643, y: 0.0 }}
        style={styles.items}
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={[styles.textWhite, styles.mt14]}>{i18n.t('termConditions')}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1.3643, y: 0.0 }}
        style={[styles.items, styles.mt8]}
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={[styles.textWhite, styles.mt14]}>{i18n.t('pPolicy')}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1.3643, y: 0.0 }}
        style={[styles.items, styles.containerDelete]}
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={[styles.textPink, styles.mt14]}>{i18n.t('delAcc')}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mt8: {
    marginTop: 8,
  },
  mt14: {
    marginTop: 14,
  },
  mt2: {
    marginTop: 2,
  },
  containerDelete: {
    marginTop: 48,
    marginBottom: 40,
  },
  textPink: {
    marginLeft: 24,
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#FF4471',
  },
  textWhite: {
    marginLeft: 24,
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
  items: {
    height: 52,
  },
  icRight: {
    height: 15,
    width: 10,
    marginRight: 16,
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
});
