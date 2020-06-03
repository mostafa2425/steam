import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 44px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 15px 0;
  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const ListTitle = styled.p`
  font-size: 14px;
  margin: 0;
  color: #a9a9a9;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    color: #81b955;
  }
`;
