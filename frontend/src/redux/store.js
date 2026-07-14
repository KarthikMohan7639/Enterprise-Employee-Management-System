import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import employeeReducer from "./employee/employeeSlice";
import departmentReducer from "./department/departmentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
    },
    reducer: {

        auth: authReducer,
        employee: employeeReducer,
        department: departmentReducer
    },
    devTools: import.meta.env.DEV,
});
