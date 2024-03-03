import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/slice';
import filterSlice from './filter/slice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filterSlice,
  },
});
