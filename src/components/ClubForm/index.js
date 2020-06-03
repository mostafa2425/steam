import React from 'react';
import { Field, reduxForm } from 'redux-form';
import UploadImage from '../../images/upload-image.png';
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
  LogoFieldContainer,
  LogoField,
  LogoLabel,
  LogoIcon,
} from './StyledComponents';

class ClubForm extends React.Component {


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
          <Lable>Club Name</Lable>
          <div>
            <Field
              name="clubName"
              component={InputField}
              type="text"
              />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Arabic Club Name</Lable>
          <div>
            <Field
              name="arabicClubName"
              component={InputField}
              type="text"
              />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Club Commission Percentage</Lable>
          <div>
            <Field
              name="clubCommissionPercentage"
              component={InputField}
              type="number"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Club Contact Phone</Lable>
          <div>
            <Field
              name="clubContactPhone"
              component={InputField}
              type="number"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Club Email Account</Lable>
          <div>
            <Field
              name="clubEmailAccount"
              component={InputField}
              type="email"
            />
          </div>
        </FieldContainer>
        <FieldContainer>
          <Lable>Club Logo</Lable>
          <LogoFieldContainer>
            <LogoLabel htmlFor="logo">
              <LogoIcon src={UploadImage} alt="upload" />
              Upload file
            </LogoLabel>
            <Field
              onChange={(e) => this.handleChange(e.target.files)}
              id="logo"
              name="clubEmailAccount"
              component={LogoField}
              type='file'
              accept='.jpg, .png, .jpeg'
            />
          </LogoFieldContainer>
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
  }
} 

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(ClubForm);

