import axios from "axios";
import authHeader from "../../utils/authHeader/authHeader";

const { createAsyncThunk } = require("@reduxjs/toolkit");
import { toast } from "react-toastify";
const createSlice = require("@reduxjs/toolkit").createSlice;


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
export const createProduct = createAsyncThunk(
  "product/productList",
  async (data, thunkAPI) => {
    console.log(data);
    const {
      buying_price,
      category_id,
      mainImage,
      product_name,
      reselling_price,
      sharingImages,
      sizes,
      sku,
    } = data;
    try {
      let newFormData = new FormData();
      newFormData.append("mainImage", mainImage, mainImage.name);
            // for (let i = 0; i < sharingImages.length; i++) {
      //   newFormData.append("sharingImages[]", sharingImages, sharingImages[i].name);
      //  }
      newFormData.append("sharingImages", sharingImages, sharingImages.name);
      newFormData.append("product_name", product_name);
      newFormData.append("buying_price", buying_price);
      newFormData.append("reselling_price", reselling_price);
      newFormData.append("sku", sku);
      newFormData.append("category_id", category_id);
      sizes.forEach((item) => newFormData.append("sizes[]", item));
      const res = await axios.post(
        `http://localhost:5001/api/v1/product/addProduct`,
        newFormData,
        authHeader(thunkAPI)
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteproduct",
  async (id, thunkAPI) => {
    console.log(id);

    try {
      const response = await axios.delete(
        `http://localhost:5001/api/v1/product/deleteProduct/${id}`,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(admingetProduct());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/updateproduct",
  async (data, thunkAPI) => {
 console.log("product data get",data)
    const {
      buying_price,
      mainImage,
      product_name,
      reselling_price,
      category_id,
      sharingImages,
      productId,

      sizes,
      sku,
    } = data;
    let newFormData = new FormData();
    newFormData.append("main_image", mainImage, mainImage.name);
      newFormData.append("sharing_images", sharingImages, sharingImages.name);
      newFormData.append("product_name", product_name);
      newFormData.append("buying_price", buying_price);
      newFormData.append("reselling_price", reselling_price);
      newFormData.append("sku", sku);
      newFormData.append("sizes[]", sizes);
      newFormData.append("product_id", productId);
      newFormData.append("category_id", category_id);
    try {
    
      const response = await axios.put(
        `http://localhost:5001/api/v1/product/updateProduct`,
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
  product: [],
  error: false,
  toggleState:true,
  productId:null,
};

const adminProductSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToggleFalse:(state,action)=>{
      state.toggleState=false
    },
    setToggleTrue:(state,action)=>{
      state.toggleState=true
    },
    setProductId:(state,action)=>{
      console.log(action.payload)
      state.productId= action.payload
  },
},

  extraReducers: {
    [editProduct.pending]: (state) => {
      state.loading = true;
    },
    [editProduct.fulfilled]: (state,{payload}) => {
      state.loading = false;
      state.product = payload.data;
      toast.success('product updated successfully');
    },

    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload.data;
      toast.success("product deleted successfully");
    },

    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload.data;
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

export const {setToggleFalse,setToggleTrue,setProductId} = adminProductSlice.actions
export default adminProductSlice.reducer;
