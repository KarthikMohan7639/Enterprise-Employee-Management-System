import api from "../api/axios";
import { API } from "../config/apiConfig";

const AuthService = {

    login(credentials) {
        return api.post(`${API.AUTH}/auth/login`, credentials);
    }

};

export default AuthService;