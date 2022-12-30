import axios from "axios";
import authHeader from "../../utils/authHeader/authHeader";

const { createAsyncThunk } = require("@reduxjs/toolkit");
import { toast } from 'react-toastify';
const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  loading: false,
  createCat: [],
  category:[],
  error: false,
};

export const admingetCategory = createAsyncThunk(
  "category/categoryList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/v1/category/categoryList",
        authHeader(thunkAPI)
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/addcategory",
  async (data, thunkAPI) => { 
    console.log("data ", data);
    let newFormData = new FormData();
    newFormData.append("category_name", data.values.category);
    newFormData.append("sizes[]", data.values.size);
    newFormData.append("category_image",data.values.category_image)
    try {
    
      const response = await axios.post(
        `http://localhost:5001/api/v1/category/addCategory/`,
        
        newFormData,
        authHeader(thunkAPI)
        
      );
 
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deletecategory",
  async (data, thunkAPI) => {
    console.log(data);

    try {
      const response = await axios.delete(
        `http://localhost:5001/api/v1/category/deleteCategory/${data}`,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(admingetCategory())
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const singleCategory = createAsyncThunk(
  "category/singlecategory",
  async (data, thunkAPI) => {
   console.log(data)
    try {
    
      const response = await axios.get(
        `http://localhost:5001/api/v1/category/getCategory/${data}`,
       
        authHeader(thunkAPI)
        );
        thunkAPI.dispatch(admingetCategory(data))
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/updatecategory",
  async (data, thunkAPI) => {
    console.log("data with edit", data);
    let newFormData = new FormData();
    newFormData.append("category_name", data.values.category);
    newFormData.append("category_id", data.id);
    newFormData.append("sizes[]", data.values.size);
    newFormData.append("category_image",data.values.category_image)
    try {
    
      const response = await axios.put(
        `http://localhost:5001/api/v1/category/updateCategory/`,
        newFormData,
        authHeader(thunkAPI)
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);


const adminCategorySlice = createSlice({
  name: "data",
  initialState,
  reducers: {},

  extraReducers: {
    [editCategory.pending]: (state) => {
      state.loading = true;
    },
    [editCategory.fulfilled]: (state,{payload}) => {
      state.loading = false;
      state.category = payload.data;
      toast.success('category updated successfully');
    },

    [singleCategory.pending]: (state) => {
      state.loading = true;
    },
    [singleCategory.fulfilled]: (state,{payload}) => {
      state.loading = false;
      state.category = payload.data;
      console.log(payload)
    },
    
    // [deleteCategory.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteCategory.fulfilled]: (state,{payload}) => {
    //   state.loading = false;
    //   state.category = payload.data;
    //   toast.success('category deleted successfully');
      
    // },

    [createCategory.pending]: (state) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, { payload }) => { 
      state.loading = false;
      state.category = payload.data;
      toast.success('category created successfully');
    },
    [admingetCategory.pending]: (state) => {
      state.loading = true;
    },
    [admingetCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.category = payload.data;
    },
  },
});
export default adminCategorySlice.reducer;
