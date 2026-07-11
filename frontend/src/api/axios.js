import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
    baseURL:"http://localhost:8080/api",
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }

});
api.interceptors.request.use(

(config)=>{

const token=storage.getToken();

if(token){

config.headers.Authorization=`Bearer ${token}`;

}

return config;

}
)
api.interceptors.response.use(

response=>response,

async(error)=>{

if(error.response.status===401){

storage.clear();

window.location="/";

}

return Promise.reject(error);

}
)