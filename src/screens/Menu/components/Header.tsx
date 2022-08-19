import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions, useNavigation } from '@react-navigation/core';

const Header = (props: any) => {
  const { header, goBackScreen } = props;
  const navigation = useNavigation();
  return (
    <View style={[styles.flexRow, styles.header]}>
      <TouchableOpacity
        onPress={() =>
          !goBackScreen ? navigation.dispatch(DrawerActions.openDrawer()) : navigation.navigate(goBackScreen)
        }>
        <Image source={require('@src/assets/ic_left.png')} style={styles.icLeft} />
      </TouchableOpacity>
      <Text style={styles.textHeader}>{header}</Text>
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
  streak: {
    marginLeft: 19,
    marginRight: 21,
    borderRadius: 20,
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
