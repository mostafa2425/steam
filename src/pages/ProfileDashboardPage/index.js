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
      branches: [],
    };
  }
  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    fetch("http://native-001-site2.ctempurl.com/api/GetBranches?Page=0", {
      method: 'GET',
      headers: myHeaders, 
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            let branches = data.model;
            console.log(branches);
            this.setState({ branches, loading: false });
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
  render() {
    return (
      <Container>
        <PageContainer className="vendor-profile-wrapper">
          <HeaderPageSection>
            <DropdownList
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.clubId ? (
            <>
              <InformationPageSection>
                <ComponyProfile
                  name="Al Hilal"
                  email="hithere@hello.net"
                  emailIcon={Email}
                  phone="0554327899"
                  phoneIcon={Phone}
                  active
                  image={CompanyLogo}
                />
                <SmallCard
                  title="Total Orders"
                  image={Orders}
                  number="100K"
                  transparent
                />
                <SmallCard
                  title="Profit"
                  image={Profit}
                  number="14.6 K"
                  transparent
                />
                <SmallCard
                  title="register users"
                  image={placeholderImage}
                  number="3 K"
                  transparent
                />
                <SmallCard
                  title="Club Commission"
                  image={Commission}
                  number="10%"
                  transparent
                />
              </InformationPageSection>
              <PageSection>
                <BarChart height={200} title="Daily Orders" />
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
