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

class AlertsPage extends React.Component {

  localizer = momentLocalizer(moment)

  myEventsList = [
    {
      title: "test",
      start: "2019-12-03 02:00",
      end: "2019-12-03 06:59",
      up_down_ind: "N"
    },
    {
      title: "test2",
      start: "2019-12-03 07:00",
      end: "2019-12-03 23:59",
      up_down_ind: "Y"
    },
    {
      title: "test3",
      start: "2019-12-24 00:00",
      end: "2019-12-28 01:59",
      up_down_ind: "Y"
    },
  ];
  

  render() {

    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
            <Link to="/add-alert" style={{ textDecoration: 'none', display: 'flex' }}>
              <AddBtn>Add Alert</AddBtn>
            </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection>
            <CalendarContainer>
              <Title>Alerts Calendar</Title>
              <Calendar
                localizer={this.localizer}
                events={this.myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{height: '800px', width: '100%', marginTop: '50px'}}
                eventPropGetter={() => ({
                  style: {
                    backgroundColor: '#81b955',
                  }
                })}
              />
            </CalendarContainer>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default AlertsPage;
