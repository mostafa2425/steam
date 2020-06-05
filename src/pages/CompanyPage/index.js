import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from '../../containers/SideBarContainer'
import DunkinDonutsIcon from '../../images/logo-png.png'
import VendorCard from '../../containers/VendorCard'
import Starbuck from '../../images/Starbuck.png'
import McDonald from '../../images/McDonald.png'
import hunger from '../../images/hunger.jpg'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import {
  Container,
  PageContainer,
  PageSection,
  AddBtn,
  HeaderPageSection,
} from './StyledComponents';
import { Dropdown, Menu, Spin } from 'antd';
import { MoreOutlined, MailOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="">Edit</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/vendors">details</Link>
    </Menu.Item>
  </Menu>
);
class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId : null,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ companyId : "idd" })
    }, 500)
    
    console.log(this.props.location)
  }
  render() {

    return (
      <Container className="company-veiw-wrapper">
        <PageContainer>
          <HeaderPageSection>
          <Link to="/add-company" style={{ textDecoration: 'none', display: 'flex' }}>
            <button className="primary-fill">Add Company</button>
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection >
          {/* <div className="grid-holder">
          {[...Array(10)].map(card => 
            <>
            <div className="company-card">
            <Dropdown overlay={menu} trigger={['click']}>
              <MoreOutlined />
            </Dropdown>
            <div className="company-info">
              <img src={Starbuck} alt="company"/>
              <h4 className="name">Starbuck</h4>
            </div>
              <div className="active-tag">Active</div>
              <div className="company-detailes">
                <div>
                  <h5>Email:</h5>
                  <a href="mailto:info@tmakun.com">info@tmakun.com</a>
                </div>
                <div>
                  <h5>Phone:</h5>
                  <a href="tel:+966502074792">+966502074792</a>
                </div>
                <div>
                  <h5>Location:</h5>
                  <p>Riyadh</p>
                </div>
                <Link className="primary-fill" to="/vendors">View Vendors</Link>
              </div>
            </div>
            <div className="company-card">
            <Dropdown overlay={menu} trigger={['click']}>
              <MoreOutlined />
            </Dropdown>
            <div className="company-info"> 
              <img src={McDonald} alt="company"/>
              <h4 className="name">McDonald's KSA</h4>
            </div>
              <div className="inactive-tag">Active</div>
              <div className="company-detailes">
                <div>
                  <h5>Email:</h5>
                  <a href="mailto:info@tmakun.com">info@tmakun.com</a>
                </div>
                <div>
                  <h5>Phone:</h5>
                  <a href="tel:+966502074792">+966502074792</a>
                </div>
                <div>
                  <h5>Location:</h5>
                  <p>Riyadh</p>
                </div>
                <Link className="primary-fill" to="/vendors">View Vendors</Link>
              </div>
            </div>
            </>
            )}
            </div> */}
            {this.state.companyId ? 
          <>
          <div className="company-grid-holder">
            <VendorCard 
              name="Starbuck" 
              image={Starbuck} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
            <VendorCard 
              name="McDonald" 
              image={McDonald} 
              link="VEIW VENDOR" 
              location
              to="/vendors" 
            />
            <VendorCard 
              name="hunger" 
              image={hunger} 
              link="VEIW VENDOR" 
              location
              to="/vendors" 
            />
          <VendorCard 
              name="hunger" 
              image={hunger} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
            <VendorCard 
              name="Starbuck" 
              image={Starbuck} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
            <VendorCard 
              name="McDonald" 
              image={McDonald} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
          <VendorCard 
              name="McDonald" 
              image={McDonald} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
            <VendorCard 
              name="hunger" 
              image={hunger} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
            <VendorCard 
              name="Starbuck" 
              image={Starbuck} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
            />
            </div>
            </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

export default CompanyPage;
