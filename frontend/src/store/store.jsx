import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-unresolved
import categorySlice from 'src/slice/categorySlice/categorySlice';
import userProductSlice from 'src/slice/userSlice/userProductSlice';

import userCategorySlice from "../slice/userSlice/userSlice"

const store = configureStore({
  reducer: {
    category: categorySlice,   // admin
    usercategory: userCategorySlice,  // landing page
    product: userProductSlice
  },
});
export default store;
