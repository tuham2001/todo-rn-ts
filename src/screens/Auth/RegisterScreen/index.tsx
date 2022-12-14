import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormik } from 'formik';
import { i18n } from '@src/assets/i18n';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/core';
import Header from '../components/Header';
import { IconButton } from 'react-native-paper';
import { dispatchStore } from '@src/redux/store';
import { register } from '@src/redux/user/userRedux';
import LinearGradient from 'react-native-linear-gradient';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const validationSchema = yup.object().shape({
    firstname: yup.string().required('Firstname is not empty'),
    lastname: yup.string().required('Lastname is not empty'),
    email: yup.string().required('Email is not empty').email('Must be a valid email'),
    password: yup.string().min(5).required('Password is not empty').min(6, 'Password longer than 6 characters'),
  });
  const [isChecked, setIsChecked] = useState(false);
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: () => {
      if (isChecked) {
        Alert.alert('You have successfully registered');
        dispatchStore(register(values));
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('You have not agreed to our Terms & Conditions and Privacy Policy');
      }
    },
    validationSchema,
  });
  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View style={styles.bgColor}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Header />
        </View>
        <View style={styles.hr1} />
        <View style={styles.hr5} />
        <View style={styles.container}>
          <Text style={styles.textLogin}>{i18n.t('register')}</Text>
          <View style={styles.searchSection}>
            <IconButton icon={require('@src/assets/ic_invite.png')} style={styles.icMail} size={24} color="#A4BCC1" />
            <TextInput
              value={values.firstname}
              onChangeText={handleChange('firstname')}
              style={styles.input}
              placeholder={i18n.t('fName')}
              placeholderTextColor={'#828187'}
              onBlur={handleBlur('firstname')}
            />
          </View>
          {errors.firstname && touched.firstname ? <Text style={styles.error}>{errors.firstname}</Text> : null}
          <View style={styles.searchSection}>
            <IconButton icon={require('@src/assets/ic_invite.png')} style={styles.icMail} size={24} color="#A4BCC1" />
            <TextInput
              value={values.lastname}
              onChangeText={handleChange('lastname')}
              style={styles.input}
              placeholder={i18n.t('lName')}
              placeholderTextColor={'#828187'}
              onBlur={handleBlur('lastname')}
            />
          </View>
          {errors.lastname && touched.lastname ? <Text style={styles.error}>{errors.lastname}</Text> : null}
          <View style={styles.searchSection}>
            <IconButton icon={require('@src/assets/ic_mail.png')} style={styles.icMail} size={24} color="#A4BCC1" />
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              style={styles.input}
              placeholder={i18n.t('email')}
              placeholderTextColor={'#828187'}
              onBlur={handleBlur('email')}
            />
          </View>
          {errors.email && touched.email ? <Text style={styles.error}>{errors.email}</Text> : null}
          <View style={styles.searchSection}>
            <IconButton icon={require('@src/assets/ic_pass.png')} style={styles.icMail} size={24} color="#A4BCC1" />
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              style={styles.input}
              placeholder={i18n.t('pwd')}
              placeholderTextColor={'#828187'}
              onBlur={handleBlur('password')}
            />
          </View>
          {errors.password && touched.password ? <Text style={styles.error}>{errors.password}</Text> : null}
          <View style={[styles.mt20, styles.flexRow]}>
            <TouchableOpacity onPress={() => handleCheckBox()}>
              <View style={styles.checkBox}></View>
            </TouchableOpacity>
            {isChecked ? (
              <IconButton
                icon={require('@src/assets/check_white.png')}
                size={18}
                color={'#FF5889'}
                style={styles.iconCheck}
                onPress={() => handleCheckBox()}
              />
            ) : null}
            <Text style={[styles.textStyle, styles.flex]}>
              {i18n.t('byRegister')}
              <Text style={styles.pinkColor}> {i18n.t('termConditions')} </Text>
              {i18n.t('and')}
              <Text style={styles.pinkColor}> {i18n.t('pPolicy')}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            start={{ x: 0.072, y: 0.0 }}
            end={{ x: 0.9717, y: 0.0 }}
            style={styles.btnLogin}
            colors={['#FF5789', '#FF9B9C']}>
            <Text style={styles.textLoginBtn}>{i18n.t('registerIn')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.signUp}>
          <View style={styles.flexRow}>
            <Text style={styles.textStyle}>{i18n.t('alreadyAcc')}</Text>
            <TouchableOpacity onPress={() => handleLogin()}>
              <Text style={styles.textSignUp}>{i18n.t('login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  none: {
    display: 'none',
  },
  error: {
    fontSize: 13,
    color: '#f13a59',
    paddingTop: 8,
  },
  iconCheck: {
    position: 'absolute',
    left: -10,
    top: -10,
  },
  checkBox: {
    position: 'relative',
    marginRight: 18,
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#A4BCC1',
    borderRadius: 4,
  },
  mt20: {
    marginTop: 20,
  },
  pinkColor: {
    color: '#FF5889',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  orLog: {
    marginTop: 41,
    display: 'flex',
    alignItems: 'center',
  },
  textSignUp: {
    color: '#FF5889',
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 11,
  },
  signUp: {
    marginTop: 26,
    display: 'flex',
    alignItems: 'center',
  },
  textLoginFace: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    marginTop: 4,
    marginRight: 20,
  },
  textLoginBtn: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  btnFace: {
    marginTop: 32,
    backgroundColor: '#3F60B2',
    borderRadius: 30,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
  },
  btnApple: {
    marginTop: 18,
    backgroundColor: '#131416',
    borderRadius: 30,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
  },
  btnLogin: {
    borderRadius: 30,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    marginTop: 14,
    display: 'flex',
    alignItems: 'flex-end',
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#00000033',
    borderRadius: 100,
    marginTop: 10,
    height: 50,
  },
  icFace: {
    marginLeft: 20,
    width: 26,
    height: 28,
  },
  icMail: {
    marginLeft: 13,
  },
  input: {
    flex: 1,
    borderRadius: 100,
    height: 50,
  },
  textLogin: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 24,
    marginBottom: 18,
  },
  hr1: {
    borderBottomColor: '#2D8CFF',
    borderBottomWidth: 1,
  },
  hr5: {
    borderBottomColor: '#FFFFFF1A',
    borderBottomWidth: 5,
  },
  bgColor: {
    backgroundColor: '#2D3748CC',
    flex: 1,
  },
  container: {
    margin: 24,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  textStyle: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
});
