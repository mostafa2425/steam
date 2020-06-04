import React from 'react';
import SideBarContainer from '../../containers/SideBarContainer'
import TopCard from '../../containers/TopCard'
import SmallCard from '../../components/SmallCard'
import BarChart from '../../components/BarChart'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import placeholderImage from '../../images/users.png'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
} from './StyledComponents';

class HomePage extends React.Component {

  render() {

    return (
      <Container className="dashboard-wrapper">
        <PageContainer className="dashboard-content">
          <HeaderPageSection>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection className="card-wrapper">
            <SmallCard
              title="Total Sales"
              image={placeholderImage}
              number="21.500 SR"
            />
            <SmallCard
              title="Total Orders"
              image={placeholderImage}
              number="190"
            />
            <SmallCard
              title="Total Users"
              image={placeholderImage}
              number="12.000"
            />
            <SmallCard
              title="Active User"
              image={placeholderImage}
              number="41%"
              isProgress
            />
          </PageSection>
          <PageSection>
            <BarChart
              height={400}
              title="Number Of Orders"
            />
          </PageSection>
          <PageSection className="top-venor-holder">
            <TopCard title="Top Club By Revenue" type="club" />
            <TopCard title="Top Venor By Revenue" type="Venor" />
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default HomePage;
