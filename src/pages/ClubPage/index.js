import React from "react";
import { Link } from "react-router-dom";
import VendorCard from "../../containers/VendorCard";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  Container,
  PageContainer,
  HeaderPageSection,
} from "./StyledComponents";
import { Spin, message } from "antd";
import { setClubsList } from "../../Dashboard/store/actions";
import { connect } from "react-redux";

class ClubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: null,
      loading: true,
    };
  }
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    if (!this.props.clubsList.length > 0) {
      fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetClubs?Page=0", {
        method: 'GET',
        headers: myHeaders, 
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let clubs = data.model;
              this.setState({ clubs, loading: false });
              this.props.dispatch(setClubsList(clubs))
            });
          } else {
            message.error("Network response was not ok.");
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          message.error(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });
    } else {
      this.setState({ clubs: this.props.clubsList, loading: false });
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.clubs !== nextProps.clubsList){
      this.setState({clubs : nextProps.clubsList}) 
    }
  }

  render() {
    return (
      <Container>
        <PageContainer className="club-wrapper">
          <HeaderPageSection>
            <Link
              to="/add-club"
              style={{ textDecoration: "none", display: "flex" }}
            >
              {/* <AddBtn>Add Club</AddBtn> */}
              <button className="primary-fill">Add Club</button>
            </Link>
            <DropdownList
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? (
            <>
              <div className="club-card-list">
                {this.state.clubs &&
                  this.state.clubs.map((club, i) => (
                    <VendorCard
                      key={i}
                      name={club.Name}
                      image={club.Logo}
                      email={club.Email}
                      status={club.Enable}
                      phone={club.Phone}
                      cardId={club.Id}
                      activeUser={club.ActiveUsers}
                      league={club.ClubTypeId}
                      link="VEIW DASHBORD"
                      fans
                      editLink={{ pathname: "/update-club", vendorInfo: club }}
                      to={{
                        pathname: `/dashbord-profile/:${club.Id}`,
                        clubInfo: club,
                        id: club.Id,  
                      }}
                    />
                  ))}
              </div>
            </>
          ) : (
            <Spin />
          )}
        </PageContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clubsList: state.dashboard.clubsList,
  };
};

export default connect(mapStateToProps)(ClubPage);
