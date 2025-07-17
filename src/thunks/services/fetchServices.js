import { createAsyncThunk } from '@reduxjs/toolkit';
import servicesService from '~/services/services';

const fetchServices = createAsyncThunk('services/fetchServices', async (params, { rejectWithValue }) => {
    try {
        const result = await servicesService.list(params);

        return result.map((item, index) => ({
            ...item,
            STT: index + 1,
        }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default fetchServices;
