import React from 'react';
import SideBarContainer from '../../containers/SideBarContainer'
import SmallCard from '../../components/SmallCard'
import BarChart from '../../components/BarChart'
import DropdownList from '../../components/DropdownList'
import ComponyProfile from '../../components/ComponyProfile'
import TableComponent from '../../components/Table'
import UserAvatar from '../../images/avatar.jpg'
import Orders from '../../images/orders.png'
import Profit from '../../images/profit.png'
import Commission from '../../images/commission.png'
import CompanyLogo from '../../images/al-hilal.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  InformationPageSection,
} from './StyledComponents';

class ProfileDashboardPage extends React.Component {

  render() {

    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <InformationPageSection>
            <ComponyProfile 
              name="Al Hilal"
              email="hithere@hello.net"
              emailIcon={Email}
              phone="0554327899"
              phoneIcon={Phone}
              active
              image={CompanyLogo}
            />
            <SmallCard
              title="Total Orders"
              image={Orders}
              number="100K"
              transparent
            />
            <SmallCard
              title="Profit"
              image={Profit}
              number="14.6 K"
              transparent
            />
            <SmallCard
              title="Club Commission"
              image={Commission}
              number="10%"
              transparent
            />
          </InformationPageSection>
          <PageSection>
            <BarChart 
              height={200}
              title="Daily Orders"
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

export default ProfileDashboardPage;
