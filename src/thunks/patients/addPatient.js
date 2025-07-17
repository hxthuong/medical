import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import patientsService from '~/services/patients';

const addPatient = createAsyncThunk('patiens/addPatient', async (params, { rejectWithValue }) => {
    try {
        const result = await patientsService.add(params);
        toast.success('Tạo hồ sơ bệnh nhân thành công!');
        return result;
    } catch (err) {
        toast.error(`Tạo hồ sơ bệnh nhân thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default addPatient;
