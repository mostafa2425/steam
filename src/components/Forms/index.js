import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Title,
  FieldContainer,
  Lable,
  InputField,
  SubmitBtn,
  CancelBtn,
  ButtonContainer,
  SelectField,
  CheckBox,
  CheckBoxWrapper,
  CheckBoxLabel,
} from './StyledComponents';

const Forms = props => {
  const { handleSubmit, reset, submitting, title } = props;
  return (
    <Container className="add-company-wrapper">
      <Title>{title}</Title>
      <form onSubmit={handleSubmit}>
        <FieldContainer>
          <Lable>Company Name</Lable>
          <div>
            <Field
              name="companyName"
              component={InputField}
              type="text"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Arabic Company Name</Lable>
          <div>
            <Field
              name="arabicCompanyName"
              component={InputField}
              type="text"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Contact Phone</Lable>
          <div>
            <Field
              name="contactPhone"
              component={InputField}
              type="number"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Email Address</Lable>
          <div>
            <Field
              name="emailAddress"
              component={InputField}
              type="email"
            />
          </div>
        </FieldContainer>
        {/* <FieldContainer>
          <Lable>Sex</Lable>
          <div>
            <lable>
              <Field name="sex" component="input" type="radio" value="male" />
              {' '}
              Male
            </lable>
            <lable>
              <Field name="sex" component="input" type="radio" value="female" />
              {' '}
              Female
            </lable>
          </div>
        </FieldContainer> */}
        <FieldContainer>
          <Lable>Headquarter Location</Lable>
          <div>
            <Field name="favoriteColor" component={SelectField}>
              <option value="riyadh">Riyadh</option>
              <option value="jed">Jeddah</option>
              <option value="hufof">Hufof</option>
            </Field>
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable htmlFor="employed">Enable</Lable>
          <CheckBoxWrapper>
            <Field
              name="enable"
              id="employed"
              component={CheckBox}
              type="checkbox"
            />
            <CheckBoxLabel htmlFor="employed" />
          </CheckBoxWrapper>
        </FieldContainer>
        {/* <FieldContainer>
          <Lable>Notes</Lable>
            <Field name="notes" component={TextAreaField} />
        </FieldContainer> */}
        <ButtonContainer>
          <SubmitBtn 
            type="submit"
            disabled={submitting}
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
      </form>
    </Container>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(Forms);

