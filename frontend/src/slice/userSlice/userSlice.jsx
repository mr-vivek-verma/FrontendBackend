import axios from 'axios';
import authHeader from '../../utils/authHeader/authHeader';
import { customAxios } from '../../utils/customAxios';

const { createAsyncThunk } = require('@reduxjs/toolkit');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  loading: false,
  userCat: [],
  error: false,
};

// export const listCategory = createAsyncThunk(
//   '/category/categoryList',

//   async (_, thunkAPI) => {
//     try {
//       const catList = await myAxios.get('/category/categoryList', authHeader(thunkAPI));
//       console.log('list api', thunkAPI);
//       return catList.data;
//     } catch (error) {
//       return thunkAPI.error(error);
//     }
//   }
// );

export const getUserCategory = createAsyncThunk('user/getUserCategory', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'http://localhost:5001/api/v1/user/categoryList'
      
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
});

const userCategorySlice = createSlice({
  name: 'userCat',
  initialState,
  reducer: {},
  extraReducers: {
    [getUserCategory .pending]: (state) => {
      state.loading = true;
    },
    [getUserCategory .fulfilled]: (state, { payload }) => {
        state.userCat = payload.data;
        
    },
  },
});

export default userCategorySlice.reducer;
