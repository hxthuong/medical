import { createSlice } from '@reduxjs/toolkit';
import { fetchServices, editService } from '~/thunks/services';

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch services
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //edit service
            .addCase(editService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editService.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const index = state.list.findIndex((r) => r.id === updated.id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })
            .addCase(editService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default servicesSlice.reducer;
