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
console.log(this.props.card)
    const {Name, TotalAmount, Commission} = this.props.card
    return (
      <Container className="revenue-holder">
        <ListingNumber>{this.props.index + 1}</ListingNumber>
        <VendorImage src={this.props.type === "club" ? club1 : Vendor} alt="vendor" />
        {this.props.type === "club" ? <Progress className="progress-holder" percent={Commission} format={percent => `${Number.isInteger(Commission) ? Commission : Commission.toFixed(2)} K`} /> : 
        <VendorTextContainer className="revenue-name">
          <VendorName >{Name}</VendorName>
          <VendorCompanyName> {Name}</VendorCompanyName>  
        </VendorTextContainer>
        }
        {this.props.type === "Venor" && <RevenueNumber>{TotalAmount}</RevenueNumber>}  
      </Container>
    );
  }
}

export default RevenueListItem;
