import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../components/Header';

export const UserInfoScreen = () => {
  const [ava, setAva] = useState('');
  const user = useSelector((state: any) => state.user.userReducer.user);
  const handleChangeAva = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.7,
      cropping: false,
    }).then((image) => {
      setAva(image.path);
    });
  };
  return (
    <View style={styles.bgColor}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header header="User info" goBackScreen="SettingsScreen" />
        <View style={[styles.alignCenter, styles.flex]}>
          {ava !== '' ? (
            <Image source={{ uri: ava }} style={styles.icAva} />
          ) : (
            <Image source={require('@src/assets/ava.png')} style={styles.icAva} />
          )}
          <TouchableOpacity
            onPress={() => {
              handleChangeAva();
            }}>
            <Text style={styles.textPink}>Change profile photo</Text>
          </TouchableOpacity>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={styles.items}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14, styles.w100]}>First name</Text>
            <Text style={[styles.textWhite, styles.mt14]}>{user?.firstName}</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={[styles.items, styles.mt8]}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14, styles.w100]}>Last name</Text>
            <Text style={[styles.textWhite, styles.mt14]}>{user?.lastName}</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={[styles.items, styles.mt8]}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14, styles.w100]}>Email</Text>
            <Text style={[styles.textWhite, styles.mt14]}>{user.email}</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1.3643, y: 0.0 }}
          style={[styles.items, styles.mt8]}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View style={styles.flexRow}>
            <Text style={[styles.textWhite, styles.mt14, styles.w100]}>Password</Text>
            <Text style={[styles.textWhite, styles.mt14]}>
              {user.password
                .split('')
                .map((word: any) => word && '*')
                .join('')}
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  w100: {
    width: 100,
  },
  alignCenter: {
    alignItems: 'center',
  },
  icAva: {
    height: 100,
    width: 100,
    borderRadius: 170,
  },
  icAvaChange: {
    height: 40,
    width: 40,
    margin: 5,
  },
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
    marginTop: 15,
    marginBottom: 30,
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
  },
  flex: {
    flex: 1,
  },
});
