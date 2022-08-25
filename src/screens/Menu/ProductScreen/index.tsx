import React, { useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { ProductData } from './ProductData';
import ProductList from './ProductList';

export const ProductScreen = () => {
  const handlePurchase = useCallback(() => {
    const cart: any[] = [];
    ProductData.map((item: any) => {
      if (item.isChecked) {
        cart.push(item);
      }
    });
    console.log('cart', cart);
  }, []);
  return (
    <View style={styles.bgColor}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header header="Giỏ hàng" />
        <ProductList />
        <TouchableOpacity onPress={() => handlePurchase()} style={styles.purChase}>
          <Text>Mua hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  purChase: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  bgColor: {
    backgroundColor: '#2D3748CC',
    flex: 1,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
});
