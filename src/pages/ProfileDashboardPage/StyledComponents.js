import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Titillium Web', sans-serif;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const PageContainer = styled.div`
  // margin-left: 250px;
  background-color: #F2F3F8;
  width: 100%;
  // padding: 90px;
  overflow-y: scroll;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

export const PageSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InformationPageSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
`;

export const HeaderPageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  padding: 15px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
`;