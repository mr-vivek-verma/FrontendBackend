import axios from 'axios';
import authHeader from '../../utils/authHeader/authHeader';


const { createAsyncThunk } = require('@reduxjs/toolkit');

const createSlice = require('@reduxjs/toolkit').createSlice;



const initialState = {
  loading: false,
  createCat:[],
  error: false,
  
 };


export const admingetCategory = createAsyncThunk('category/categoryList', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'http://localhost:5001/api/v1/category/categoryList',
      authHeader(thunkAPI)
    );

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
});


export const createCategory = createAsyncThunk('category/addcategory', async (data, thunkAPI) => {
    console.log("ai data", data) 
    let newFormData = new FormData();
newFormData.append("category_name", data.values.category);
   newFormData.append("sizes[]", data.values.size);
newFormData.append("category_image", data.inputImage);

    console.log("sdfsdf", newFormData)
    
    
  try {
        const response = await axios.post(`http://localhost:5001/api/v1/category/addCategory`,newFormData,authHeader(thunkAPI)
        );
      return response.data;
       
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
});





const adminCategorySlice = createSlice({
  name: "data",
  initialState,
  reducers: {
          
  },
  
    extraReducers: {
        [createCategory.pending]: (state) => {
            state.loading = true;
        },
        [createCategory.fulfilled]: (state,{payload}) => {
            state.loading = false;
            state.category = payload.data
    
        },
         [admingetCategory.pending]: (state) => {
            state.loading = true;
        },
        [admingetCategory.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.category = payload.data
    
        },
    }
});
export default adminCategorySlice.reducer;