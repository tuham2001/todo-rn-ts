import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { dispatchStore } from '@src/redux/store';
import { updateTask } from '@src/redux/todo/todoThunk';

export const DetailTask = (props: any) => {
  const { task } = props.route.params;
  const [edit, setEdit] = useState(false);
  const [hide, setHide] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateTitle, setUpdateTitle] = useState(task.title);
  const [updateDescription, setUpdateDescription] = useState(task.description);
  const [saveTitle, setSaveTitle] = useState(task.title);
  const [saveDescription, setSaveDescription] = useState(task.description);
  const handleEdit = useCallback(() => {
    setEdit(true);
  }, []);
  const handleCancel = useCallback(() => {
    setEdit(false);
    setHide(false);
    setUpdateTitle(saveTitle);
    setUpdateDescription(saveDescription);
  }, [saveTitle, saveDescription]);
  const handleSave = useCallback(() => {
    setEdit(false);
    setHide(false);
    dispatchStore(
      updateTask({
        title: updateTitle,
        description: updateDescription,
        isChecked: task.isChecked,
        id: task.id,
      }),
    );
    setSaveTitle(updateTitle);
    setSaveDescription(updateDescription);
  }, [updateTitle, updateDescription, task.isChecked, task.id]);
  const handleChangeTitle = useCallback((text: any) => {
    setUpdateTitle(text);
    setHide(true);
  }, []);
  const handleChangeDescription = useCallback((text: any) => {
    setUpdateDescription(text);
    setHide(true);
  }, []);
  useEffect(() => {
    if (updateTitle !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [updateTitle]);
  return (
    <View style={styles.flex}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <TextInput
              editable={edit}
              value={updateTitle}
              onChangeText={(text: any) => handleChangeTitle(text)}
              style={styles.text}
              placeholder="Write a description"
            />
            <TextInput
              editable={edit}
              value={updateDescription}
              onChangeText={(text: any) => handleChangeDescription(text)}
              style={styles.text}
              placeholder="Write a description"
            />
          </View>
        </View>
      </ScrollView>
      {hide ? (
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              handleCancel();
            }}
            style={styles.cancel}>
            <View>
              <Text style={styles.addText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSave();
            }}
            disabled={disabled}
            style={disabled ? styles.disabled : styles.save}>
            <View>
              <Text style={styles.addText}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      {!edit ? (
        <TouchableOpacity
          onPress={() => {
            handleEdit();
          }}
          style={styles.addWrapper}>
          <View>
            <Text style={styles.addText}>Sửa</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  disabled: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '50%',
    backgroundColor: '#cccccc',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
  },
  save: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '45%',
    backgroundColor: 'green',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 30,
    marginRight: 20,
  },
  cancel: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 10,
  },
  addWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'orange',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  addText: {
    fontSize: 20,
  },
  text: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '100%',
    margin: 5,
  },
  item: {
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
});
