import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Link } from "react-router-dom";
import moment from "moment";
import SideBarContainer from "../../containers/SideBarContainer";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  CalendarContainer,
  Title,
  AddBtn,
} from "./StyledComponents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { message, Spin } from "antd";

class OffersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("http://native-001-site2.ctempurl.com/api/GetOffers?Page=0")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            let offers = data.model;
            let calenderOffer = [];
            offers.map((offer) =>
              calenderOffer.push({
                Id: offer.Id,
                VendorId: offer.VendorId,
                ClubId: offer.ClubId,
                BannerImage: offer.BannerImage,
                title: offer.Description,
                titleAr: offer.DescriptionLT,
                start: moment(offer.StartDate).toDate(),
                end: moment(offer.EndDate).toDate(), 
              })
            );
            this.setState({ offers: calenderOffer, loading: false });
          });
        } else {
          message.error("Network response was not ok.");
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        message.error(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  localizer = momentLocalizer(moment);

  onOfferSelect = (e) => {
    console.log(e);
    // this.props.history.push("/update-offer");
    this.props.history.push({ pathname: "/update-offer", data: e });
  };

  render() {
    return (
      <Container className="add-offer-wrapper">
        <PageContainer>
          <HeaderPageSection>
            <Link
              to="/add-offer"
              style={{ textDecoration: "none", display: "flex" }}
            >
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
              {!this.state.loading ? (
                <Calendar
                  popup
                  localizer={this.localizer}
                  events={this.state.offers}
                  onSelectEvent={this.onOfferSelect}
                  // startAccessor="start"
                  // onView = { (view) => console.log(view) }
                  // endAccessor="end"
                  style={{ height: "800px", width: "100%", marginTop: "50px" }}
                  eventPropGetter={() => ({
                    style: {
                      backgroundColor: "#81b955",
                    },
                  })}
                />
              ) : (
                <Spin />
              )}
            </CalendarContainer>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default OffersPage;
