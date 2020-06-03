import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../../pages/HomePage";
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
import { Layout, Menu, Breadcrumb } from "antd";
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
                  <div className="logo">
                    </div>
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
                    </SubMenu>
                  </Menu>
                </Sider>
                <Content >
                  <Route exact path="/" component={HomePage} />
                  <Route path="/companies" component={VendorPage} />
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
                  <Route path="/add-company" component={AddCompanyPage} />
                  <Route path="/add-branch" component={AddBranchPage} />
                  <Route path="/add-club" component={AddClubPage} />
                  <Route path="/invoice" component={PrintPage} />
                  <Route path="/offers" component={OffersPage} />
                  <Route path="/alerts" component={AlertsPage} />
                  <Route path="/add-offer" component={AddOfferPage} />
                  <Route path="/add-alert" component={AddAlertPage} />
                </Content>
              </Layout>
            </Content>
          </Layout>
        </Switch>
      </Router>
    );
  }
}
