import axios from "axios";
import authHeader from "../../utils/authHeader/authHeader";

const { createAsyncThunk } = require("@reduxjs/toolkit");
import { toast } from 'react-toastify';
const createSlice = require("@reduxjs/toolkit").createSlice;



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
    const {category_name,items,fieldImage} = data
    let newFormData = new FormData();
    newFormData.append("category_name", category_name);
    items.forEach((item) => newFormData.append("sizes[]", item.name));
    newFormData.append("category_image",fieldImage,fieldImage.name);
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
    console.log("edit",data)
    const {category_name,items,fieldImage,category_id} = data
    let newFormData = new FormData();
    newFormData.append("category_name", category_name);
    newFormData.append("category_id",category_id);
    items.forEach((item) => newFormData.append("sizes[]", item.name));
    newFormData.append("category_image",fieldImage,fieldImage.name);
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

const initialState = {
  loading: false,
  createCat: [],
  category:[],
  error: false,
  toggleState:true,
  category_id:null
};

const adminCategorySlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToggleFalse:(state,action)=>{
    state.toggleState=false
  },
  setToggleTrue:(state,action)=>{
    state.toggleState=true
  },
  setCategoryId:(state,action)=>{
    console.log(action.payload)
    state.category_id= action.payload
  }

 
  },

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

export const {setToggleFalse,setToggleTrue,setCategoryId} = adminCategorySlice.actions
export default adminCategorySlice.reducer;
