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