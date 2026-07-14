import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import employeeReducer from "./employee/employeeSlice";
import departmentReducer from "./department/departmentSlice";
import designationReducer from "./designation/designationSlice";
import roleReducer from "./role/roleSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,
        employee: employeeReducer,
        department: departmentReducer,
        designation: designationReducer,
        role: roleReducer

    },

    devTools: import.meta.env.DEV

});
