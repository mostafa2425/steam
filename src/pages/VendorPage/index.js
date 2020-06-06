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
    fetch('http://native-001-site2.ctempurl.com/api/GetVendors?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let vendors = data.model;
          console.log(vendors)
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
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? 
          <>
          {/* CompanyId: 0
          DeletedAt: null
          Description: ""
          Email: "starbucks@yahoo.com"
          Enable: true
          Id: 1
          IdentityId: ""
          Industry: ""
          Logo: "starbucks.png"
          Name: "starbucks"
          NameLT: "ستاربكس"
          Percentage: 10
          Phone: "965507845591"
          RegisterationDate: "2020-05-25T00:00:00"
          VendorTypeId: 1 */}
          <div className="vendor-card-list">
            {this.state.vendors && this.state.vendors.map(vendor =>
            <VendorCard 
            name={vendor.Name}
            image={vendor.Logo}
            email = {vendor.Email}
            status={vendor.Enable}
            link="Veiw Dashboard" 
            phone={vendor.Phone}
            location
            to="/vendor-profile"
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
