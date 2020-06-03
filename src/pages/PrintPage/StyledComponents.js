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
  text-align: center;
  margin: 40px 0;
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

export const ContentContaine = styled.div`
  padding: 60px 40px;
`;

export const InvoiceContaine = styled.div`
  background-color: #fff;
  position: relative;
  width: 21cm;
  height: 29.7cm;
  margin: 0 auto; 
`;

export const BorderColorDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: #81b955;
`;

export const Company = styled.div`
  text-align: left;
`;

export const GreenText = styled.span`
  color: #81b955;
  font-weight: bold;
  font-size: 18px;
`;

export const ElementText = styled.span`
  color: #232323;
  font-size: 18px;
`;

export const Headers = styled.span`
  color: #232323;
  font-weight: bold;
  font-size: 22px;
`;

export const HeadersContent = styled.span`
  color: #81b955;
  font-weight: bold;
  font-size: 18px;
`;

export const SmallText = styled.span`
  color: #232323;
  font-weight: bold;
  font-size: 14px;
`;

export const PaperLogo = styled.img`
  height: 50px;
  width: auto;
  display: block;
  margin: 0 auto;
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