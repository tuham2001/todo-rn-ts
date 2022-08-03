import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { checkTask } from '../../../redux/todo/todoThunk';
import { dispatchStore } from '../../../redux/store';

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
          <View style={styles.checkBox}>
            <CheckBox
              checkedIcon={<Image style={styles.icon} source={require('../../../assets/check.png')} />}
              uncheckedIcon={<Image style={styles.icon} source={require('../../../assets/uncheck.png')} />}
              size={0}
              checked={task.isChecked}
              // checkedColor="orange"
              onPress={() => handleCheckTask()}
            />
          </View>
          <Text style={styles.itemText}>{task.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(Task);
const styles = StyleSheet.create({
  checkBox: {
    // backgroundColor: '#eee',
  },
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
    fontSize: 20,
    maxWidth: '80%',
  },
});
