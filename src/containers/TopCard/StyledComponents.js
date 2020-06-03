import styled from 'styled-components';

export const Container = styled.div`
  padding: 25px;
  margin: 20px 0;
  width: 44%;
  height: auto;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #232323;
  margin-top: 0;
`;
