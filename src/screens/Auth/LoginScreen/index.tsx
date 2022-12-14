import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useFormik } from 'formik';
import { i18n } from '@src/assets/i18n';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { dispatchStore } from '@src/redux/store';
import { login } from '@src/redux/user/userThunk';
import { useSelector } from 'react-redux';
import { changeLanguage } from '@src/redux/language/languageRedux';

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [I18n, setI18n] = useState(i18n);
  const language = useSelector((state: any) => state.user.languageReducer.language);
  const handleChangeLanguage = (item: string) => {
    let newI18n = I18n;
    newI18n.locale = item;
    setI18n(newI18n);
    dispatchStore(changeLanguage(item));
  };
  useEffect(() => {
    i18n.locale = language;
  }, [language]);
  const navigation = useNavigation();
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is not empty').email('Must be a valid email'),
    password: yup.string().required('Password is not empty').min(6, 'Password longer than 6 characters'),
  });
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      setIsLoading(true);
      setTimeout(
        () =>
          dispatchStore(
            login({
              email: values.email,
              password: values.password,
              firstName: 'Phạm',
              lastName: 'Tú',
              loggedIn: true,
            }),
          ),
        1000,
      );
      if (values.email && values.password && values.email === 'pro@gmail.com' && values.password === '123123') {
        navigation.navigate('HomeDrawer');
        setTimeout(() => setIsLoading(false), 1000);
      } else {
        setIsLoading(false);
        Alert.alert('Name or password incorrect');
      }
    },
    validationSchema,
  });
  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };
  return (
    <View style={styles.bgColor}>
      <View style={styles.container}>
        <Header />
      </View>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => handleChangeLanguage('vi')}>
          <Text style={styles.textSignUp}>vi</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeLanguage('en')}>
          <Text style={styles.textSignUp}>en</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hr1} />
      <View style={styles.hr5} />
      <View style={styles.container}>
        <Text style={styles.textLogin}>{i18n.t('login')}</Text>
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
            secureTextEntry
          />
        </View>
        {errors.password && touched.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        <View style={styles.forgot}>
          <TouchableOpacity>
            <Text style={styles.textStyle}>{i18n.t('fpwd')}</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={'black'} />
        ) : (
          <TouchableOpacity onPress={() => handleSubmit()}>
            <LinearGradient
              start={{ x: 0.072, y: 0.0 }}
              end={{ x: 0.9717, y: 0.0 }}
              style={styles.btnLogin}
              colors={['#FF5789', '#FF9B9C']}>
              <Text style={styles.textLoginBtn}>{i18n.t('login')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <View style={styles.signUp}>
          <View style={styles.flexRow}>
            <TouchableOpacity>
              <Text style={styles.textStyle}>{i18n.t('notAcc')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRegister()}>
              <Text style={styles.textSignUp}>{i18n.t('signUp')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orLog}>
          <Text style={styles.textStyle}>{i18n.t('orLogin')}</Text>
        </View>
        <View style={styles.hrLeft}></View>
        <View style={styles.hrRight}></View>
        <TouchableOpacity>
          <View style={styles.btnFace}>
            <View style={styles.flexRow}>
              <Image source={require('@src/assets/ic_face.png')} style={styles.icFace} />
              <View style={styles.center}>
                <Text style={styles.textLoginFace}>{i18n.t('logFace')}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.btnApple}>
            <View style={styles.flexRow}>
              <Image source={require('@src/assets/ic_apple.png')} style={styles.icFace} />
              <View style={styles.center}>
                <Text style={styles.textLoginFace}>{i18n.t('logApp')}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 13,
    color: '#f13a59',
    paddingTop: 8,
  },
  hrLeft: {
    position: 'absolute',
    width: 92,
    height: 1,
    backgroundColor: '#00000033',
    top: 375,
    left: 10,
  },
  hrRight: {
    position: 'absolute',
    width: 92,
    height: 1,
    backgroundColor: '#00000033',
    top: 375,
    right: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  orLog: {
    marginTop: 41,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
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
    marginTop: 32,
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
