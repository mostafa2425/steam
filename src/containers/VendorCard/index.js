import React from 'react';
import { Link } from 'react-router-dom';
import Location from '../../images/pin.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import Fans from '../../images/users.png'
import DunkinDonutsIcon from '../../images/logo-png.png'
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

  componentDidMount() {
    console.log(this.props.history)
  }
 
  render() {
    const { image, name, link, fans, location, to, phone, status, email, HeadQuarter } = this.props;

    return (
      <Container>
        <VendorContainer>
          <VendorImage src={image ? `http://native-001-site2.ctempurl.com/images/vendorimages/${image}` : DunkinDonutsIcon} alt="vendor" />
          <FansTextContainer>
            <VendorName>{name}</VendorName>
            <VendorCountry>{HeadQuarter ? HeadQuarter : 'KSA'}</VendorCountry>
            {status ? <VendorStatus style={{color : "#81b955"}}>Active</VendorStatus> : <VendorStatus>Not Active</VendorStatus>}
            
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
            <Details> <a href="mailto:{email}" style={{ color: '#969696'}}>{email}</a></Details> 
          </ListingText>
          { location && (
            <ListingText>
              <TitleImage src={Location} alt="title" />
              <Details>Riyadh</Details>
            </ListingText>
          )}
          <ListingText>
            <TitleImage src={Phone} alt="title" />
          <Details> <a href="tel:+${phone}" style={{ color: '#969696'}}>{phone}</a> </Details>
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