import React from 'react';
import { Field, reduxForm } from 'redux-form';
import LocationPickerForm from '../LocationPickerForm'
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
  CheckBox,
  CheckBoxWrapper,
  CheckBoxLabel,
} from './StyledComponents';

const BranchForm = props => {
  const { handleSubmit, reset, submitting, title } = props;
  return (
    <Container>
      <Title>{title}</Title>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Branch Info:</Title>
        <FieldContainer>
          <Lable>Branch Reference</Lable>
          <div>
            <Field
              name="branchReference"
              component={InputField}
              type="text"
              />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Arabic Branch Reference</Lable>
          <div>
            <Field
              name="arabicBranchReference"
              component={InputField}
              type="text"
              />
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
        <FieldContainer>
          <Lable>Branch Location</Lable>
          <LocationPickerForm />
        </FieldContainer>
        <Title>Branch User Account:</Title>
        <FieldContainer>
          <Lable>Branch Contact Phone</Lable>
          <div>
            <Field
              name="branchcontactPhone"
              component={InputField}
              type="number"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Branch Email Account</Lable>
          <div>
            <Field
              name="branchEmailAccount"
              component={InputField}
              type="email"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Branch Username</Lable>
          <div>
            <Field
              name="branchUsername"
              component={InputField}
              type="text"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Password</Lable>
          <div>
            <Field
              name="password"
              component={InputField}
              type="password"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Confirm Password</Lable>
          <div>
            <Field
              name="confirmPassword"
              component={InputField}
              type="password"
            />
          </div>
        </FieldContainer>
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
      </StyledForm>
    </Container>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(BranchForm);

