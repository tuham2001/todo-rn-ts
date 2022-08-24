import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ProductItem } from './ProductItem';
import { ProductData } from './ProductData';
import Modal from 'react-native-modal';

export const ProductList = () => {
  const [listProduct, setListProduct] = useState<any[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemProduct, setItemProduct] = useState(-1);
  useEffect(() => {
    setListProduct(ProductData);
  }, []);
  const handleCancel = () => {
    setModalVisible(!modalVisible);
  };
  const handleSuccess = () => {
    const newListProduct = listProduct;
    newListProduct && newListProduct.splice(itemProduct, 1);
    setListProduct(newListProduct);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.bgColor}>
      {listProduct &&
        listProduct.map((product: any, index: number) => {
          return (
            <View key={index}>
              <ProductItem
                setModalVisible={setModalVisible}
                setItemProduct={setItemProduct}
                product={product}
                listProduct={listProduct}
              />
            </View>
          );
        })}

      <Modal isVisible={modalVisible} animationIn="pulse" animationOut="pulse">
        <View style={styles.modalView}>
          <Text style={styles.textGrey}>Bạn chắc chắn muốn bỏ sản phẩm này?</Text>
          <View style={styles.flexRow}>
            <TouchableOpacity onPress={handleCancel} style={[styles.flex, styles.center]}>
              <Text>Không</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSuccess} style={[styles.flex, styles.center]}>
              <Text style={styles.textOrange}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textGrey: {
    color: 'grey',
  },
  textOrange: {
    color: 'orange',
  },
  center: {
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
  },
  modalView: {
    height: 80,
    margin: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
  bgColor: {
    backgroundColor: '#2D3748CC',
    flex: 1,
  },
  items: {
    height: 52,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
});
