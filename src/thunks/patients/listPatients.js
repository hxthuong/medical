import { createAsyncThunk } from '@reduxjs/toolkit';
import patientsService from '~/services/patients';

const listPatients = createAsyncThunk('patients/listPatients', async ({ id }, { rejectWithValue }) => {
    try {
        const result = await patientsService.list(id);

        // console.log(result);
        return result;

        // console.log(result);

        // return result.map((item, index) => ({
        //     ...item,
        //     STT: index + 1,
        //     // dateOfBirth: item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-GB') : '',
        // }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default listPatients;
