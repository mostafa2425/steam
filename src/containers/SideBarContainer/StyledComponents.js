import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  padding: 40px;
  width: 170px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CompanyLogo = styled.img`
  height: auto;
  width: 100%;
  padding-bottom: 14px;
  border-bottom: 1px solid #a9a9a9;
`;