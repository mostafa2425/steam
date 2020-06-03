import React from 'react';
import SideList from '../../components/SideList';
import CompanyImage from '../../images/logo-light.png'
import {
  Container,
  CompanyLogo,
} from './StyledComponents';

class SideBarContainer extends React.Component {
  state = {};

  render() {
    return (
      <>
      </>
      // <Container>
      //   <CompanyLogo src={CompanyImage} alt="logo" />
      //   <SideList to="/" text="Dashbord" />
      //   <SideList to="/vendors" text="Vendors" />
      //   <SideList to="/clubs" text="Clubs" />
      //   <SideList to="/brand-invoice" text="Invoice" />
      //   <SideList to="/offers" text="Offers" />
      //   <SideList to="/alerts" text="Alerts" />
      // </Container>
    );
  }
}

export default SideBarContainer;
