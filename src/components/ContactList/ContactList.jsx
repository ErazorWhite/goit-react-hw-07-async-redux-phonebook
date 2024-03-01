import { useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem/ContactListItem';
import { StyledUnorderedList } from './ContactList.styled';
import { selectFilteredContacts } from '../../redux/selectors';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <>
      <StyledUnorderedList>
        {contacts.map(({ id, name, phone }) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            phone={phone}
          />
        ))}
      </StyledUnorderedList>
    </>
  );
};

export default ContactList;
