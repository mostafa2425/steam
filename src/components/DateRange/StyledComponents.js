import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  background-color: #fff;
`;

export const InputField = styled.div`
  width: 600px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;
