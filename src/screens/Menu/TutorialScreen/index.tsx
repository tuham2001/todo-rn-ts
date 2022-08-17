import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from 'react-native-webview';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const TutorialScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState('2020-10-10');
  const [nowMonth, setNowMonth] = useState(10);
  const [nowYear, setNowYear] = useState(2020);
  const [changeMonth, setChangeMonth] = useState(false);
  const [changeYear, setChangeYear] = useState(false);
  const [selectedStart, setSelectedStart] = useState('');
  const [saveSelect, setSaveSelect] = useState('');
  const fileUrl = 'https://download.novapdf.com/download/samples/pdf-example-encryption.pdf ';
  const listWebView = [
    'https://www.youtube.com/embed/4tYuIU7pLmI',
    'https://www.youtube.com/embed/4CCGI83vOVo',
    'https://www.youtube.com/watch?v=cDZ7B2zie2s',
  ];
  const listMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const listYear = [
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
  ];
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
          // buttonPositive: '',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          // Alert.alert('File is being downloaded');
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
        title: 'awesome.apk',
        mime: 'application/pdf',
        mediaScannable: true,
        overwrite: true,
        fileCache: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('File Downloaded Successfully.');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const marked = useMemo(() => {
    return {
      [selectedStart]: {
        startingDay: true,
        color: '#FFFFFF',
        backgroundColor: '#2AC6A8',
      },
    };
  }, [selectedStart]);
  const onDayPress = useCallback((day: any) => {
    setNowMonth(day.month);
    setCurrent(day.dateString);
    setSelectedStart(day.dateString);
  }, []);
  const onMonthChange = (date: any) => {
    setNowMonth(date.month);
  };
  const handleChangeMonth = (item: any) => {
    setNowMonth(item + 1);
    if (item < 9) {
      setCurrent(`${nowYear}-0${item + 1}-10`);
    } else {
      setCurrent(`${nowYear}-${item + 1}-10`);
    }
    setChangeMonth(!changeMonth);
  };
  const handleChangeYear = (item: any) => {
    setNowYear(item);
    if (nowMonth < 10) {
      setCurrent(`${item}-0${nowMonth}-10`);
    } else {
      setCurrent(`${item}-${nowMonth}-10`);
    }
    setChangeYear(!changeYear);
  };
  const handleSave = () => {
    setModalVisible(!modalVisible);
    setSaveSelect(selectedStart);
  };
  const handleCancel = () => {
    setSelectedStart(saveSelect);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={[styles.bgColor, styles.flex1, modalVisible ? styles.opacity : null]}>
      <ScrollView>
        <View style={[styles.flexRow, styles.header]}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../../assets/LeftBtn.png')} style={styles.icLeft} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>TUTORIAL</Text>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Calendar
                style={styles.styleCalendar}
                theme={{
                  backgroundColor: '#E7ECF4',
                  calendarBackground: 'transparent',
                  // Text day header styles
                  textDayHeaderFontSize: 14,
                  textDayHeaderFontWeight: '500',
                  textSectionTitleColor: '#454F53',
                  // Text today styles
                  todayTextColor: '#FFFFFF',
                  // Text selected styles
                  selectedDayTextColor: '#ffffff',
                  textDisabledColor: '#9BA1AD',
                  'stylesheet.calendar.header': {
                    week: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    },
                  },
                }}
                onMonthChange={onMonthChange}
                renderHeader={(date: any) => {
                  const dateStr = date.toISOString();
                  const endIndex = dateStr.indexOf('T');
                  const month = moment(dateStr.slice(0, endIndex)).format('MMMM');
                  const year = moment(dateStr.slice(0, endIndex)).format('YYYY');
                  return (
                    <>
                      <View style={styles.flexRow}>
                        <TouchableOpacity onPress={() => setChangeMonth(!changeMonth)} style={styles.flex1}>
                          <View style={styles.headerMonthCalender}>
                            <Text style={styles.textDay}>{month}</Text>
                            <Image source={require('../../../assets/Caretdown.png')} style={styles.icCaretdown} />
                          </View>
                          <Modal
                            animationType="none"
                            transparent={true}
                            visible={changeMonth}
                            onRequestClose={() => {
                              Alert.alert('Modal has been closed.');
                              setChangeMonth(!changeMonth);
                            }}>
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <View style={styles.listMonth}>
                                  <ScrollView>
                                    {listMonth.map((item, index) => {
                                      return (
                                        <TouchableOpacity
                                          onPress={() => handleChangeMonth(index)}
                                          style={styles.flex1}
                                          key={index}>
                                          <Text style={[styles.textDay, styles.flex1]}>{item}</Text>
                                        </TouchableOpacity>
                                      );
                                    })}
                                  </ScrollView>
                                </View>
                              </View>
                            </View>
                          </Modal>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setChangeYear(!changeYear)} style={styles.flex1}>
                          <View style={styles.headerYearCalender}>
                            <Text style={styles.textDay}>{year}</Text>
                            <Image source={require('../../../assets/Caretdown.png')} style={styles.icCaretdown} />
                          </View>
                          <Modal
                            animationType="none"
                            transparent={true}
                            visible={changeYear}
                            onRequestClose={() => {
                              Alert.alert('Modal has been closed.');
                              setChangeYear(!changeYear);
                            }}>
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <View style={styles.listMonth}>
                                  <ScrollView>
                                    {listYear.map((item, index) => {
                                      return (
                                        <TouchableOpacity
                                          onPress={() => handleChangeYear(item)}
                                          style={styles.flex1}
                                          key={index}>
                                          <Text style={[styles.textDay, styles.flex1]}>{item}</Text>
                                        </TouchableOpacity>
                                      );
                                    })}
                                  </ScrollView>
                                </View>
                              </View>
                            </View>
                          </Modal>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.hrWhite}>
                        <></>
                      </View>
                    </>
                  );
                }}
                dayComponent={(e: any) => {
                  return (
                    <TouchableOpacity style={styles.itemDay} onPress={() => onDayPress(e.date)}>
                      {e.date.month >= nowMonth ? (
                        <View>
                          {e.date.dateString === selectedStart ? (
                            <LinearGradient
                              start={{ x: -0.1473, y: 0.0 }}
                              end={{ x: 0.533, y: 0.0 }}
                              style={styles.viewSelect}
                              colors={['rgba(0, 0, 0, 0.02)', ' rgba(255, 255, 255, 0.33)']}>
                              <View>
                                <Text style={styles.textSelect}>{e.date.day}</Text>
                              </View>
                            </LinearGradient>
                          ) : (
                            <View style={styles.viewDay}>
                              {e.date.month === 12 && nowMonth === 1 ? (
                                <Text style={styles.prevTextDay}>{e.date.day}</Text>
                              ) : (
                                <Text style={styles.textDay}>{e.date.day}</Text>
                              )}
                            </View>
                          )}
                        </View>
                      ) : (
                        <View style={styles.viewDay}>
                          {e.date.month === 1 && nowMonth === 12 ? (
                            <Text style={styles.textDay}>{e.date.day}</Text>
                          ) : (
                            <Text style={styles.prevTextDay}>{e.date.day}</Text>
                          )}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                }}
                monthFormat="MMMM"
                enableSwipeMonths
                current={current}
                key={current}
                onDayPress={onDayPress}
                markedDates={marked}
                markingType={'period'}
                hideArrows={true}
              />
              <Pressable style={[styles.flexRow, styles.mt16]} onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.btnCancel}>
                  <TouchableOpacity onPress={handleCancel} style={[styles.flexRow, styles.flex]}>
                    <Text style={styles.textCancel}>Cancel</Text>
                    <Image source={require('../../../assets/Cancel.png')} style={styles.icDownload} />
                  </TouchableOpacity>
                </View>
                <LinearGradient
                  start={{ x: -0.1473, y: 0.0 }}
                  end={{ x: 0.533, y: 0.0 }}
                  style={styles.items}
                  colors={['rgba(0, 0, 0, 0.02)', ' rgba(255, 255, 255, 0.33)']}>
                  <TouchableOpacity onPress={handleSave} style={[styles.flexRow, styles.flex]}>
                    <Text style={styles.textWhite}>Save</Text>
                    <Image source={require('../../../assets/FloppyDisk.png')} style={styles.icDownload} />
                  </TouchableOpacity>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Calendar</Text>
        </Pressable>

        {listWebView.map((item: any, index: number) => {
          const SplitedWebView = item.split('watch?v=');
          const Embed = SplitedWebView.join('embed/');
          return (
            <View key={index} style={[styles.webView, styles.container]}>
              <WebView
                style={[styles.itemWebView, modalVisible ? styles.opacity : null]}
                javaScriptEnabled={true}
                source={{ uri: Embed }}
              />
            </View>
          );
        })}
        <LinearGradient
          start={{ x: -0.1473, y: 0.0 }}
          end={{ x: 0.533, y: 0.0 }}
          style={[styles.items, styles.container]}
          colors={['rgba(0, 0, 0, 0.02)', ' rgba(255, 255, 255, 0.33)']}>
          <TouchableOpacity onPress={() => checkPermission()} style={[styles.flexRow, styles.flex]}>
            <Text style={styles.textWhite}>Download PDF instruction</Text>
            <Image source={require('../../../assets/download.png')} style={styles.icDownload} />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hrWhite: {
    marginTop: 35,
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: '#FFF',
  },
  opacity: {
    opacity: 0.3,
  },
  listMonth: {
    width: '100%',
    maxHeight: 70,
    position: 'relative',
    zIndex: 90,
    minWidth: 100,
    alignItems: 'center',
  },
  headerMonthCalender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#9BA1AD',
    marginRight: 16,
    marginBottom: 10,
  },
  headerYearCalender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#9BA1AD',
  },
  icCaretdown: {
    height: 18,
    width: 18,
    marginRight: 16,
    marginBottom: 8,
  },
  mt16: {
    marginTop: 16,
  },
  styleCalendar: {
    position: 'relative',
    zIndex: 10,
    minHeight: 300,
    width: 323,
    borderBottomWidth: 1,
    borderColor: '#FFF',
  },
  itemDay: {
    height: 30,
    position: 'relative',
    zIndex: 1,
  },
  viewSelect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 49.25,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#2AC6A8',
  },
  viewDay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    position: 'relative',
    zIndex: 1,
  },
  prevTextDay: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 17,
    lineHeight: 20,
    color: '#9BA1AD',
    textAlign: 'center',
  },
  textSelect: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 17,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  textDay: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 18,
    color: '#454F53',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    padding: 16,
    backgroundColor: '#E7ECF4',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flex1: {
    flex: 1,
  },
  icDownload: {
    width: 18,
    height: 18,
    marginTop: 16,
  },
  btnCancel: {
    height: 50,
    backgroundColor: '#E7ECF4',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  items: {
    flex: 1,
    height: 50,
    backgroundColor: '#2AC6A8',
    borderRadius: 12,
  },
  textCancel: {
    fontFamily: 'Nippo',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    textTransform: 'capitalize',
    color: '#C62A2A',
    marginRight: 8,
    marginTop: 16,
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
