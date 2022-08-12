import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
const Calendars = () => {
  const [selectedEnd, setSelectedEnd] = useState('');
  const [selectedStart, setSelectedStart] = useState('');
  const [nowMonth, setNowMonth] = useState(10);
  const marked = useMemo(() => {
    return {
      [selectedStart]: {
        // selected: true,
        // disableTouchEvent: true,
        startingDay: true,
        color: '#FF5789',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      [selectedEnd]: {
        selected: true,
        endingDay: true,
        color: '#FF5789',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    };
  }, [selectedEnd, selectedStart]);
  const onDayPress = useCallback(
    (day: any) => {
      if (selectedStart === '') {
        setSelectedStart(day.dateString);
      }
      if (selectedEnd === '' && selectedStart !== '') {
        setSelectedEnd(day.dateString);
      }
      if (selectedEnd !== '' && selectedStart !== '') {
        setSelectedStart(day.dateString);
        setSelectedEnd('');
      }
    },
    [selectedStart, selectedEnd],
  );
  useEffect(() => {
    if (Date.parse(selectedStart) > Date.parse(selectedEnd)) {
      setSelectedEnd(selectedStart);
      setSelectedStart(selectedEnd);
    }
  }, [selectedStart, selectedEnd]);
  const onMonthChange = (date: any) => {
    setNowMonth(date.month);
  };
  return (
    <View style={styles.m20}>
      <Calendar
        theme={{
          backgroundColor: 'rgba(45, 55, 72, 0.8)',
          calendarBackground: 'transparent',
          // Text month styles
          textMonthFontSize: 15,
          textMonthFontWeight: '500',
          monthTextColor: '#FFFFFF',
          // Text day header styles
          textDayHeaderFontSize: 15,
          textDayHeaderFontWeight: '500',
          textSectionTitleColor: '#FFFFFF',
          // Text day styles
          textDayFontSize: 15,
          dayTextColor: '#FFFFFF',
          textDayFontWeight: '300',
          // Text today styles
          todayTextColor: '#FFFFFF',
          // Text selected styles
          selectedDayTextColor: '#ffffff',
          'stylesheet.calendar.header': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            },
          },
          'stylesheet.day.basic': {
            container: {
              alignSelf: 'stretch',
              alignItems: 'center',
            },
          },
        }}
        renderArrow={(direction) => {
          let leftMonth = `2022-${nowMonth - 1}`;
          let rightMonth = `2022-${nowMonth + 1}`;
          if (nowMonth < 11) {
            leftMonth = `2022-0${nowMonth - 1}`;
          }
          if (nowMonth < 9) {
            rightMonth = `2022-0${nowMonth + 1}`;
          }
          if (nowMonth === 1) {
            leftMonth = '2022-12';
          }
          if (nowMonth === 12) {
            rightMonth = '2022-01';
          }
          return (
            <View style={styles.container}>
              <TouchableOpacity>
                {direction === 'left' ? (
                  <Text style={styles.textMonthLeft}>{moment(leftMonth).format('MMMM')}</Text>
                ) : (
                  <Text style={styles.textMonthRight}>{moment(rightMonth).format('MMMM')}</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        onMonthChange={onMonthChange}
        renderHeader={(date: any) => {
          let month = `2022-${date.getMonth() + 1}`;
          if (date.getMonth() < 9) {
            month = `2022-0${date.getMonth() + 1}`;
          }
          return (
            <View style={styles.container}>
              <View style={styles.hrBlack}>
                <></>
              </View>
              <View style={styles.hrPink}>
                <></>
              </View>
              <Text style={styles.textMonthActive}>{moment(month).format('MMMM')}</Text>
            </View>
          );
        }}
        dayComponent={(e: any) => {
          return (
            <TouchableOpacity onPress={() => onDayPress(e.date)}>
              {e.date.month >= nowMonth ? (
                <View>
                  {Date.parse(e.date.dateString) < Date.parse(selectedEnd) &&
                    Date.parse(e.date.dateString) > Date.parse(selectedStart) ? (
                    <LinearGradient
                      start={{ x: 0, y: 0.0 }}
                      end={{ x: 1.3643, y: 0.0 }}
                      style={styles.midSelect}
                      colors={[' rgba(0, 0, 0, 0.2) ', 'rgba(0, 0, 0, 0) ']}>
                      <Text style={styles.textDay}>{e.date.day}</Text>
                    </LinearGradient>
                  ) : (
                    <View>
                      {selectedEnd !== '' && Date.parse(e.date.dateString) === Date.parse(selectedStart) ? (
                        <LinearGradient
                          start={{ x: 0, y: 0.0 }}
                          end={{ x: 1.3643, y: 0.0 }}
                          style={styles.startingStyles}
                          colors={[' rgba(0, 0, 0, 0.2) ', 'rgba(0, 0, 0, 0) ']}>
                          <></>
                        </LinearGradient>
                      ) : null}
                      {selectedStart !== '' && Date.parse(e.date.dateString) === Date.parse(selectedEnd) ? (
                        <LinearGradient
                          start={{ x: 0, y: 0.0 }}
                          end={{ x: 1.3643, y: 0.0 }}
                          style={styles.EndingStyles}
                          colors={[' rgba(0, 0, 0, 0.2) ', 'rgba(0, 0, 0, 0) ']}>
                          <></>
                        </LinearGradient>
                      ) : null}
                      {e.date.dateString === selectedStart || e.date.dateString === selectedEnd ? (
                        <LinearGradient
                          start={{ x: 0.072, y: 0.0 }}
                          end={{ x: 0.9717, y: 0.0 }}
                          style={styles.viewSelect}
                          colors={['#FF5789', '#FF9B9C']}>
                          <View>
                            <Text style={styles.textDay}>{e.date.day}</Text>
                          </View>
                        </LinearGradient>
                      ) : (
                        <View style={styles.viewDay}>
                          <Text style={styles.textDay}>{e.date.day}</Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.viewDay}>
                  <Text style={styles.prevTextDay}>{e.date.day}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        monthFormat="MMMM"
        enableSwipeMonths
        current={'2020-10-10'}
        onDayPress={onDayPress}
        markedDates={marked}
        markingType={'period'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  m20: {
    margin: 20,
  },
  EndingStyles: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 50,
    height: 44,
    position: 'absolute',
    right: 32,
  },
  startingStyles: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 50,
    height: 44,
    position: 'absolute',
    left: 32,
  },
  midSelect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 49.25,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    marginTop: 10,
    marginBottom: 30,
    width: 105,
  },
  hrBlack: {
    top: 35,
    left: -135,
    position: 'absolute',
    height: 2,
    width: 335,
    backgroundColor: '#00000033',
  },
  hrPink: {
    top: 35,
    right: 10,
    position: 'absolute',
    height: 2,
    width: 122,
    backgroundColor: '#FF5789',
  },
  textMonthLeft: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#828187',
    marginLeft: 5,
  },
  textMonthRight: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#828187',
    marginRight: 10,
  },
  textMonthActive: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  viewSelect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 49.25,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#FF5789',
  },
  viewDay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  prevTextDay: {
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 17,
    lineHeight: 20,
    color: '#ACAEB4',
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
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 17,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Calendars;
