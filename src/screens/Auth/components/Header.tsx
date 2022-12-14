import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { i18n } from '@src/assets/i18n';

const Header = () => {
  return (
    <View style={styles.flexRow}>
      <Image source={require('@src/assets/icHeader.png')} style={styles.icHeader} />
      <View style={styles.flexColumn}>
        <Text style={styles.upNow}>{i18n.t('upNow')}</Text>
        <Text style={styles.digital}>{i18n.t('digitalHy')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  digital: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14.07,
    lineHeight: 18,
    color: '#2D8CFF',
    marginTop: 10,
  },
  upNow: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 24,
  },
  icHeader: {
    height: 50.35,
    width: 50.35,
    marginRight: 19,
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
export default Header;
