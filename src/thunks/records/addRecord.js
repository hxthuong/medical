import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import recordsService from '~/services/records';

const addRecord = createAsyncThunk('records/addRecord', async (params, { rejectWithValue }) => {
    try {
        const result = await recordsService.add(params);
        toast.success('Đăng ký dịch vụ thành công!');
        return result;
    } catch (err) {
        toast.error(`Đăng ký dịch vụ thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default addRecord;
