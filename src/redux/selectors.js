import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter?.toLowerCase();
    if (!contacts.length) return;
    if (!normalizedFilter) return contacts;
    return contacts?.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);
