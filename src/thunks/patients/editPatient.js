import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import patientsService from '~/services/patients';

const editPatient = createAsyncThunk('patients/editPatient', async (params, { rejectWithValue }) => {
    try {
        const result = await patientsService.edit(params);
        toast.success('Chỉnh sửa thông tin bệnh nhân thành công!');
        return result;
    } catch (err) {
        toast.error(`Chỉnh sửa thông tin bệnh nhân thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default editPatient;
