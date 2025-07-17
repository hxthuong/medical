import { createAsyncThunk } from '@reduxjs/toolkit';
import patientsService from '~/services/patients';

const fetchPatients = createAsyncThunk('patients/fetchPatients', async (params, { rejectWithValue }) => {
    try {
        const result = await patientsService.search(params);

        return result.map((item, index) => ({
            ...item,
            STT: index + 1,
            dateOfBirth: item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-GB') : '',
        }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default fetchPatients;
