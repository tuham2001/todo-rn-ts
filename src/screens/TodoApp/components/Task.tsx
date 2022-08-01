import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { checkTask } from '../../../redux/todo/todoThunk';

export default function Task(props: any) {
  const navigation = useNavigation();

  const { task } = props;
  const dispatch = useDispatch();
  const handleCheckTask = () => {
    dispatch(
      checkTask({
        title: task.title,
        description: task.description,
        isChecked: !task.isChecked,
        id: task.id,
      }),
    );
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailTask', { task });
      }}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <CheckBox
            checkedIcon={<Image style={styles.icon} source={require('../../../assets/check.jpg')} />}
            uncheckedIcon={<Image style={styles.icon} source={require('../../../assets/uncheck.jpg')} />}
            size={0}
            title={'Check'}
            checked={task.isChecked}
            checkedTitle={'UnCheck'}
            checkedColor="orange"
            onPress={() => handleCheckTask()}
          />
          <Text style={styles.itemText}>{task.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemText: {
    maxWidth: '80%',
  },
});
