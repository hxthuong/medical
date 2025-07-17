import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import recordsService from '~/services/records';

const editRecord = createAsyncThunk('records/editRecord', async (params, { rejectWithValue }) => {
    try {
        const result = await recordsService.edit(params);
        toast.success('Chỉnh sửa dịch vụ thành công!');
        return result;
    } catch (err) {
        toast.error(`Chỉnh sửa dịch vụ thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default editRecord;
