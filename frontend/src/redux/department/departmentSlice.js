import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DepartmentService from "../../services/DepartmentService";

export const fetchDepartments = createAsyncThunk(
    "department/fetchDepartments",
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

            const response = await DepartmentService.getDepartments(
                page,
                size,
                sortBy,
                sortDir,
                search
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch departments"
            );

        }
    }
);

export const createDepartment = createAsyncThunk(
    "department/createDepartment",
    async (department, thunkAPI) => {
        try {

            const response = await DepartmentService.createDepartment(department);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create department"
            );

        }
    }
);

export const updateDepartment = createAsyncThunk(
    "department/updateDepartment",
    async ({ id, department }, thunkAPI) => {

        try {

            const response = await DepartmentService.updateDepartment(
                id,
                department
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update department"
            );

        }
    }
);

export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment",
    async (id, thunkAPI) => {

        try {

            await DepartmentService.deleteDepartment(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete department"
            );

        }
    }
);

const initialState = {

    departments: [],
    loading: false,
    error: null,

    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0

};

const departmentSlice = createSlice({

    name: "department",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchDepartments.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(fetchDepartments.fulfilled, (state, action) => {

                state.loading = false;

                state.departments = action.payload.content;
                state.page = action.payload.page;
                state.size = action.payload.size;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;

            })

            .addCase(fetchDepartments.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })

            .addCase(createDepartment.fulfilled, () => {})

            .addCase(updateDepartment.fulfilled, () => {})

            .addCase(deleteDepartment.fulfilled, () => {});

    }

});

export default departmentSlice.reducer;