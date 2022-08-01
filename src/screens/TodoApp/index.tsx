import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Task from './components/Task';
import { addTask, deleteTask } from '../../redux/todo/todoThunk';
import { getUuid } from '../../utils/common/getUuid';

const TodoApp = () => {
  const taskList = useSelector((state: any) => state.user.todoReducer.taskList);
  const validationSchema = yup.object().shape({
    title: yup.string().required('Username is not empty'),
    description: yup.string().required('Password is not empty'),
  });
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    setFieldTouched,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: () => {
      handleAddTask();
      setFieldTouched('title', false);
      setFieldTouched('description', false);
    },
    validationSchema,
  });
  const dispatch = useDispatch();
  const [hideDelete, setHideDelete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddTask = () => {
    dispatch(
      addTask({
        title: values.title,
        description: values.description,
        isChecked: false,
        id: getUuid(),
      }),
    );
    values.title = '';
    values.description = '';
  };
  const handleDeleteTask = () => {
    setModalVisible(!modalVisible);
    dispatch(deleteTask());
  };
  useEffect(() => {
    let count = 0;
    taskList.map((task: any) => {
      if (!task.isChecked) {
        count = count + 1;
      }
    });
    if (count === taskList.length) {
      setHideDelete(false);
    } else {
      setHideDelete(true);
    }
  }, [taskList]);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo list app</Text>
        <TextInput
          value={values.title}
          onChangeText={handleChange('title')}
          style={styles.input}
          placeholder="Write a title"
          onBlur={handleBlur('title')}
        />
        {errors.title && touched.title ? (
          <Text style={styles.error}>{errors.title}</Text>
        ) : null}
        <TextInput
          value={values.description}
          onChangeText={handleChange('description')}
          style={styles.input}
          placeholder="Write a description"
          onBlur={handleBlur('description')}
        />
        {errors.description && touched.description ? (
          <Text style={styles.error}>{errors.description}</Text>
        ) : null}
        <TouchableOpacity style={styles.addWrapper} onPress={handleSubmit}>
          <View>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        {hideDelete ? (
          <View style={styles.viewDelete}>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => setModalVisible(true)}>
              <Text>Xóa</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.items}>
          {taskList.map((item: any, index: number) => {
            return <Task task={item} key={index} />;
          })}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bạn có chắc muốn xóa không?</Text>
              <View style={styles.flex}>
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => handleDeleteTask()}>
                  <Text style={styles.textStyle}>Có</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Không</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginLeft: 10,
  },
  viewDelete: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  delete: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '30%',
    backgroundColor: 'red',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '100%',
    margin: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonDelete: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default TodoApp;
