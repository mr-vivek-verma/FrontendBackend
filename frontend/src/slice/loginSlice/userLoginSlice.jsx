import axios from 'axios';


const { createAsyncThunk } = require('@reduxjs/toolkit');

const createSlice = require('@reduxjs/toolkit').createSlice;

const roleUser=  JSON.parse(localStorage.getItem("user"))

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")),
  error: false,
  role: roleUser?.userType,
 };



export const getUserLogin = createAsyncThunk('user/userLogin', async (data, thunkAPI) => {

   const payload = {
      "email": data.email,
      "password": data.password,
    };
   
  try {
        const response = await axios.post(`http://localhost:5001/api/v1/user/login`,payload,
        );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
});

const userLoginSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    logOutUser: (state) => {
      
      state.user=null
      state.role = '';
      localStorage.removeItem("user")
    },
   
      
        
  },


  
  extraReducers: { 
    [getUserLogin.pending]: (state) => {
      state.loading = true;
    },
    [getUserLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const user = payload.data.user
      // const userRole = JSON.parse(localStorage.getItem("user"));
      state.user = user;
      state.role = payload.data.user.userType;
       localStorage.setItem("user", JSON.stringify(user) ) 
    },
   



  },
});
export const {logOutUser}=userLoginSlice.actions
export default userLoginSlice.reducer;