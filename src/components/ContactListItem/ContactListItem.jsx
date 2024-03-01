import {
  StyledDeleteButton,
  StyledListItem,
  StyledContactEntryBox,
  StyledContactEntry,
} from './ContactListItem.styled';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';

const ContactListItem = ({ name, phone, id }) => {
  const dispatch = useDispatch();
  const deletePhoneBookEntry = entryId => {
    dispatch(deleteContact(entryId));
  };
  return (
    <StyledListItem>
      <StyledContactEntryBox>
        <StyledContactEntry>
          <FaUser />
          <p>{name}</p>
        </StyledContactEntry>
        <StyledContactEntry>
          <FaPhoneAlt />
          <p>{phone}</p>
        </StyledContactEntry>
      </StyledContactEntryBox>
      <StyledDeleteButton onClick={() => deletePhoneBookEntry(id)}>
        Delete
      </StyledDeleteButton>
    </StyledListItem>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactListItem;
