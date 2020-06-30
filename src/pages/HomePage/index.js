import React from 'react';
import SideBarContainer from '../../containers/SideBarContainer'
import TopCard from '../../containers/TopCard'
import SmallCard from '../../components/SmallCard'
import BarChart from '../../components/BarChart'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import placeholderImage from '../../images/users.png'
import { setBranchesList, setClubsList } from '../../Dashboard/store/actions'; 
import Moment from 'moment'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
} from './StyledComponents';
import { Dropdown, Menu, Spin, message } from 'antd';
import { connect } from 'react-redux';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard : null,
      orderCount : null,
      orderDay : null,
      loading : true,
    }
  }
  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    fetch('http://native-001-site2.ctempurl.com/api/GetDashBoardHome', {
      method: 'GET',
      headers: myHeaders, 
    }).then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let dashboard = data.model;
          this.setState({dashboard, loading : false, 
            orderCount : dashboard.BarCharts.map(order => order.OrderCount), 
            orderDay : dashboard.BarCharts.map(order => Moment(order.Day).format('L'))})
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

    fetch('http://native-001-site2.ctempurl.com/api/GetClubs?Page=0', {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let clubs = data.model;
          this.props.dispatch(setClubsList(clubs)) 
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
      <Container className="dashboard-wrapper">
        <PageContainer className="dashboard-content">
        {!this.state.loading ? 
        <>
          <HeaderPageSection>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection className="card-wrapper">
            <SmallCard
              title="Total Sales"
              image={placeholderImage}
              number={`${this.state.dashboard ? this.state.dashboard.DashBoardStatistics.TotalSales : 0} SR`}
            />
            <SmallCard
              title="Total Orders"
              image={placeholderImage}
              number={`${this.state.dashboard ? this.state.dashboard.DashBoardStatistics.TotalOrders : 0}`}
            />
            <SmallCard 
              title="Total Users"
              image={placeholderImage}
              number={`${this.state.dashboard ? this.state.dashboard.DashBoardStatistics.TotalUsers : 0}`}
            />
            <SmallCard
              title="Active User"
              image={placeholderImage}
              number={`${this.state.dashboard && this.state.dashboard.DashBoardStatistics.ActiveUsersRatio.toFixed(2)}%`}
              isProgress
            />
          </PageSection>
          <PageSection>
            <BarChart
              height={400}
              title="Number Of Orders"
              orderCount={this.state.orderCount && this.state.orderCount}
              orderDay={this.state.orderDay && this.state.orderDay}
            />
          </PageSection>
          <PageSection className="top-venor-holder">
            <TopCard data={this.state.dashboard && this.state.dashboard.TopClubs} title="Top Club By Revenue" type="club" />
            <TopCard data={this.state.dashboard && this.state.dashboard.TopVendors} title="Top Venor By Revenue" type="Venor" />
          </PageSection>
          </>
          : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//       localization: state.common.currentResource,
//       locale: state.common.currentLocale
//   }
// }

export default connect()(HomePage);