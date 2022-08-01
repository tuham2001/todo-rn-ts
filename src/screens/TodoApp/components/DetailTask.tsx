import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../redux/todo/todoThunk';

const DetailTask = (props: any) => {
  const { task } = props.route.params;
  const [edit, setEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title);
  const [updateDescription, setUpdateDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit(true);
  };
  const handleCancel = () => {
    setEdit(false);
    setUpdateTitle(task.title);
    setUpdateDescription(task.description);
  };
  const handleSave = () => {
    dispatch(
      updateTask({
        title: updateTitle,
        description: updateDescription,
        isChecked: task.isChecked,
        id: task.id,
      }),
    );
    setEdit(false);
  };
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TextInput
          editable={edit}
          value={updateTitle}
          onChangeText={(text: any) => setUpdateTitle(text)}
          style={styles.text}
          placeholder="Write a description"
        />
        <TextInput
          editable={edit}
          value={updateDescription}
          onChangeText={(text: any) => setUpdateDescription(text)}
          style={styles.text}
          placeholder="Write a description"
        />
        {edit ? (
          <>
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
              style={styles.save}>
              <View>
                <Text style={styles.addText}>Save</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleEdit();
            }}
            style={styles.addWrapper}>
            <View>
              <Text style={styles.addText}>Sửa</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  save: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '50%',
    backgroundColor: 'green',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
  },
  cancel: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
  },
  addWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: 'orange',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
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
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderRadius: 5,
    borderWidth: 2,
  },
});
export default DetailTask;
