import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import accountsService from '~/services/accounts';

const loginAccount = createAsyncThunk('accounts/loginAccount', async (params, { rejectWithValue }) => {
    try {
        const result = await accountsService.login(params);
        toast.success('Đăng nhập thành công!');
        return result;
    } catch (err) {
        toast.error(`Đăng nhập thất bại! ${err.message}`);
        return rejectWithValue(err.message);
    }
});

export default loginAccount;
