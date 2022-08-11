import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { TouchableOpacity } from 'react-native-gesture-handler';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October ',
  'November',
  'December',
];
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
        // endingDay: true,
        color: '#FF5789',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      // ['2022-10-04']: { color: 'rgba(0, 0, 0, 0.2)', textColor: 'white' },
      [selectedEnd]: {
        selected: true,
        // startingDay: true,
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
        // firstDay={1}
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
          return (
            <View style={styles.container}>
              <TouchableOpacity>
                {direction === 'left' ? (
                  <Text style={styles.textMonthLeft}>{monthNames[nowMonth - 2]}</Text>
                ) : (
                  <Text style={styles.textMonthRight}>{monthNames[nowMonth]}</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        onMonthChange={onMonthChange}
        renderHeader={(date: any) => {
          return (
            <View style={styles.container}>
              <View style={styles.hrBlack}>
                <></>
              </View>
              <View style={styles.hrPink}>
                <></>
              </View>
              <Text style={styles.textMonthActive}>{monthNames[date.getMonth()]}</Text>
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
                    <View style={styles.midSelect}>
                      <Text style={styles.textDay}>{e.date.day}</Text>
                    </View>
                  ) : (
                    <View>
                      {selectedEnd !== '' && Date.parse(e.date.dateString) === Date.parse(selectedStart) ? (
                        <View style={styles.startingStyles}></View>
                      ) : null}
                      {selectedStart !== '' && Date.parse(e.date.dateString) === Date.parse(selectedEnd) ? (
                        <View style={styles.EndingStyles}></View>
                      ) : null}
                      <View
                        style={
                          e.date.dateString === selectedStart || e.date.dateString === selectedEnd
                            ? styles.viewSelect
                            : styles.viewDay
                        }>
                        <Text style={styles.textDay}>{e.date.day}</Text>
                      </View>
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
    width: 49.5,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    marginTop: 10,
    marginBottom: 30,
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
    right: -30,
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
    marginLeft: 10,
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
    width: 49.5,
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
