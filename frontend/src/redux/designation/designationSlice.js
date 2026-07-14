import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DesignationService from "../../services/DesignationService";

export const fetchDesignations = createAsyncThunk(
    "designation/fetchDesignations",
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

            const response =
                await DesignationService.getDesignations(
                    page,
                    size,
                    sortBy,
                    sortDir,
                    search
                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch designations"
            );

        }

    }
);

export const createDesignation = createAsyncThunk(
    "designation/createDesignation",
    async (designation, thunkAPI) => {

        try {

            const response =
                await DesignationService.createDesignation(designation);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to create designation"
            );

        }

    }
);

export const updateDesignation = createAsyncThunk(
    "designation/updateDesignation",
    async ({ id, designation }, thunkAPI) => {

        try {

            const response =
                await DesignationService.updateDesignation(
                    id,
                    designation
                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update designation"
            );

        }

    }
);

export const deleteDesignation = createAsyncThunk(
    "designation/deleteDesignation",
    async (id, thunkAPI) => {

        try {

            await DesignationService.deleteDesignation(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete designation"
            );

        }

    }
);

const initialState = {

    designations: [],
    loading: false,
    error: null,

    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0

};

const designationSlice = createSlice({

    name: "designation",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchDesignations.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(fetchDesignations.fulfilled, (state, action) => {

                state.loading = false;

                state.designations = action.payload.content;
                state.page = action.payload.page;
                state.size = action.payload.size;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;

            })

            .addCase(fetchDesignations.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })

            .addCase(createDesignation.fulfilled, () => {})

            .addCase(updateDesignation.fulfilled, () => {})

            .addCase(deleteDesignation.fulfilled, () => {});

    }

});

export default designationSlice.reducer;