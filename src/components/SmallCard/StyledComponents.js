import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  height: 80px;
  border-radius: 8px;
  text-align: center;
  padding: 20px 15px;
  margin: 15px 0;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentContainer = styled.div`
  text-align: center;
`;

export const StatisticsImage = styled.img`
  height: 50px;
  width: auto;
`;

export const Title = styled.p`
  font-size: 16px;
  margin: 0;
  color: #81b955;
  `;

export const Description = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  color: #000;
`;
