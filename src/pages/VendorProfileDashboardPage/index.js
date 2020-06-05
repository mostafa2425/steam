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
import { Spin } from 'antd';

class VendorProfileDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorId : null,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ vendorId : "idd" })
    }, 1000)
    
    console.log(this.props.location)
  }
  render() {

    return (
      <Container>
        
        <PageContainer className="vendor-profile-wrapper">
          <HeaderPageSection>
          <Link to="/add-branch" style={{ textDecoration: 'none', display: 'flex' }}>
            <button className="primary-fill">Add Branch</button>
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {this.state.vendorId ? 
          <>
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
          </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

export default VendorProfileDashboardPage;
