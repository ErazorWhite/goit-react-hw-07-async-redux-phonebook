import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ userName, number }) {
        const id = nanoid();
        return {
          payload: { id, userName, number },
        };
      },
    },
    deleteContact: ({ items }, action) => {
      const deleteIndex = items.findIndex(
        contact => contact.id === action.payload
      );
      if (deleteIndex > -1) items.splice(deleteIndex, 1);
    },
  },
});
 
export const { addContact, deleteContact } = contactsSlice.actions; // actions
export const getContacts = state => state.contacts.items; // selector
export default contactsSlice.reducer; // reducer
