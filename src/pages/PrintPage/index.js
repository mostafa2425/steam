import React from 'react';
import ReactToPrint from "react-to-print";
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import Logo from '../../images/logow.png'
import moment from "moment";
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  InvoiceContaine,
  ContentContaine,
  BorderColorDiv,
  GreenText,
  ElementText,
  Headers,
  HeadersContent,
  SmallText,
  PaperLogo,
  Company,
  AddBtn,
} from './StyledComponents';

class PrintPage extends React.Component {

  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");
    if(!this.props.location.data){
      this.props.history.push("/brand-invoice");
    }
  }
  

  render() {
    const data = this.props.location && this.props.location.data 
    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
            <ReactToPrint
              trigger={() => <AddBtn>Print Invoice</AddBtn>}
              content={() => this.componentRef}
            />
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <InvoiceContaine ref={el => (this.componentRef = el)}>
            <BorderColorDiv style={{ top: '0' }} />
            <ContentContaine>
              <PaperLogo src={Logo} alt="logo" />
              <PageSection>
                <Company>
                  <SmallText>INVOICE</SmallText>
                  <br/>
                  <SmallText>STeam Co</SmallText>
                  <br/>
                  <SmallText>Phone 0502074792</SmallText>
                </Company>
              </PageSection>
              <PageSection style={{ marginBottom: '70px' }} >
                <p>
                  <Headers>DATA</Headers>
                  <br/>
                  <HeadersContent>{moment().format('l')}</HeadersContent>
                </p>
                <p>
                  <Headers>INVOICE NO.</Headers>
                  <br/>
                  <HeadersContent>{ data && data.Id }</HeadersContent>
                </p>
                <p>
                  <Headers>INVOICE TO.</Headers>
                  <br/>
                  <HeadersContent>{data && data.Vendor.Name}</HeadersContent>
                </p>
              </PageSection>
              <PageSection style={{ borderBottom: '1px solid #ececec', marginBottom: '80px' }} >
                <p>
                  DESCRIPTION
                </p>
                <p>
                  AMOUNT
                </p>
              </PageSection>
              <PageSection>
                <ElementText>Order Commission</ElementText>
                <GreenText> {data && data.CommissionAmount} SR</GreenText>
              </PageSection>
              <PageSection>
                <ElementText>Alerts</ElementText>
                <GreenText> {data && data.AlertAmount} SR</GreenText>
              </PageSection>
              <PageSection>
                <ElementText>Offers</ElementText>
                <GreenText> {data && data.OfferAmount} SR</GreenText>
              </PageSection>
              <PageSection style={{ borderTop: '1px solid #ececec', marginTop: '150px' }} >
                <p>
                  <Headers>BANK</Headers>
                  <br/>
                  <SmallText>Riyad Bank</SmallText>
                </p>
                <p>
                  <Headers>ACC.NO.</Headers>
                  <br/>
                  <SmallText>12345678909</SmallText>
                </p>
                <p>
                  <Headers>TOTAL AMOUNT</Headers>
                  <br/>
                  <GreenText> {data && data.OfferAmount + data.AlertAmount + data.CommissionAmount} SR</GreenText>
                </p>
              </PageSection>
            </ContentContaine>
            <BorderColorDiv style={{ bottom: '0' }} />
          </InvoiceContaine>
        </PageContainer>
      </Container>
    );
  }
}

export default PrintPage;
