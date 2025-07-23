import { createAsyncThunk } from '@reduxjs/toolkit';
import filesService from '~/services/files';

const addFiles = createAsyncThunk('files/addFiles', async (formData, { rejectWithValue }) => {
    try {
        const result = await filesService.add(formData);
        return result;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default addFiles;
