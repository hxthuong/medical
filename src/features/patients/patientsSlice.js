import { createSlice } from '@reduxjs/toolkit';
import { fetchPatients, listPatients, addPatient, editPatient, deletePatient } from '~/thunks/patients';

const patientsSlice = createSlice({
    name: 'patients',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //list patiens
            .addCase(listPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(listPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //add patient
            .addCase(addPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) //edit patient
            .addCase(editPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editPatient.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const index = state.list.findIndex((r) => r.id === updated.id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })
            .addCase(editPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //delete patient
            .addCase(deletePatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter((r) => r.id !== deletedId);
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default patientsSlice.reducer;
