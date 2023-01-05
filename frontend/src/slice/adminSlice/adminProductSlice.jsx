import axios from "axios";
import authHeader from "../../utils/authHeader/authHeader";

const { createAsyncThunk } = require("@reduxjs/toolkit");
import { toast } from 'react-toastify';
const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  loading: false,
  product:[],
  error: false,
};

export const admingetProduct = createAsyncThunk(
    "product/productList",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/v1/product/productList",
          authHeader(thunkAPI)
        );
        // console.log("pro data",response)
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.msg);
      }
    }
  );
export const createProduct = createAsyncThunk("product/productList",async (data, thunkAPI) =>{
  console.log(data)
  const {buying_price,category_id,mainImage,product_name,reselling_price,sharingImages,sizes,sku}=data
  try{
      let  newFormData = new FormData();
    newFormData.append("mainImage",mainImage,mainImage.name);
    newFormData.append("sharingImages",sharingImages,sharingImages.name);
       newFormData.append("product_name", product_name);
       newFormData.append("buying_price", buying_price);
       newFormData.append("reselling_price", reselling_price);
       newFormData.append("sku", sku);
       newFormData.append("category_id", category_id);
      sizes.forEach((item) =>  newFormData.append("sizes[]", item));
      const res = await axios.post(
        `http://localhost:5001/api/v1/product/addProduct`,
        newFormData,
        authHeader(thunkAPI)
      );
      return res.data
  }catch(error){  
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
})


  export const deleteProduct = createAsyncThunk(
    "product/deleteproduct",
    async (data, thunkAPI) => {
      console.log(data);
  
      try {
        const response = await axios.delete(
          `http://localhost:5001/api/v1/product/deleteProduct/${data}`,
          authHeader(thunkAPI)
        );
        thunkAPI.dispatch(admingetProduct())
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.msg);
      }
    }
  );

const adminProductSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
  
    extraReducers: {
      [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state,{payload}) => {
      state.loading = false;
      state.product = payload.data;
      toast.success('product deleted successfully');
      
    },

      [createProduct.pending]: (state) => {
        state.loading = true;
      },
      [createProduct.fulfilled]: (state, { payload }) => { 
        state.loading = false;
        state.product = payload.data;
        toast.success('product created successfully');
      },

     [admingetProduct.pending]: (state) => {
        state.loading = true;
      },
      [admingetProduct.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.product = payload;
      },
    },
  });
  export default adminProductSlice.reducer;
  