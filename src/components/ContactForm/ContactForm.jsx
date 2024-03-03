import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  FormConstolsContainer,
  StyledForm,
  StyledField,
  FieldContainer,
  StyledLabel,
  StyledErrorMessage,
  StyledSubmitButton,
  StyledMaskedInput, // Франкенштейн из Masked + Styled, который под капотом ещё наверное Field от формика инкапсулирует
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';

// Инпут маска для номера телефона
const phoneNumberMask = [
  '+',
  /[1-9]/,
  /\d/,
  '(',
  /[0-9]/,
  /\d/,
  /\d/,
  ')',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
];

const initialValues = {
  name: '',
  phone: '',
};

// Схема для валидации yup
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Too short!')
    .max(32, 'Too long!')
    .notOneOf(['1234567890'], 'Invalid name')
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name')
    .required('Required!'),
  phone: yup
    .string()
    .matches(/^\+?\d{1,3}\(\d{3}\)\d{2}-\d{2}-\d{3}$/, 'Invalid phone number')
    .required('Required!'),
});

// Далее идёт компонент формы
const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const createPhoneBookEntry = data => {
    const normalizedData = data.name?.toLowerCase();
    if (contacts?.some(({ name }) => name.toLowerCase() === normalizedData)) {
      toast('Such a contact already exists!');
      return;
    }
    dispatch(addContact(data));
  };

  const handleSubmit = (values, { resetForm }) => {
    createPhoneBookEntry({ ...values });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <StyledForm>
        <FormConstolsContainer>
          <StyledLabel htmlFor="name">
            Name
            <FieldContainer>
              <StyledField
                type="text"
                name="name"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component={StyledErrorMessage} />
            </FieldContainer>
          </StyledLabel>

          <StyledLabel htmlFor="phone">
            Number
            <FieldContainer>
              <StyledField name="phone">
                {({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    mask={phoneNumberMask}
                    placeholder="Enter phone number"
                    id="phone"
                    type="text"
                    component="input"
                  />
                )}
              </StyledField>
              <ErrorMessage name="phone" component={StyledErrorMessage} />
            </FieldContainer>
          </StyledLabel>
          <div>
            <StyledSubmitButton type="submit">Add Contact</StyledSubmitButton>
          </div>
        </FormConstolsContainer>
      </StyledForm>
    </Formik>
  );
};

export default ContactForm;
