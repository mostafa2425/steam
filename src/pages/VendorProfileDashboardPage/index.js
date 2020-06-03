import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from '../../containers/SideBarContainer'
import SmallCard from '../../components/SmallCard'
import BarChart from '../../components/BarChart'
import DropdownList from '../../components/DropdownList'
import ComponyProfile from '../../components/ComponyProfile'
import TableComponent from '../../components/Table'
import UserAvatar from '../../images/avatar.jpg'
import Orders from '../../images/orders.png'
import Profit from '../../images/profit.png'
import Invouces from '../../images/invoice.png'
import Active from '../../images/active.png'
import CompanyLogo from '../../images/logo-png.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  InformationPageSection,
  AddBtn,
} from './StyledComponents';

class VendorProfileDashboardPage extends React.Component {

  render() {

    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
          <Link to="/add-branch" style={{ textDecoration: 'none', display: 'flex' }}>
            <AddBtn>Add Branch</AddBtn>
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <InformationPageSection>
            <ComponyProfile 
              name="Dunkin Donuts"
              email="hithere@hello.net"
              emailIcon={Email}
              phone="0554327899"
              phoneIcon={Phone}
              image={CompanyLogo}
            />
            <SmallCard
              title="Total Orders"
              image={Orders}
              number="100K"
              transparent
            />
            <SmallCard
              title="Amount due"
              image={Profit}
              number="14.6 K"
              transparent
            />
            <SmallCard
              title="Invouces"
              image={Invouces}
              number="5"
              transparent
            />
            <SmallCard
              title="Active Beanches"
              image={Active}
              number="3"
              transparent
            />
          </InformationPageSection>
          <PageSection>
            <BarChart 
              height={200}
              title="Daily Sales"
            />
          </PageSection>
          <PageSection>
            <TableComponent />
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default VendorProfileDashboardPage;
