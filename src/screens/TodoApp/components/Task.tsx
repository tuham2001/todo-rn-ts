import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { checkTask } from '../../../redux/todo/todoThunk';
import { dispatchStore } from '../../../redux/store';
import { IconButton } from 'react-native-paper';

function Task(props: any) {
  const { task, navigation } = props;
  const handleCheckTask = useCallback(() => {
    dispatchStore(
      checkTask({
        title: task.title,
        description: task.description,
        isChecked: !task.isChecked,
        id: task.id,
      }),
    );
  }, [task]);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailTask', { task });
      }}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <IconButton
            icon={require('../../../assets/check_white.png')}
            size={15}
            color={task.isChecked ? 'white' : '#E8EAED'}
            style={{ backgroundColor: task.isChecked ? '#0079bf' : '#E8EAED' }}
            onPress={() => handleCheckTask()}
          />
          <Text style={task.isChecked ? styles.itemTextDecoration : styles.itemText}>{task.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(Task);
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
    marginLeft: 20,
    fontSize: 20,
    maxWidth: '80%',
  },
  itemTextDecoration: {
    marginLeft: 20,
    fontSize: 20,
    maxWidth: '80%',
    textDecorationLine: 'line-through',
  },
});
