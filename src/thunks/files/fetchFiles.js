import { createAsyncThunk } from '@reduxjs/toolkit';
import filesService from '~/services/files';
const fetchFiles = createAsyncThunk('files/fetchFiles', async (params, { rejectWithValue }) => {
    try {
        const result = await filesService.list(params);

        return result.map((item, index) => ({
            ...item,
            STT: index + 1,
        }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default fetchFiles;
