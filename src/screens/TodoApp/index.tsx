import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import Task from './components/Task';
import { IconButton } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/core';
import { dispatchStore } from '../../redux/store';
import { deleteTask } from '../../redux/todo/todoThunk';
import { logout } from '../../redux/user/userThunk';
import LinearGradient from 'react-native-linear-gradient';

const Home = (props: any) => {
  const { drawer } = props;
  const navigation = useNavigation();
  const taskList = useSelector((state: any) => state.user.todoReducer.taskList);
  const [hideDelete, setHideDelete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const onLogoutPressed = () => {
    dispatchStore(logout());
    navigation.navigate('LoginScreen');
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
  const handleDeleteTask = useCallback(() => {
    setModalVisible(!modalVisible);
    dispatchStore(deleteTask());
  }, [modalVisible]);
  return (
    <View style={styles.flex}>
      {drawer ? (
        <LinearGradient
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1, y: 0.0 }}
          style={styles.card}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <></>
        </LinearGradient>
      ) : null}
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={drawer ? styles.borderDrawer : styles.container}>
        <View style={styles.tasksWrapper}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Text>Menu</Text>
          </TouchableOpacity>
          <View style={styles.viewDelete}>
            <TouchableOpacity style={styles.logout} onPress={() => onLogoutPressed()}>
              <Text>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Todo list app</Text>
          {hideDelete ? (
            <View style={styles.viewDelete}>
              <TouchableOpacity style={styles.delete} onPress={() => setModalVisible(true)}>
                <Text>Xóa</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.items}>
            {taskList.map((item: any, index: number) => {
              return <Task navigation={navigation} task={item} key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
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
            <View style={styles.row}>
              <Pressable style={[styles.button, styles.buttonDelete]} onPress={() => handleDeleteTask()}>
                <Text style={styles.textStyle}>Có</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Không</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <IconButton
        icon={require('../../assets/ic_plus.png')}
        style={styles.floatinBtn}
        size={40}
        color="white"
        onPress={() => {
          navigation.navigate('CreateTask');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: -14,
    top: 25,
    backgroundColor: '#00000030',
    borderRadius: 8,
    width: 297,
    height: 570,
    opacity: 0.5,
  },

  row: {
    flexDirection: 'row',
  },
  viewDelete: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logout: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '30%',
    backgroundColor: '#FF5789',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
    textAlign: 'center',
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
  flex: {
    flex: 1,
  },
  floatinBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  borderDrawer: {
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  containerDrawer: {
    // shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowColor: 'red',
    shadowOffset: {
      width: -40,
      height: -40,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 40,
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
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
export default Home;
