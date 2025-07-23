import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import patientsService from '~/services/patients';

const deletePatient = createAsyncThunk('patients/deletePatient', async ({ id }, { rejectWithValue }) => {
    try {
        const result = await patientsService.remove(id);
        toast.success('Xóa thông tin bệnh nhân thành công!');
        return result;
    } catch (err) {
        toast.error(`Xóa thông tin bệnh nhân thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default deletePatient;
