import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { TouchableOpacity } from 'react-native-gesture-handler';

const INITIAL_DATE = '2022-10-05';
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
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [nowMonth, setNowMonth] = useState(10);
  const marked = useMemo(() => {
    return {
      ['2022-10-03']: {
        // selected: true,
        // disableTouchEvent: true,
        startingDay: true,
        // endingDay: true,
        color: '#FF5789',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      ['2022-10-04']: { color: 'rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.2)', textColor: 'white' },
      [selected]: {
        selected: true,
        // startingDay: true,
        endingDay: true,
        color: '#FF5789',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    };
  }, [selected]);
  const onDayPress = (day: any) => {
    setSelected(day.dateString);
  };

  const onMonthChange = (date: any) => {
    setNowMonth(date.month - 1);
  };
  return (
    <View style={{ margin: 20 }}>
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
            selected: {
              backgroundColor: 'red',
            },
          },
        }}
        renderArrow={(direction) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity>
                {direction === 'left' ? (
                  <Text style={styles.textMonthLeft}>{monthNames[nowMonth - 1]}</Text>
                ) : (
                  <Text style={styles.textMonthRight}>{monthNames[nowMonth + 1]}</Text>
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
        // dayComponent={(e: any) => {
        //   return (
        //     <TouchableOpacity
        //       style={
        //         e.date.dateString === selected || e.date.dateString === '2022-10-03'
        //           ? styles.viewSelect
        //           : styles.viewDay
        //       }
        //       onPress={() => onDayPress(e.date)}>
        //       {e.date.month >= nowMonth ? (
        //         <Text style={styles.textDay}>{e.date.day}</Text>
        //       ) : (
        //         <Text style={styles.prevTextDay}>{e.date.day}</Text>
        //       )}
        //     </TouchableOpacity>
        //   );
        // }}
        monthFormat="MMMM"
        enableSwipeMonths
        current={INITIAL_DATE}
        onDayPress={onDayPress}
        markedDates={marked}
        markingType={'period'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 40,
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
