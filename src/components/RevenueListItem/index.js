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
import { Progress } from 'antd';

class RevenueListItem extends React.Component {

  render() {

    return (
      <Container className="revenue-holder">
        <ListingNumber>1</ListingNumber>
        <VendorImage src={this.props.type === "club" ? club1 : Vendor} alt="vendor" />
        {this.props.type === "club" ? <Progress className="progress-holder" percent={80} format={percent => `${percent} K`} /> : 
        <VendorTextContainer className="revenue-name">
          <VendorName >Hungerstation</VendorName>
          <VendorCompanyName> Hungerstation Company</VendorCompanyName> 
        </VendorTextContainer>
        }
        {this.props.type === "Venor" && <RevenueNumber>200</RevenueNumber>}  
      </Container>
    );
  }
}

export default RevenueListItem;
