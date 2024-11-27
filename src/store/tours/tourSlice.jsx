import { createSlice } from '@reduxjs/toolkit';
import {getNewTours} from './asyncAction'

export const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        newTours: null,
        isLoading: false,
        errorMessage:'',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getNewTours.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getNewTours.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newTours = action.payload;
        });

        builder.addCase(getNewTours.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})

export const {  } = tourSlice.actions;

export default tourSlice.reducer