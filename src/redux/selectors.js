export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filters.name;
export const selectFilteredContacts = state => {
  const contacts = selectContacts(state);
  const filterValue = selectFilter(state)?.toLowerCase();
  if (!contacts.length) return;
  if (!filterValue) return contacts;
  return contacts?.filter(({ name }) =>
    name.toLowerCase().includes(filterValue)
  );
};
