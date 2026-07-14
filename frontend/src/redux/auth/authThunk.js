import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const login=createAsyncThunk(

"auth/login",

async(credentials,{rejectWithValue})=>{

try{

const response=await AuthService.login(credentials);

return response.data;

}

catch(error){

return rejectWithValue(error.response.data);

}

}

)