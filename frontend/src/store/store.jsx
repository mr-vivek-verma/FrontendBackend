import { configureStore } from '@reduxjs/toolkit';
import categorySlice from 'src/slice/userSlice/categorySlice/categorySlice';
import userProductSlice from 'src/slice/userSlice/userProductSlice';


import userCategorySlice from "../slice/userSlice/userSlice"
import userLoginSlice from "../slice/adminSlice/loginSlice/userLoginSlice"
import adminCategorySlice from 'src/slice/adminSlice/adminCategorySlice';


const store = configureStore({
  reducer: {
    category: categorySlice,     //user category
    usercategory: userCategorySlice,  // landing page user category
    product: userProductSlice , // user product all products slices
    login: userLoginSlice,
    AdminCategory: adminCategorySlice
   
  },
});
export default store;
