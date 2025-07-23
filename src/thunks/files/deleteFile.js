import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import filesService from '~/services/files';

const deleteFile = createAsyncThunk('files/deleteFile', async ({ id }, { rejectWithValue }) => {
    try {
        const result = await filesService.remove(id);
        console.log(id);
        toast.success('Xóa tệp thành công!');
        return result;
    } catch (err) {
        toast.error(`Xóa tệp thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default deleteFile;
