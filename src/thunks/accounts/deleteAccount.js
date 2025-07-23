import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import accountsService from '~/services/accounts';

const deleteAccount = createAsyncThunk('accounts/deleteAccount', async ({ id }, { rejectWithValue }) => {
    try {
        const result = await accountsService.remove(id);
        toast.success('Xóa thông tin người dùng thành công!');
        return result;
    } catch (err) {
        toast.error(`Xóa thông tin người dùng thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default deleteAccount;
