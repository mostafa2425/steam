import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Link } from 'react-router-dom';
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
import { message, Spin } from 'antd';

class OffersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers : [],
      loading : true
    }
  }

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetOffers?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let offers = data.model;
          let calenderOffer = []; 
         offers.map(offer => calenderOffer.push({title : offer.Description, start : moment(offer.StartDate).format('L'), end : moment(offer.EndDate).format('L')}))
         this.setState({offers : calenderOffer, loading : false})
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
  
  localizer = momentLocalizer(moment)

  render() {

    return (
      <Container className="add-offer-wrapper">
        
        <PageContainer>
          <HeaderPageSection>
            <Link to="/add-offer" style={{ textDecoration: 'none', display: 'flex' }}>
              <button className="primary-fill">Add Offer</button>
            </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection className="offer-page-wrapper">
            <CalendarContainer>
              <Title>Offers Calendar</Title>
              {!this.state.loading ? 
              <Calendar
                popup
                localizer={this.localizer}
                events={this.state.offers}
                startAccessor="start"
                endAccessor="end"
                style={{height: '800px', width: '100%', marginTop: '50px'}}
                eventPropGetter={() => ({
                  style: {
                    backgroundColor: '#81b955',
                  }
                })}
              /> : <Spin />}
              
            </CalendarContainer>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default OffersPage;
