import React from 'react';
import ReactToPrint from "react-to-print";
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import Logo from '../../images/wla-logo.jpeg'
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

  render() {

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
              list={["Edit Profile", "Notification", "Logout"]}
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
                  <HeadersContent>22/2/2020</HeadersContent>
                </p>
                <p>
                  <Headers>INVOICE NO.</Headers>
                  <br/>
                  <HeadersContent>00001</HeadersContent>
                </p>
                <p>
                  <Headers>INVOICE TO.</Headers>
                  <br/>
                  <HeadersContent>IMcDonald's KSA</HeadersContent>
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
                <GreenText>SAR 5000</GreenText>
              </PageSection>
              <PageSection>
                <ElementText>Alerts</ElementText>
                <GreenText>SAR 2000</GreenText>
              </PageSection>
              <PageSection>
                <ElementText>Offers</ElementText>
                <GreenText>SAR 3000</GreenText>
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
                  <GreenText>SAR 11,000</GreenText>
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
