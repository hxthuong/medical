import { createAsyncThunk } from '@reduxjs/toolkit';
import accountsService from '~/services/accounts';

const loginAccount = createAsyncThunk('accounts/loginAccount', async (params, { rejectWithValue }) => {
    try {
        const result = await accountsService.login(params);

        return result;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default loginAccount;
