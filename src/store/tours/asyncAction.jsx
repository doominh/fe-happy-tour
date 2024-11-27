import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis'

export const getNewTours = createAsyncThunk('product/newProducts', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetTours({ sort: '-createdAt' });
    if (!response.success) return rejectWithValue(response)
    return response.toursData
})