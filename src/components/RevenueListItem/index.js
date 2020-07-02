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
  covertTokFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' G';
   }
   if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
   }
   if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
   }
   return num;
  }

  covertTokFormatterSR = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G SR';
   }
   if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M SR';
   }
   if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K SR';
   }
   return num + ' SR';
  }
  
  render() {

    const {Name, TotalAmount, Commission, ClubImage, PercentageValue, Image} = this.props.card;
    return (
      <Container className="revenue-holder">
        <ListingNumber>{this.props.index + 1}</ListingNumber>
        <VendorImage src={this.props.type === "club" ? `http://native-001-site2.ctempurl.com/images/clubimages/${ClubImage}` : `http://native-001-site2.ctempurl.com/images/vendorimages/${Image}`} alt="vendor" />
        {this.props.type === "club" ? <Progress className="progress-holder" percent={PercentageValue} format={percent => `${Number.isInteger(Commission) ? this.covertTokFormatter(Commission) : this.covertTokFormatter(Commission.toFixed(2)) }   SR`} /> : 
        <VendorTextContainer className="revenue-name">
          <VendorName >{Name}</VendorName>
          <VendorCompanyName> {Name}</VendorCompanyName>  
        </VendorTextContainer>
        }
        {this.props.type === "Venor" && <RevenueNumber>{ this.covertTokFormatterSR(TotalAmount)}</RevenueNumber>}  
      </Container>
    ); 
  }
}

export default RevenueListItem;
