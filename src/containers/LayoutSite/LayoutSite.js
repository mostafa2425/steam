import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CompanyPage from "../../pages/CompanyPage";
import VendorPage from "../../pages/VendorPage";
import ClubPage from "../../pages/ClubPage";
import ProfileDashboardPage from "../../pages/ProfileDashboardPage";
import VendorProfileDashboardPage from "../../pages/VendorProfileDashboardPage";
import InvoicePage from "../../pages/InvoicePage";
import AddCompanyPage from "../../pages/AddCompanyPage";
import AddBranchPage from "../../pages/AddBranchPage";
import AddClubPage from "../../pages/AddClubPage";
import PrintPage from "../../pages/PrintPage";
import OffersPage from "../../pages/OffersPage"; 
import AlertsPage from "../../pages/AlertsPage";
import AddOfferPage from "../../pages/AddOfferPage";
import AddAlertPage from "../../pages/AddAlertPage"; 
import Logo from '../../images/wla-logo.jpeg'
import { Layout, Menu, Spin  } from "antd";
import {
    SkinOutlined,
    HomeOutlined,
    ApartmentOutlined,
    TransactionOutlined ,
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
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const mq = window.matchMedia( "(max-width: 480px)" );


export default class LayoutSite extends Component {
  state = {
    collapsed: false,
    screenSize: mq.matches ? true : false
  };
componentDidMount() {
  mq.addListener((e) => {
    this.setState({
      screenSize: e.matches ? true : false
    })
  })
}

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  
  render() {
    return (
      <Router>
        <Switch>
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
                      <img src={Logo} alt="Logo"/>
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
                    <Menu.Item key="3" icon={<SkinOutlined  />}>
                      <Link to="/clubs" />
                      clubs
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PrinterOutlined />}>
                      <Link to="/brand-invoice" />
                      Invoice
                    </Menu.Item>
                    <SubMenu
                      key="sub2"
                      icon={<TransactionOutlined  />}
                      title="offers"
                    >
                      <Menu.Item key="5"  icon={<PercentageOutlined />}>
                        <Link to="/Offers" />
                        Offers
                      </Menu.Item>
                      <Menu.Item key="6" icon={<SoundOutlined />}>
                        <Link to="/alerts" />
                        alerts
                      </Menu.Item>
                      {/* <Menu.Item key="7" icon={<SoundOutlined />}>
                        <Link to="/test" />
                        add company
                      </Menu.Item>
                      <Menu.Item key="8" icon={<SoundOutlined />}>
                        <Link to="/add-branch2" />
                        Add Branch
                      </Menu.Item> */}
                    </SubMenu>
                  </Menu>
                </Sider>
                <Suspense fallback={<Spin />}>
                <Content >
                  <Route exact path="/" component={HomePage} />
                  <Route path="/companies" component={CompanyPage} />
                  <Route path="/vendors" component={VendorPage} />
                  <Route path="/clubs" component={ClubPage} />
                  <Route
                    path="/dashbord-profile"
                    component={ProfileDashboardPage}
                  />
                  <Route
                    path="/vendor-profile"
                    component={VendorProfileDashboardPage}
                  />
                  <Route path="/brand-invoice" component={InvoicePage} />
                  <Route path="/add-company" component={AddCompany} />
                  <Route path="/add-branch" component={AddBranch} />
                  {/* <Route path="/add-clubb" component={AddClubPage} /> */}
                  <Route path="/add-club" component={AddClub} /> 
                  <Route path="/invoice" component={PrintPage} /> 
                  <Route path="/offers" component={OffersPage} />
                  <Route path="/alerts" component={AlertsPage} />
                  <Route path="/add-offer" component={AddOffer} />
                  <Route path="/add-alert" component={AddAlert} />
                  <Route path="/add-vendor" component={AddVendor} /> 
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
