import React from "react";
import { Link } from "react-router-dom";
import SideBarContainer from "../../containers/SideBarContainer";
import VendorCard from "../../containers/VendorCard";
import DunkinDonutsIcon from "../../images/logo-png.png";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  Container,
  PageContainer,
  PageSection,
  AddBtn,
  HeaderPageSection,
} from "./StyledComponents";
import { Spin, message, Result } from "antd";

class CompanyVendorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: null,
      loading: true,
    };
  }

  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    });
    if (this.props.location.companyId) {
      fetch(
        `http://native-001-site2.ctempurl.com/api/GetVendorsByCompanyId?CompanyId=${this.props.location.companyId}&page=0`,
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let vendors = data.model;
              this.setState({ vendors, loading: false });
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
      this.props.history.push("/companies");
    }
  }

  render() {
    return (
      <Container>
        <PageContainer className="vendor-page-wrapper">
          <HeaderPageSection>
            <Link
              to={{
                pathname: "/add-vendor",
                companyVendorId: this.props.location.companyId,
              }}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <button className="primary-fill">Add Vendor</button>
            </Link>
            <DropdownList
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? (
            <>
              {this.state.vendors.length > 0 ? (
                <div className="vendor-card-list">
                  {this.state.vendors.map((vendor, i) => (
                    <VendorCard
                      key={i}
                      name={vendor.Name}
                      image={vendor.Logo}
                      email={vendor.Email}
                      status={vendor.Enable}
                      link="Veiw Dashboard"
                      phone={vendor.Phone}
                      cardId={vendor.Id}
                      editLink={{
                        pathname: "/update-vendor",
                        vendorInfo: vendor,
                      }}
                      location
                      to={`/vendor-profile/:${vendor.Id}`}
                    />
                  ))}
                </div>
              ) : (
                <Result
                  status="404"
                  title="No Vendors added"
                  extra={
                    <Link
                      className="primary-fill"
                      to="/companies"
                      type="primary"
                    >
                      Back To copmany
                    </Link>
                  }
                />
              )}
            </>
          ) : (
            <Spin />
          )}
        </PageContainer>
      </Container>
    );
  }
}

export default CompanyVendorPage;
