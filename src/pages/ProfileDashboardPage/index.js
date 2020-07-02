import React from "react";
import SideBarContainer from "../../containers/SideBarContainer";
import SmallCard from "../../components/SmallCard";
import BarChart from "../../components/BarChart";
import DropdownList from "../../components/DropdownList";
import ComponyProfile from "../../components/ComponyProfile";
import TableComponent from "../../components/Table";
import UserAvatar from "../../images/avatar.jpg";
import Orders from "../../images/orders.png";
import Profit from "../../images/profit.png";
import Commission from "../../images/commission.png";
import CompanyLogo from "../../images/al-hilal.png";
import Email from "../../images/email.png";
import Phone from "../../images/phone.png";
import placeholderImage from "../../images/users.png";
import { Spin, message } from "antd";
import moment from "moment";
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  InformationPageSection,
} from "./StyledComponents";

class ProfileDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubId: null,
      clubInfo: null,
      loading: true, 
      orderCount: null,
      orderDay: null,
    };
  }
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) &&
      this.props.history.push("/login");
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    });
    if (this.props.match) {
      let clubId = +this.props.match.params.id.replace(":", "");
      fetch(
        `https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetClubStatisticsById?ClubId=${clubId}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let clubInfo = data.model;
              this.setState({
                clubInfo,
                loading: false,
                orderCount: clubInfo.BarCharts.map((order) => order.OrderCount),
                orderDay: clubInfo.BarCharts.map((order) =>
                  moment(order.Day).format("L")
                ),
              });
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
    }
  }

  covertTokFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
   }
   if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
   }
   if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
   }
   return num;
  }

  render() {
    const clubInfo = this.state.clubInfo;
    return (
      <Container>
        <PageContainer className="vendor-profile-wrapper">
          <HeaderPageSection>
            <DropdownList
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? (
            <>
              <InformationPageSection>
                <ComponyProfile
                  name={clubInfo && clubInfo.Name}
                  email={clubInfo && clubInfo.Email}
                  emailIcon={Email}
                  phone={clubInfo && clubInfo.Phone}
                  phoneIcon={Phone}
                  active
                  image={
                    clubInfo &&
                    `http://native-001-site2.ctempurl.com/images/clubimages/${clubInfo.Logo}`
                  }
                />
                <SmallCard
                  title="Total Orders"
                  image={Orders}
                  number={clubInfo && clubInfo.TotalOrders ?  this.covertTokFormatter(clubInfo.TotalOrders) : 0 }
                  transparent
                />
                <SmallCard
                  title="Profit"
                  image={Profit}
                  number={
                    clubInfo &&
                    `${clubInfo.TotalProfit ? this.covertTokFormatter(clubInfo.TotalProfit) : 0}`
                  }
                  transparent
                />
                <SmallCard
                  title="register users"
                  image={placeholderImage}
                  number={
                    clubInfo &&
                    `${clubInfo.ActiveUsers ? this.covertTokFormatter(clubInfo.ActiveUsers) : 0}`
                  }
                  transparent
                />
                <SmallCard
                  title="Club Commission"
                  image={Commission}
                  number={clubInfo && `${clubInfo.Percentage}%`}
                  transparent
                />
              </InformationPageSection>
              <PageSection>
                <BarChart
                  orderCount={this.state.orderCount && this.state.orderCount}
                  orderDay={this.state.orderDay && this.state.orderDay}
                  height={200}
                  title="Daily Orders"
                />
              </PageSection>
              {/* <PageSection>
            <TableComponent data={this.state.branches.length > 0 && this.state.branches} />
          </PageSection> */}
            </>
          ) : (
            <Spin />
          )}
        </PageContainer>
      </Container>
    );
  }
}

export default ProfileDashboardPage;
