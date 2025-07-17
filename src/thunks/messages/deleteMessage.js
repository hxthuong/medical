import { createAsyncThunk } from '@reduxjs/toolkit';
import messagesService from '~/services/messages';

const deleteMessage = createAsyncThunk('messages/deleteMessage', async ({ id }, { rejectWithValue }) => {
    try {
        const result = await messagesService.remove(id);
        return result;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export default deleteMessage;
