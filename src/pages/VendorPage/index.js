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
import { Spin,message } from 'antd';

class VendorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors : null,
      loading : true,
    }
  }
  
  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    fetch('http://native-001-site2.ctempurl.com/api/GetVendors?Page=0', {
      method: 'GET',
      headers: myHeaders, 
    }).then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let vendors = data.model;
          this.setState({vendors, loading : false})
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
      <Container >
        
        <PageContainer className="vendor-page-wrapper">
          <HeaderPageSection>
          <Link to="/add-vendor" style={{ textDecoration: 'none', display: 'flex' }}>
            <button className="primary-fill">Add Vendor</button> 
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? 
          <>
          <div className="vendor-card-list">
            {this.state.vendors && this.state.vendors.map( (vendor, i )=>
            <VendorCard 
              index={i}
              name={vendor.Name}
              image={vendor.Logo}
              email = {vendor.Email}
              status={vendor.Enable}
              link="Veiw Dashboard" 
              phone={vendor.Phone}
              cardId ={vendor.Id}
              editLink={{ pathname: "/update-vendor", vendorInfo :vendor, }}
              // editLink={`/update-vendor`}
              location
              to={`/vendor-profile/:${vendor.Id}`}
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

export default VendorPage;
