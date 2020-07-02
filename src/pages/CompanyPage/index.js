import React from "react";
import { Link } from "react-router-dom";
import SideBarContainer from "../../containers/SideBarContainer";
import DunkinDonutsIcon from "../../images/logo-png.png";
import VendorCard from "../../containers/VendorCard";
import Starbuck from "../../images/Starbuck.png";
import McDonald from "../../images/McDonald.png";
import hunger from "../../images/hunger.jpg";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  Container,
  PageContainer,
  PageSection,
  AddBtn,
  HeaderPageSection,
} from "./StyledComponents";
import { Dropdown, Menu, Spin, message } from "antd";
import {
  MoreOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { setCompanyList } from "../../Dashboard/store/actions";
import { connect } from "react-redux";

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: null,
      loading: true,
    };
  }
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) &&
      this.props.history.push("/login");
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    });
    if (!this.props.CompanyList.length > 0) {
      fetch(
        "https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetCompanies?Page=0",
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let companies = data.model;
              this.setState({ companies, loading: false }, () => {
                this.props.dispatch(setCompanyList(companies));
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
    }else{
      this.setState({ companies: this.props.CompanyList, loading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.companies !== nextProps.CompanyList) {
      this.setState({ companies: nextProps.CompanyList });
    }
  }

  render() {
    return (
      <Container className="company-veiw-wrapper">
        <PageContainer>
          <HeaderPageSection>
            <Link
              to="/add-company"
              style={{ textDecoration: "none", display: "flex" }}
            >
              <button className="primary-fill">Add Company</button>
            </Link>
            <DropdownList
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? (
            <>
              <div className="company-grid-holder">
                {this.state.companies &&
                  this.state.companies.map((company, i) => (
                    <VendorCard
                      key={i}
                      name={company.Name}
                      email={company.Email}
                      status={company.Enable}
                      phone={company.Phone}
                      HeadQuarter={company.HeadQuarter}
                      cardId={company.Id}
                      image={false}
                      link="VEIW VENDOR"
                      editLink={{
                        pathname: "/update-company",
                        vendorInfo: company,
                      }}
                      isCompany
                      location
                      to="/company-vendor"
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

// export default CompanyPage;

const mapStateToProps = (state) => {
  return {
    CompanyList: state.dashboard.CompanyList,
  };
};

export default connect(mapStateToProps)(CompanyPage);
