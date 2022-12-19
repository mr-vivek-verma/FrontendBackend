import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-unresolved
import categorySlice from 'src/slice/categorySlice/categorySlice';

import userCategorySlice from "../slice/userSlice/userSlice"

const store = configureStore({
  reducer: {
    category: categorySlice,
    usercategory: userCategorySlice
  },
});
export default store;
