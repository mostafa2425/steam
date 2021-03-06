import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 25px;
`;

export const FieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px auto;
  width: 70%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: #232323;
`;

export const Lable = styled.span`
  font-size: 16px;
  color: #232323;
  margin-right: 20px;
`;

export const SubmitBtn = styled.button`
  border: none;
  border-radius: 8px;
  background-color: #81b955;
  color: #fff;
  width: 120px;
  padding: 15px;
  margin: 0 15px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const CancelBtn = styled.button`
  border: none;
  border-radius: 8px;
  background-color: #e4e4e4;
  color: #232323;
  width: 120px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const InputField = styled.input`
  width: 600px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #a9a9a9;

  &:focus {
    outline: none;
  }
`;

export const SelectField = styled.select`
  width: 632px;
  height: 40px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  background-color: #fff;

  &:focus {
    outline: none;
  }
`;

export const TextAreaField = styled.textarea`
  width: 700px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  height: 200px;

  &:focus {
    outline: none;
  }
`;


export const CheckBoxWrapper = styled.div`
  position: relative;
  width: 45px;
  height: auto;
`;

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 4px;
    background: #ffffff;
    transition: 0.2s;
  }
`;

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  &:checked + ${CheckBoxLabel} {
    background: #81b955;
    
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
