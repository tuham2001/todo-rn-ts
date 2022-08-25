import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';

const ProductItem = (props: any) => {
  let { product, listProduct, setItemProduct, setModalVisible } = props;
  let index = listProduct.findIndex((spGH: any) => spGH.maSP === product.maSP);
  const [isChecked, setIsChecked] = useState(product.isChecked);
  const [amount, setAmount] = useState(product.soLuong);
  const handleCheckTask = useCallback(() => {
    product.isChecked = !isChecked;
    setIsChecked(!isChecked);
  }, [product, isChecked]);
  const handleChangeAmount = useCallback(
    (increase: boolean) => {
      if (increase) {
        product.soLuong = amount + 1;
        setAmount(amount + 1);
      } else {
        if (amount < 2) {
          setItemProduct(index);
          setModalVisible(true);
        } else {
          product.soLuong = amount + 1;
          setAmount(amount - 1);
        }
      }
    },
    [amount, index, product, setItemProduct, setModalVisible],
  );
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <IconButton
            icon={require('@src/assets/check_white.png')}
            size={15}
            color={product.isChecked ? 'white' : '#E8EAED'}
            style={{ backgroundColor: product.isChecked ? '#0079bf' : '#E8EAED' }}
            onPress={() => handleCheckTask()}
          />
          <Image source={product.hinhAnh} style={styles.imgProduct} />
          <View style={styles.flex}>
            <Text style={styles.itemText}>{product.tenSP}</Text>
            <View style={styles.ml20}>
              <Text>{product.giaBan * amount}</Text>
            </View>
            <View style={[styles.flexRow, styles.ml20]}>
              <TouchableOpacity onPress={() => handleChangeAmount(false)} style={styles.plusButton}>
                <Text>-</Text>
              </TouchableOpacity>
              <View style={styles.amountProduct}>
                <Text>{amount}</Text>
              </View>
              <TouchableOpacity onPress={() => handleChangeAmount(true)} style={styles.plusButton}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ProductItem);
const styles = StyleSheet.create({
  ml20: {
    marginLeft: 20,
  },
  flex: {
    flex: 1,
  },
  amountProduct: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    width: 40,
    alignItems: 'center',
  },
  plusButton: {
    width: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  imgProduct: {
    width: 50,
    height: 50,
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
    marginLeft: 20,
    fontSize: 20,
    maxWidth: '80%',
  },
});
