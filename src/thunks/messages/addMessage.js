import { createAsyncThunk } from '@reduxjs/toolkit';
import messagesService from '~/services/messages';
import { format } from 'date-fns';

const addMessage = createAsyncThunk('messages/addMessage', async (params, { rejectWithValue }) => {
    try {
        const result = await messagesService.add(params);
        return {
            ...result,
            date: result.createOnTime ? format(new Date(result.createOnTime), 'dd/MM/yyyy') : '',
            time: result.createOnTime ? format(new Date(result.createOnTime), 'HH:mm') : '',
        };
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default addMessage;
