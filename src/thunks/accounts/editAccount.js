import { createAsyncThunk } from '@reduxjs/toolkit';
import accountsService from '~/services/accounts';

const editAccount = createAsyncThunk('accounts/editAccount', async (formData, { rejectWithValue }) => {
    try {
        const result = await accountsService.edit(formData);
        return result;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default editAccount;
