import styled from 'styled-components';

export const Container = styled.div`
  width: 25%;
  padding: 25px;
  height: auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  margin: 15px 0;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContantContainer = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 15px;
`;

export const VendorStatus = styled.p`
  font-size: 20px;
  color: rgb(226, 87, 67);
  margin-bottom: 15px;
  margin-top: 0;
`;

export const VendorImage = styled.img`
  height: 130px;
  width: auto;
  margin: 15px;
`;

export const ListingText = styled.div`
  margin: 10px 0;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #efefef;
`;

export const TitleImage = styled.img`
  height: 25px;
  width: 25px;
`;

export const VendorName = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #1e223a;
  margin: 0;
`;

export const Details = styled.p`
  font-size: 12px;
  color: #969696;
  margin: 0;
`;

export const VeiwBotton = styled.button`
  color: #81b955;
  border-radius: 8px;
  border: none;
  width: 100%;
  height: auto;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;
  background-color: transparent;
  
  &:focus {
    outline: none;
  }
  `;

export const VendorContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const FansContiner = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const FansTextContainer = styled.div`
  margin-left: 15px;
  text-align: left;
`;

export const FansImage = styled.img`
  height: 40px;
  width: 40px;
`;

export const FansNumber = styled.p`
  color: #232323;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

export const FansText = styled.p`
  margin-top: 0;
  color: #81b955;
  font-size: 14px;
`;

export const VendorCountry = styled.p`
  margin-top: 0;
  font-weight: bold;
  color: #a9a9a9;
  font-size: 16px;
`;

