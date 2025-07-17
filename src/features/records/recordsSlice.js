import { createSlice } from '@reduxjs/toolkit';
import { fetchRecords, addRecord, editRecord, deleteRecord } from '~/thunks/records';

const recordsSlice = createSlice({
    name: 'records',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch records
            .addCase(fetchRecords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecords.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchRecords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //add record
            .addCase(addRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecord.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //edit record
            .addCase(editRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editRecord.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const index = state.list.findIndex((r) => r.id === updated.id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })
            .addCase(editRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //delete record
            .addCase(deleteRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRecord.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter((r) => r.id !== deletedId);
            })
            .addCase(deleteRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default recordsSlice.reducer;
