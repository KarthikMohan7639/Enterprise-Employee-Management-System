import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RoleService from "../../services/roleService";

export const fetchRoles = createAsyncThunk(
    "role/fetchRoles",
    async (
        {
            page = 0,
            size = 10,
            search = ""
        },
        thunkAPI
    ) => {
        try {

            const response = await RoleService.getRoles(
                page,
                size,
                search
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to fetch roles."
            );

        }
    }
);

export const createRole = createAsyncThunk(
    "role/createRole",
    async (role, thunkAPI) => {

        try {

            const response =
                await RoleService.createRole(role);

            thunkAPI.dispatch(fetchRoles({
                page: 0,
                size: 10,
                search: ""
            }));

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to create role."
            );

        }

    }
);

export const updateRole = createAsyncThunk(
    "role/updateRole",
    async ({ id, role }, thunkAPI) => {

        try {

            const response =
                await RoleService.updateRole(id, role);

            thunkAPI.dispatch(fetchRoles({
                page: 0,
                size: 10,
                search: ""
            }));

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to update role."
            );

        }

    }
);

export const deleteRole = createAsyncThunk(
    "role/deleteRole",
    async (id, thunkAPI) => {

        try {

            await RoleService.deleteRole(id);

            thunkAPI.dispatch(fetchRoles({
                page: 0,
                size: 10,
                search: ""
            }));

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Unable to delete role."
            );

        }

    }
);

const initialState = {

    roles: [],

    page: 0,

    size: 10,

    totalElements: 0,

    totalPages: 0,

    loading: false,

    error: null

};

const roleSlice = createSlice({

    name: "role",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchRoles.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchRoles.fulfilled, (state, action) => {

                state.loading = false;

                state.roles = action.payload.content;
                state.page = action.payload.number;
                state.size = action.payload.size;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;

            })

            .addCase(fetchRoles.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })

            .addCase(createRole.fulfilled, (state) => {

                state.loading = false;

            })

            .addCase(updateRole.fulfilled, (state) => {

                state.loading = false;

            })

            .addCase(deleteRole.fulfilled, (state) => {

                state.loading = false;

            });

    }

});

export default roleSlice.reducer;