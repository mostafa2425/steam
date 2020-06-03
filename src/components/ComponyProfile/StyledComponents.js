import styled from 'styled-components';

export const Container = styled.div`
  display: flex; 
  align-items: center;
  width: 100%;
  height: auto;
  margin: 20px 0;
  padding: 25px;
  border-bottom: 1px solid #a9a9a9;
`;

export const ContentContainer = styled.div`
  display: block;
`;

export const CompanyLogo = styled.img`
  width: 100px;
  height: auto;
  margin-right: 25px;
`;

export const Icon = styled.img`
  width: 12px;
  height: auto;
  margin-right: 10px;
`;

export const CompanyName = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: #232323;
  margin: 0;
`;

export const CompanyPhone = styled.p`
  font-size: 16px;
  color: #a9a9a9;
  margin: 0;
`;

export const CompanyEmail = styled.p`
  font-size: 16px;
  color: #a9a9a9;
  margin: 0;
`;

export const ActiveStatus = styled.p`
  font-size: 20px;
  color: #81b955;
  margin: 0;
`;

export const NotActiveStatus = styled.p`
  font-size: 20px;
  color: rgb(226, 87, 67);
  margin: 0;
`;