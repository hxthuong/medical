import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages, addMessage, deleteMessage } from '~/thunks/messages';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        list: [],
        selectUser: null,
        loginUser: null,
        scrollTrigger: 0,
        loading: false,
        error: null,
    },
    reducers: {
        selectUser: (state, action) => {
            state.selectUser = action.payload;
        },
        loginUser: (state, action) => {
            state.loginUser = action.payload;
        },
        triggerScroll: (state) => {
            state.scrollTrigger = Date.now();
        },
    },
    extraReducers: (builder) => {
        builder
            //fetch mesages
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //add Account
            .addCase(addMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //delete patient
            .addCase(deleteMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter((r) => r.id !== deletedId);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { selectUser, loginUser, triggerScroll } = messagesSlice.actions;
export default messagesSlice.reducer;
