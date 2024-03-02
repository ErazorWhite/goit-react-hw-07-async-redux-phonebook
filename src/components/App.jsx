import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/operations';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      {error && <p>{error}</p>}
      <ToastContainer />
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {loading && <p>Loading contacts...</p>}
      {contacts?.length ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        <p>There are no contacts!</p>
      )}
    </div>
  );
};

export default App;
