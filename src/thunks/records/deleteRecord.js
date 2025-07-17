import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import recordsService from '~/services/records';

const deleteRecord = createAsyncThunk(
    'records/deleteRecord',
    async ({ registrationID, serviceID }, { rejectWithValue }) => {
        try {
            const result = await recordsService.remove(registrationID, serviceID);
            toast.success('Xóa dịch vụ thành công!');
            return result;
        } catch (err) {
            toast.error(`Xóa dịch vụ thất bại! ${err.message}`);
            return rejectWithValue(err.message);
        }
    },
);

export default deleteRecord;
