import { createSlice } from '@reduxjs/toolkit';
import { fetchFiles, addFiles, deleteFile } from '~/thunks/files';

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch files
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //add files
            .addCase(addFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //delete file
            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter((r) => r.id !== deletedId);
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default filesSlice.reducer;
