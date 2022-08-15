import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, Platform, PermissionsAndroid, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from 'react-native-webview';
import { DrawerActions, useNavigation } from '@react-navigation/core';

const TutorialScreen = () => {
  const navigation = useNavigation();
  const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
          buttonPositive: '',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          Alert.alert('File is being downloaded');
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: RootDir + '/file_' + Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const listWebView = [
    'https://www.youtube.com/embed/4tYuIU7pLmI',
    'https://www.youtube.com/embed/4CCGI83vOVo',
    'https://www.youtube.com/watch?v=cDZ7B2zie2s',
  ];
  return (
    <View style={[styles.bgColor, styles.flex1]}>
      <ScrollView>
        <View style={[styles.flexRow, styles.header]}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../../assets/LeftBtn.png')} style={styles.icLeft} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>TUTORIAL</Text>
        </View>
        {listWebView.map((item: any, index: number) => {
          const SplitedWebView = item.split('watch?v=');
          const Embed = SplitedWebView.join('embed/');
          return (
            <View key={index} style={[styles.webView, styles.container]}>
              <WebView style={styles.itemWebView} javaScriptEnabled={true} source={{ uri: Embed }} />
            </View>
          );
        })}
        <LinearGradient
          start={{ x: -0.1473, y: 0.0 }}
          end={{ x: 0.533, y: 0.0 }}
          style={[styles.items, styles.container]}
          colors={['rgba(0, 0, 0, 0.02)', ' rgba(255, 255, 255, 0.33)']}>
          <TouchableOpacity onPress={checkPermission} style={[styles.flexRow, styles.flex]}>
            <Text style={styles.textWhite}>Download PDF instruction</Text>
            <Image source={require('../../../assets/download.png')} style={styles.icDownload} />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  icDownload: {
    width: 18,
    height: 18,
    marginTop: 16,
  },
  items: {
    height: 50,
    backgroundColor: '#2AC6A8',
    borderRadius: 12,
  },
  textWhite: {
    fontFamily: 'Nippo',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    textTransform: 'capitalize',
    color: '#FFFFFF',
    marginRight: 8,
    marginTop: 16,
  },
  container: {
    margin: 20,
  },
  webView: {
    overflow: 'hidden',
    borderRadius: 20,
    height: 200,
  },
  itemWebView: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  textHeader: {
    fontFamily: 'Nippo',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 27,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.75,
    marginTop: 28,
    marginRight: 46,
  },
  header: {
    backgroundColor: '#3A3E48',
    height: 78,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  bgColor: {
    backgroundColor: '#E7ECF4',
  },
  icLeft: {
    height: 60,
    width: 60,
    marginTop: 14,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
});
export default TutorialScreen;
