import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from '../../containers/SideBarContainer'
import VendorCard from '../../containers/VendorCard'
import DunkinDonutsIcon from '../../images/logo-png.png'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import {
  Container,
  PageContainer,
  PageSection,
  AddBtn,
  HeaderPageSection,
} from './StyledComponents';

class VendorPage extends React.Component {

  render() {

    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
          <Link to="/add-company" style={{ textDecoration: 'none', display: 'flex' }}>
            <AddBtn>Add Company</AddBtn>
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection>
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
          </PageSection>
          <PageSection>
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
          </PageSection>
          <PageSection>
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="VEIW VENDOR" 
              location
              to="/vendor-profile"
            />
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default VendorPage;
