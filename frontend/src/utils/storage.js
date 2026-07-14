const TOKEN = "accessToken";

const USER = "user";

export const storage = {

    setToken(token){

        localStorage.setItem(TOKEN,token);

    },

    getToken(){

        return localStorage.getItem(TOKEN);

    },

    removeToken(){

        localStorage.removeItem(TOKEN);

    },

    setUser(user){

        localStorage.setItem(USER,JSON.stringify(user));

    },

    getUser(){

        return JSON.parse(localStorage.getItem(USER));

    },

    clear() {

        localStorage.removeItem(TOKEN);

        localStorage.removeItem(USER);

    }

}