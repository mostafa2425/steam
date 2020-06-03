import React from 'react';
import Vendor from '../../images/vendor-logo.png'
import club1 from '../../images/hilal.png'
import club2 from '../../images/ahli.png'
import club3 from '../../images/alnasser.png'
import {
  Container,
  ListingNumber,
  VendorImage,
  VendorTextContainer,
  VendorName,
  VendorCompanyName,
  RevenueNumber,
} from './StyledComponents';

class RevenueListItem extends React.Component {

  render() {

    return (
      <Container className="revenue-holder">
        {console.log(this.props.type)}
        <ListingNumber>1</ListingNumber>
        <VendorImage src={this.props.type === "club" ? club1 : Vendor} alt="vendor" />
        <VendorTextContainer className="revenue-name">
          <VendorName >{this.props.type === "club" ? "hilal" : "Hungerstation"}</VendorName>
          <VendorCompanyName>{this.props.type === "club" ? "hilal club" : "Hungerstation Company"}</VendorCompanyName> 
        </VendorTextContainer>
        <RevenueNumber>200</RevenueNumber>
      </Container>
    );
  }
}

export default RevenueListItem;
