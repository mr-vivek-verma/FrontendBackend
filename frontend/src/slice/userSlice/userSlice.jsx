import axios from 'axios';


const { createAsyncThunk } = require('@reduxjs/toolkit');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  loading: false,
  userCat: [],
  error: false,
};

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
