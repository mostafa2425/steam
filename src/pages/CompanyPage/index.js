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
import { Dropdown, Menu, Spin, message } from 'antd';
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
      companies : null,
      loading : true,
    }
  }
  componentDidMount() {
    fetch('http://native-001-site2.ctempurl.com/api/GetCompanies?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let companies = data.model;
          console.log(companies)
          this.setState({companies, loading : false})
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
            {!this.state.loading ? 
          <>
          <div className="company-grid-holder">
          {this.state.companies && this.state.companies.map(company =>
            <VendorCard 
              name={company.Email}
              email = {company.Email}
              status={company.Enable}
              phone={company.Phone}
              HeadQuarter={company.HeadQuarter}
              image={false} 
              link="VEIW VENDOR" 
              location
              to="/vendors"
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

export default CompanyPage;
