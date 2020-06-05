import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DateRange from '../DateRange'
import {
  Container,
  Title,
  FieldContainer,
  Lable,
  InputField,
  SubmitBtn,
  CancelBtn,
  ButtonContainer,
  StyledForm,
} from './StyledComponents';

class OfferForm extends React.Component {

  handleChange = x => {
    console.log(x)
  }

  render() {
  const { handleSubmit, reset, submitting, title } = this.props;

  return (
    <Container>
      <Title>{title}</Title>
      <StyledForm onSubmit={handleSubmit}>
        <FieldContainer>
          <Lable>Vendor Name</Lable>
          <div>
            <Field
              name="vendorName"
              component={InputField}
              type="text"
              />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Date Range</Lable>
          <DateRange />
        </FieldContainer>
        <FieldContainer>
          <Lable>Offer Description</Lable>
          <div>
            <Field
              name="offerDescription"
              component={InputField}
              type="text"
              />
          </div>
        </FieldContainer>
        <ButtonContainer>
          <SubmitBtn 
            type="submit"
            // disabled={submitting}
          >
            Submit
          </SubmitBtn>
          <CancelBtn 
            type="button"
            disabled={submitting}
            onClick={reset}
          >
            Cancel
          </CancelBtn>
        </ButtonContainer>
      </StyledForm>
    </Container>
  );
  }
} 

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(OfferForm);

