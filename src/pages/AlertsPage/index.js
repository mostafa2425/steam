import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  CalendarContainer,
  Title,
  AddBtn,
} from './StyledComponents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Spin, message } from 'antd';

class AlertsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts : [],
      loading : true
    }
  }

  localizer = momentLocalizer(moment)

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetOffers?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let alerts = data.model;
          let calenderAlerts = []; 
          alerts.map(alert => calenderAlerts.push({title : alert.Description, start : moment(alert.StartDate).format('L'), end : moment(alert.EndDate).format('L')}))
         this.setState({alerts : calenderAlerts, loading : false})
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
      <Container className="add-offer-wrapper">
        
        <PageContainer>
          <HeaderPageSection>
            <Link to="/add-alert" style={{ textDecoration: 'none', display: 'flex' }}>
              {/* <AddBtn>Add Alert</AddBtn> */}
              <button className="primary-fill">Add Alert</button>
            </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection className="offer-page-wrapper">
            <CalendarContainer>
              <Title>Alerts Calendar</Title>
              {!this.state.loading ? 
              <Calendar
                localizer={this.localizer}
                events={this.state.alerts}
                startAccessor="start"
                endAccessor="end"
                style={{height: '800px', width: '100%', marginTop: '50px'}}
                eventPropGetter={() => ({
                  style: {
                    backgroundColor: '#81b955',
                  }
                })}
              />: <Spin />}
            </CalendarContainer>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default AlertsPage;
