import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNameByRole } from '~/config/roles';
import accountsService from '~/services/accounts';

const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (params, { rejectWithValue }) => {
    try {
        const result = await accountsService.list(params);

        // if (result && result.length === 1) {
        //     return {
        //         ...result[0],
        //         STT: 1,
        //         genderDesc: result[0].gender === true ? 'Nam' : 'Nữ',
        //         roleDesc: getNameByRole(result[0].role),
        //     };
        // }

        return result.map((item, index) => ({
            ...item,
            STT: index + 1,
            genderDesc: item.gender === true ? 'Nam' : 'Nữ',
            roleDesc: getNameByRole(item.role),
        }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default fetchAccounts;
