import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CompanyPage from "../../pages/CompanyPage";
import VendorPage from "../../pages/VendorPage";
import ClubPage from "../../pages/ClubPage";
import ProfileDashboardPage from "../../pages/ProfileDashboardPage";
import VendorProfileDashboardPage from "../../pages/VendorProfileDashboardPage";
import InvoicePage from "../../pages/InvoicePage";
import PrintPage from "../../pages/PrintPage";
import OffersPage from "../../pages/OffersPage";
import AlertsPage from "../../pages/AlertsPage";
import history from "../../history";
import Logo from "../../images/logow.png";
import { Layout, Menu, Spin } from "antd";
import {
  SkinOutlined,
  HomeOutlined,
  ApartmentOutlined,
  TransactionOutlined,
  PrinterOutlined,
  PercentageOutlined,
  SoundOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import AddCompany from "../../components/AddCompany/AddCompany";
import AddBranch from "../../components/AddBranch/AddBranch";
import AddVendor from "../../components/AddVendor/AddVendor";
import AddClub from "../../components/AddClub/AddClub";
import AddOffer from "../../pages/AddOffer/AddOffer";
import AddAlert from "../../pages/AddAlert/AddAlert";
import NotFound from "../../components/NotFound/NotFound";
import UpdateVendor from "../../components/UpdateVendor/UpdateVendor";
import UpdateClub from "../../components/UpdateClub/UpdateClub";
import UpdateCompany from "../../components/UpdateCompany/UpdateCompany";
import CompanyVendorPage from "../../pages/CompanyVendorPage";
import UpdateBranch from "../../components/UpdateBranch/UpdateBranch";
import UpdateInvoice from "../../pages/UpdateInvoice/UpdateInvoice";
import UpdateOffer from "../../pages/UpdateOffer/UpdateOffer";

import { createBrowserHistory } from "history";
import Login from "../../pages/Login/Login";
import UpdateAlert from "../../pages/UpdateAlert/UpdateAlert";
import { formValueSelector } from "redux-form";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const mq = window.matchMedia("(max-width: 480px)");

export default class LayoutSite extends Component {
  state = {
    collapsed: false,
    screenSize: mq.matches ? true : false,
    loggedin: false,
  };
  componentDidMount() {
    JSON.parse(localStorage.getItem("token")) ? this.setState({loggedin : true}) : this.setState({loggedin : false})
    mq.addListener((e) => {
      this.setState({
        screenSize: e.matches ? true : false,
      });
    });
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const {loggedin} = this.state
    return (
      <Router history={history}>
        { !loggedin && <Redirect to="/login" />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Layout>
            <Content className="root-wrapper">
              <Layout
                className="site-layout-background"
                style={{ padding: "90px 0 30px 0" }}
              >
                <Sider
                  className="site-layout-background"
                  collapsible
                  collapsedWidth={this.state.collapsedWidth}
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
                  width="230px"
                  breakpoint="md"
                >
                  <Link className="sidebar-logo" to="/">
                    <img src={Logo} alt="Logo" />
                  </Link>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%" }}
                    className="main-contant"
                  >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                      <Link to="/" />
                      Dashbord
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShopOutlined />}>
                      <Link to="/companies" />
                      company
                    </Menu.Item>
                    <Menu.Item key="11" icon={<ApartmentOutlined />}>
                      <Link to="/vendors" />
                      vendors
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SkinOutlined />}>
                      <Link to="/clubs" />
                      clubs
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PrinterOutlined />}>
                      <Link to="/brand-invoice" />
                      Invoice
                    </Menu.Item>
                    <SubMenu
                      key="sub2"
                      icon={<TransactionOutlined />}
                      title="offers"
                    >
                      <Menu.Item key="5" icon={<PercentageOutlined />}>
                        <Link to="/Offers" />
                        Offers
                      </Menu.Item>
                      <Menu.Item key="6" icon={<SoundOutlined />}>
                        <Link to="/alerts" />
                        alerts
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Suspense fallback={<Spin />}>
                  <Content>
                    {/* {!JSON.parse(localStorage.getItem("token")) && (
                      <Redirect exact to="login" />
                    )} */}
                    {/* {  JSON.parse(localStorage.getItem("token")) ? console.log("true",JSON.parse(localStorage.getItem("token"))) : console.log("false",JSON.parse(localStorage.getItem("token")))  } */}
                    {/* <Route exact path="/" component={HomePage} /> */}
                    <Route
                      exact
                      path="/"
                      component={HomePage}
                    />
                    <Route path="/companies" component={CompanyPage} />
                    <Route path="/vendors" component={VendorPage} />
                    <Route path="/clubs" component={ClubPage} />
                    <Route
                      path="/dashbord-profile/:id"
                      component={ProfileDashboardPage}
                    />
                    <Route
                      path="/vendor-profile/:id"
                      component={VendorProfileDashboardPage}
                    />

                    <Route path="/brand-invoice" component={InvoicePage} />
                    <Route path="/add-company" component={AddCompany} />
                    <Route path="/add-branch" component={AddBranch} />
                    <Route path="/update-branch" component={UpdateBranch} />
                    <Route path="/add-club" component={AddClub} />
                    <Route path="/invoice" component={PrintPage} />
                    <Route path="/update-invoice" component={UpdateInvoice} />
                    <Route path="/offers" component={OffersPage} />
                    <Route path="/alerts" component={AlertsPage} />
                    <Route path="/add-offer" component={AddOffer} />
                    <Route path="/update-offer" component={UpdateOffer} />
                    <Route path="/add-alert" component={AddAlert} />
                    <Route path="/update-alert" component={UpdateAlert} />
                    <Route path="/add-vendor" component={AddVendor} />
                    <Route path="/update-vendor" component={UpdateVendor} />
                    <Route path="/update-club" component={UpdateClub} />
                    <Route path="/update-company" component={UpdateCompany} />
                    <Route
                      path="/company-vendor"
                      component={CompanyVendorPage}
                    />
                    <Route component={NotFound} />
                    {/* <Route path="/add-branch2" component={AddBranch} /> */}
                    {/* <Route path="/test" component={AddCompany} /> */}
                  </Content>
                </Suspense>
              </Layout>
            </Content>
          </Layout>
        </Switch>
      </Router>
    );
  }
}
