import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import accountsService from '~/services/accounts';

const addAccount = createAsyncThunk('accounts/addAccount', async (params, { rejectWithValue }) => {
    try {
        const result = await accountsService.register(params);
        toast.success('Đăng ký thành công!');
        return result;
    } catch (err) {
        toast.error(`Đăng ký thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default addAccount;
