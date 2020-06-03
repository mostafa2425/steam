import React from 'react';
import { Link } from 'react-router-dom';
import Location from '../../images/pin.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import Fans from '../../images/users.png'
import {
  Container,
  VendorStatus,
  ContantContainer,
  VendorName,
  ListingText,
  TitleImage,
  Details,
  VeiwBotton,
  VendorImage,
  FansContiner,
  FansTextContainer,
  FansImage,
  FansNumber,
  FansText,
  VendorCountry,
  VendorContainer,
} from './StyledComponents';

class VendorCard extends React.Component {
  state = {};
 
  render() {
    const { image, name, link, fans, location, to } = this.props;

    return (
      <Container>
        <VendorContainer>
          <VendorImage src={image} alt="vendor" />
          <FansTextContainer>
            <VendorName>{name}</VendorName>
            <VendorCountry>KSA</VendorCountry>
            <VendorStatus>Not Active</VendorStatus>
          </FansTextContainer>
        </VendorContainer>
        {fans && (
          <FansContiner>
            <FansImage src={Fans} alt="fans" />
            <FansTextContainer>
              <FansNumber>200K</FansNumber>
              <FansText>Active Users</FansText>
            </FansTextContainer>
          </FansContiner>
        )}
        <ContantContainer>
          <ListingText>
            <TitleImage src={Email} alt="title" />
            <Details>abc@gmail.com</Details>
          </ListingText>
          { location && (
            <ListingText>
              <TitleImage src={Location} alt="title" />
              <Details>Riyadh</Details>
            </ListingText>
          )}
          <ListingText>
            <TitleImage src={Phone} alt="title" />
            <Details>+966547777777</Details>
          </ListingText>
        </ContantContainer>
        <Link to={to} style={{ textDecoration: 'none', display: 'flex' }}>
          <VeiwBotton>{link}</VeiwBotton>
        </Link>
      </Container>
    );
  }
}

export default VendorCard;