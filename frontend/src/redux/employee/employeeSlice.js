import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EmployeeService from "../../services/employeeService";

export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async (
        {
            page = 0,
            size = 10,
            sortBy = "id",
            sortDir = "asc",
            search = ""
        },
        thunkAPI
    ) => {
        try {
            const response = await EmployeeService.getEmployees(
                page,
                size,
                sortBy,
                sortDir,
                search
            );

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch employees."
            );
        }
    }
);

const initialState = {
    employees: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    loading: false,
    error: null
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;

                state.employees = action.payload.content;
                state.page = action.payload.page;
                state.size = action.payload.size;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;
                state.first = action.payload.first;
                state.last = action.payload.last;
            })

            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createEmployee.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateEmployee.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
                        
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteEmployee.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })            

    }

});

export const createEmployee = createAsyncThunk(
    "employee/createEmployee",

    async (employee, thunkAPI) => {

        try {

            const response =
                await EmployeeService.createEmployee(employee);

            thunkAPI.dispatch(
                fetchEmployees({
                    page: 0,
                    size: 10,
                    sortBy: "id",
                    sortDir: "asc"
                })
            );

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to create employee."
            );

        }

    }
);
export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",

    async ({ id, employee }, thunkAPI) => {

        try {

            const response =
                await EmployeeService.updateEmployee(id, employee);

            thunkAPI.dispatch(
                fetchEmployees({
                    page: 0,
                    size: 10,
                    sortBy: "id",
                    sortDir: "asc"
                })
            );

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to update employee."
            );

        }

    }
);
export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",

    async (id, thunkAPI) => {

        try {

            await EmployeeService.deleteEmployee(id);

            thunkAPI.dispatch(
                fetchEmployees({
                    page: 0,
                    size: 10,
                    sortBy: "id",
                    sortDir: "asc"
                })
            );

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to delete employee."
            );

        }

    }
);
export default employeeSlice.reducer;