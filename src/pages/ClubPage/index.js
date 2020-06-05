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
import { Spin } from 'antd';

class ClubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubsId : null,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ clubsId : "idd" })
    }, 500)
    
    console.log(this.props.location)
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
          {/* <PageSection className="club-card-list first-list"> */}
          {this.state.clubsId ? 
          <>
          <div className="club-card-list">
            <VendorCard 
              name="Al Hilal" 
              image={AlhilalIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
            <VendorCard 
              name="Al Ahly" 
              image={AlahlyIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
            <VendorCard 
              name="Al Ittihad" 
              image={AlittihadIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
          {/* </PageSection> */}
          {/* <PageSection className="club-card-list"> */}
            <VendorCard 
              name="Al Hilal" 
              image={AlhilalIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
            <VendorCard 
              name="Al Ahly" 
              image={AlahlyIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
            <VendorCard 
              name="Al Ittihad" 
              image={AlittihadIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
          {/* </PageSection> */}
          {/* <PageSection className="club-card-list"> */}
            <VendorCard 
              name="Al Hilal" 
              image={AlhilalIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
            <VendorCard 
              name="Al Ahly" 
              image={AlahlyIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
            <VendorCard 
              name="Al Ittihad" 
              image={AlittihadIcon} 
              link="VEIW DASHBORD"
              fans
              to={{ pathname: "/dashbord-profile", id : "ddd"}}
            />
          {/* </PageSection> */}
          </div>
          </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

export default ClubPage;
