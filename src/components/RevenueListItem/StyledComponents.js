import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

export const VendorTextContainer = styled.div`
  margin: 0 30px;
`;

export const ListingNumber = styled.p`
  font-size: 18px;
  color: #d0cdcd;
  font-weight: bold;
`;

export const VendorName = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: #000;
  margin: 0;
`;

export const VendorCompanyName = styled.p`
  font-size: 16px;
  color: #d0cdcd;
  margin: 0;
`;

export const RevenueNumber = styled.span`
  position: absolute;
  right: 0;
  font-size: 20px;
  color: #81b955;
  margin: 0;
  font-weight: bold;
`;

export const VendorImage = styled.img`
  height: 45px;
  width: 45px;
  margin: 0 20px;
`;
