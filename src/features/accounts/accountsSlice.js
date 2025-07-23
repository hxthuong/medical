import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, addAccount, editAccount, loginAccount, deleteAccount } from '~/thunks/accounts';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';

const persistedUser = loadFromLocalStorage('user');

const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        list: [],
        account: persistedUser?.user ?? null,
        login: persistedUser?.user?.isLogin ?? false,
        loading: false,
        error: null,
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = true;
            state.account = action.payload;
        },
        setLogout: (state) => {
            state.login = false;
            state.account = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //fetch Accounts
            .addCase(fetchAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //add Account
            .addCase(addAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //edit Account
            .addCase(editAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editAccount.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const index = state.list.findIndex((r) => r.id === updated.id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })
            .addCase(editAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //login Account
            .addCase(loginAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.account = action.payload;
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //delete account
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter((r) => r.id !== deletedId);
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setLogin, setLogout } = accountsSlice.actions;
export default accountsSlice.reducer;
