import React from "react";
import { Link } from "react-router-dom";
import SideBarContainer from "../../containers/SideBarContainer";
import SmallCard from "../../components/SmallCard";
import BarChart from "../../components/BarChart";
import DropdownList from "../../components/DropdownList";
import ComponyProfile from "../../components/ComponyProfile"; 
import TableComponent from "../../components/Table";
import UserAvatar from "../../images/avatar.jpg";
import Orders from "../../images/orders.png";
import Profit from "../../images/profit.png";
import Invouces from "../../images/invoice.png";
import Active from "../../images/active.png";
import CompanyLogo from "../../images/logo-png.png";
import Email from "../../images/email.png";
import Phone from "../../images/phone.png";
import Moment from "moment";
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
  InformationPageSection,
  AddBtn,
} from "./StyledComponents";
import { Spin, message } from "antd";
import { connect } from "react-redux";

class VendorProfileDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      vendorId: null,
      VendorInfo: null,
    };
  }
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    if (this.props.match) {
      let vendorId = +this.props.match.params.id.replace(":", "");
      this.setState({ vendorId }, () => {
        fetch(
          `https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendorStatistics?VendorId=${vendorId}`, {
            method: 'GET',
            headers: myHeaders, 
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                let VendorInfo = data.model;
                console.log(VendorInfo);

                this.setState({ VendorInfo, loading: false });
                // this.setState({branches, loading : false}, () => {
                // })
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
      });
      // let filterdBranches = this.state.branches.filter(branch => branch.VendorId === +vendorId)
      // console.log(filterdBranches)
      // this.setState({ branches : filterdBranches})
    }
  }
  render() {
    return (
      <Container>
        <PageContainer className="vendor-profile-wrapper">
          <HeaderPageSection>
            <Link
              to={{
                pathname: "/add-branch",
                vendorName: "vendorName",
                vendorId: this.state.vendorId,
              }}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <button className="primary-fill">Add Branch</button>
            </Link>
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
                  name={
                    this.state.VendorInfo && this.state.VendorInfo.Vendor.Name
                  }
                  email={
                    this.state.VendorInfo && this.state.VendorInfo.Vendor.Email
                  }
                  active={
                    this.state.VendorInfo && this.state.VendorInfo.Vendor.Enable
                  }
                  emailIcon={Email}
                  phone={
                    this.state.VendorInfo && this.state.VendorInfo.Vendor.Phone
                  }
                  phoneIcon={Phone}
                  image={
                    this.state.VendorInfo &&
                    `http://native-001-site2.ctempurl.com/images/vendorimages/${this.state.VendorInfo.Vendor.Logo}`
                  }
                />
                <SmallCard
                  title="Total Orders"
                  image={Orders}
                  number={
                    this.state.VendorInfo && this.state.VendorInfo.TotalOrders
                  }
                  transparent
                />
                <SmallCard
                  title="Amount due"
                  image={Profit}
                  number={
                    this.state.VendorInfo && this.state.VendorInfo.TotalAmount
                  }
                  transparent
                />
                <SmallCard
                  title="invoices"
                  image={Invouces}
                  number={
                    this.state.VendorInfo && this.state.VendorInfo.TotalInvoices
                  }
                  transparent
                  isInvoice
                />
                <SmallCard
                  title="Active Beanches"
                  image={Active}
                  number={
                    this.state.VendorInfo &&
                    this.state.VendorInfo.ActiveBranchesCount
                  }
                  transparent
                />
              </InformationPageSection>
              <PageSection>
                <BarChart
                  height={200}
                  title="Daily Sales"
                  orderCount={
                    this.state.VendorInfo &&
                    this.state.VendorInfo.BarCharts.map(
                      (order) => order.OrderCount
                    )
                  }
                  orderDay={
                    this.state.VendorInfo &&
                    this.state.VendorInfo.BarCharts.map((order) =>
                      Moment(order.Day).format("L")
                    )
                  }
                />
              </PageSection>
              <PageSection>
                <TableComponent
                  data={
                    this.state.VendorInfo ? this.state.VendorInfo.Branches : []
                  }
                />
              </PageSection>
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
    brnachesList: state.dashboard.branchesList,
  };
};

export default connect(mapStateToProps)(VendorProfileDashboardPage);
