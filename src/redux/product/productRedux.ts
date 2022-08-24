import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [
      {
        maSP: 1,
        tenSP: 'VinSmart Live',
        giaBan: 5700000,
        hinhAnh: require('@src/assets/ic_home.png'),
        soLuong: 1,
        isChecked: false,
      },
      {
        maSP: 2,
        tenSP: 'Meizu 16Xs',
        giaBan: 7600000,
        hinhAnh: require('@src/assets/icHeader.png'),
        soLuong: 1,
        isChecked: false,
      },
      {
        maSP: 3,
        tenSP: 'Iphone XS Max',
        giaBan: 27000000,
        hinhAnh: require('@src/assets/logo.png'),
        soLuong: 1,
        isChecked: false,
      },
    ],
  },
  reducers: {
    addProduct: (state, action) => {
      let index = state.product.findIndex((spGH) => spGH.maSP === action.payload.maSP);
      state.product[index].isChecked = !action.payload.isChecked;
    },
    changeAmount: (state, action) => {
      let newProduct = [...state.product];
      let index = newProduct.findIndex((spGH) => spGH.maSP === action.payload.sanPham.maSP);
      if (index !== -1) {
        if (action.payload.amount) {
          newProduct[index].soLuong += 1;
        } else {
          if (newProduct[index].soLuong > 1) {
            newProduct[index].soLuong -= 1;
          } else {
            console.log('Số lượng tối thiểu là 1');
          }
        }
      }
      state.product = newProduct;
    },
  },
});

export const { addProduct, changeAmount } = productSlice.actions;

export const selectProduct = (state: any) => state.user.product;

export default productSlice.reducer;
