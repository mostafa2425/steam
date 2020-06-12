import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from '../../containers/SideBarContainer'
import SmallCard from '../../components/SmallCard'
import BarChart from '../../components/BarChart'
import DropdownList from '../../components/DropdownList'
import ComponyProfile from '../../components/ComponyProfile'
import TableComponent from '../../components/Table'
import UserAvatar from '../../images/avatar.jpg'
import Orders from '../../images/orders.png'
import Profit from '../../images/profit.png'
import Invouces from '../../images/invoice.png'
import Active from '../../images/active.png'
import CompanyLogo from '../../images/logo-png.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  InformationPageSection,
  AddBtn,
} from './StyledComponents';
import { Spin, message } from 'antd';
import { connect } from 'react-redux';

class VendorProfileDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches : [],
    }
  }
  componentDidMount() {
    
    if(!this.props.brnachesList.length > 0){
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetBranches?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let branches = data.model;
          this.setState({branches, loading : false})
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
  }else{
    this.setState({branches : this.props.brnachesList, loading : false})
  }
  console.log("in dashboard vendor and club")
  console.log(this.props.match && this.props.match.params.id)
  console.log(this.props)
  }
  render() {
    
    return (
      <Container>
        
        <PageContainer className="vendor-profile-wrapper">
          <HeaderPageSection>
          <Link to={{pathname : "/add-branch", vendorName : "vendorName"}} style={{ textDecoration: 'none', display: 'flex' }}>
            <button className="primary-fill">Add Branch</button> 
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? 
          <>
          <InformationPageSection>
            <ComponyProfile 
              name="Dunkin Donuts"
              email="hithere@hello.net"
              emailIcon={Email}
              phone="0554327899"
              phoneIcon={Phone}
              image={CompanyLogo}
            />
            <SmallCard
              title="Total Orders"
              image={Orders}
              number="100K"
              transparent
            />
            <SmallCard
              title="Amount due"
              image={Profit}
              number="14.6 K"
              transparent
            />
            <SmallCard
              title="invoices"
              image={Invouces}
              number="5"
              transparent
              isInvoice
            />
            <SmallCard
              title="Active Beanches"
              image={Active}
              number="3"
              transparent
            />
          </InformationPageSection>
          <PageSection>
            <BarChart 
              height={200}
              title="Daily Sales"
            />
          </PageSection>
          <PageSection>
            <TableComponent data={this.state.branches.length > 0 && this.state.branches} />
          </PageSection>
          </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
      brnachesList: state.dashboard.branchesList,
  }
}

export default connect(mapStateToProps)(VendorProfileDashboardPage);
