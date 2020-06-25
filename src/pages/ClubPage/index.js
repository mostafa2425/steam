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
import { Spin,message } from 'antd';

class ClubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs : null,
      loading : true,
    } 
  }
  componentDidMount() {
    fetch('http://native-001-site2.ctempurl.com/api/GetClubs?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let clubs = data.model;
          this.setState({clubs, loading : false})
        });
      } else {
        message.error('Network response was not ok.');
        this.setState({loading : false})
      }
    })
    .catch((error) => {
      this.setState({loading : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });

  }
  render() {

    return (
      <Container>
        
        <PageContainer className="club-wrapper">
          <HeaderPageSection>
          <Link to="/add-club" style={{ textDecoration: 'none', display: 'flex' }}>
            {/* <AddBtn>Add Club</AddBtn> */}
            <button className="primary-fill">Add Club</button>
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? 
          <>
          <div className="club-card-list">
          {this.state.clubs && this.state.clubs.map(club =>
            <VendorCard 
              name={club.Name}
              image={club.Logo}
              email = {club.Email}
              status={club.Enable}
              phone={club.Phone}
              cardId ={club.Id}
              activeUser = {club.ActiveUsers}
              league ={club.ClubTypeId}
              link="VEIW DASHBORD"
              fans
              editLink={{ pathname: "/update-club", vendorInfo :club, }}
              to={{ pathname: "/dashbord-profile", clubInfo :club,  id : club.Id }}
            />
            )}
          </div>
          </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

export default ClubPage;
