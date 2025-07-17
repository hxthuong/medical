import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import servicesService from '~/services/services';

const editService = createAsyncThunk('records/editService', async (params, { rejectWithValue }) => {
    try {
        const result = await servicesService.edit(params);
        toast.success('Chỉnh sửa dịch vụ thành công!');
        return result;
    } catch (err) {
        toast.error(`Chỉnh sửa dịch vụ thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default editService;
