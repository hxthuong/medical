import { createAsyncThunk } from '@reduxjs/toolkit';
import messagesService from '~/services/messages';
import { format } from 'date-fns';

const fetchMessages = createAsyncThunk('messages/fetchMessages', async (params, { rejectWithValue }) => {
    try {
        const result = await messagesService.list(params);

        return result.map((item, index) => ({
            ...item,
            STT: index + 1,
            date: item.createOnTime ? format(new Date(item.createOnTime), 'dd/MM/yyyy') : '',
            time: item.createOnTime ? format(new Date(item.createOnTime), 'HH:mm') : '',
        }));
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default fetchMessages;
