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

export const Title = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: #232323;
`;

export const AddBtn = styled.button`
  border-radius: 8px;
  border: none;
  background-color: #81b955;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding: 10px;
  margin: 0 10px;
  width: auto;
  height: 40px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;