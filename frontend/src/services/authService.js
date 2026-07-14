import api from "../api/axios";

const AuthService={

login(credentials){

    return api.post("/auth/login",credentials);

},

logout(){

    return api.post("/auth/logout");

}

}

export default AuthService;