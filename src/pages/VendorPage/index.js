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
import { Spin } from 'antd';

class VendorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorsId : null,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ vendorsId : "idd" })
    }, 500)
    
    console.log(this.props.location)
  }
  render() {

    return (
      <Container >
        
        <PageContainer className="vendor-page-wrapper">
          <HeaderPageSection>
          <Link to="/add-vendor" style={{ textDecoration: 'none', display: 'flex' }}>
            <button className="primary-fill">Add Vendor</button> 
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {this.state.vendorsId ? 
          <>
          <div className="vendor-card-list">
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon}  
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
          
            <VendorCard 
              name="Dunkin Donuts"    
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            <VendorCard 
              name="Dunkin Donuts" 
              image={DunkinDonutsIcon} 
              link="Veiw Dashboard" 
              location
              to="/vendor-profile"
            />
            </div>
            </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

export default VendorPage;
