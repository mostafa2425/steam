import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from '../../containers/SideBarContainer'
import VendorCard from '../../containers/VendorCard'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import AlahlyIcon from '../../images/al-ahly.png'
import AlhilalIcon from '../../images/al-hilal.png'
import AlittihadIcon from '../../images/al-ittihad.png'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  AddBtn,
} from './StyledComponents';

class ClubPage extends React.Component {

  render() {

    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
          <Link to="/add-club" style={{ textDecoration: 'none', display: 'flex' }}>
            <AddBtn>Add Club</AddBtn>
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection>
            <VendorCard 
              name="Al Hilal" 
              image={AlhilalIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
            <VendorCard 
              name="Al Ahly" 
              image={AlahlyIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
            <VendorCard 
              name="Al Ittihad" 
              image={AlittihadIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
          </PageSection>
          <PageSection>
            <VendorCard 
              name="Al Hilal" 
              image={AlhilalIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
            <VendorCard 
              name="Al Ahly" 
              image={AlahlyIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
            <VendorCard 
              name="Al Ittihad" 
              image={AlittihadIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
          </PageSection>
          <PageSection>
            <VendorCard 
              name="Al Hilal" 
              image={AlhilalIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
            <VendorCard 
              name="Al Ahly" 
              image={AlahlyIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
            <VendorCard 
              name="Al Ittihad" 
              image={AlittihadIcon} 
              link="VEIW DASHBORD"
              fans
              to="/dashbord-profile"
            />
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default ClubPage;
