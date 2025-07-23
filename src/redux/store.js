import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from '~/features/patients/patientsSlice';
import recordsReducer from '~/features/records/recordsSlice';
import servicesReducer from '~/features/services/servicesSlice';
import accountsReducer from '~/features/accounts/accountsSlice';
import messagesReducer from '~/features/messages/messagesSlice';
import filesReducer from '~/features/files/filesSlice';

export const store = configureStore({
    reducer: {
        patients: patientsReducer,
        records: recordsReducer,
        services: servicesReducer,
        accounts: accountsReducer,
        messages: messagesReducer,
        files: filesReducer,
    },
});
