import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import employeeReducer from "./employee/employeeSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
    },
    devTools: import.meta.env.DEV,
});