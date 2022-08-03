import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addTask } from '../../../redux/todo/todoThunk';
import { getUuid } from '../../../utils/common/getUuid';
import { dispatchStore } from '../../../redux/store';
import { useNavigation } from '@react-navigation/core';

const CreateTask = () => {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(true);
  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is not empty'),
  });
  const { values, handleChange, errors, handleSubmit, setFieldTouched, touched, handleBlur } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: () => {
      handleAddTask();
      setFieldTouched('title', false);
      setFieldTouched('description', false);
      navigation.navigate('Home');
    },
    validationSchema,
  });
  const handleAddTask = useCallback(() => {
    dispatchStore(
      addTask({
        title: values.title,
        description: values.description,
        isChecked: false,
        id: getUuid(),
      }),
    );
    values.title = '';
    values.description = '';
  }, [values]);
  useEffect(() => {
    if (values.title !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [values.title]);
  return (
    <View style={styles.flex}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Create task</Text>
          <TextInput
            value={values.title}
            onChangeText={handleChange('title')}
            style={styles.input}
            placeholder="Write a title"
            onBlur={handleBlur('title')}
          />
          {errors.title && touched.title ? <Text style={styles.error}>{errors.title}</Text> : null}
          <TextInput
            value={values.description}
            onChangeText={handleChange('description')}
            style={styles.input}
            placeholder="Write a description"
            onBlur={handleBlur('description')}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={disabled}
        style={disabled ? styles.disabled : styles.addWrapper}
        onPress={handleSubmit}>
        <View>
          <Text style={styles.addText}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: '#cccccc',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  flex: {
    flex: 1,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginLeft: 10,
  },
  container: {
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
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '100%',
    marginTop: 15,
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
});
export default CreateTask;
