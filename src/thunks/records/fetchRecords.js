import { createAsyncThunk } from '@reduxjs/toolkit';
import recordsService from '~/services/records';

const fetchRecords = createAsyncThunk('records/fetchRecords', async (params, { rejectWithValue }) => {
    try {
        const result = await recordsService.list(params);

        return result.map((item, index) => ({
            ...item,
            STT: index + 1,
            price: (item.price ?? 0).toLocaleString('de-DE'),
            requestDate: item.requestDate ? `${new Date(item.requestDate).toLocaleDateString('en-GB')}` : '',
            statusName: '',
        }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default fetchRecords;
