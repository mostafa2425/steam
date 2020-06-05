import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Switch,
  message,
} from "antd";
import { Link } from "react-router-dom";
import DropdownList from "../DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class AddBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 29.347202,
        lng: 30.867469200000002
      },
      zoom: 11,
    }
  }


  componentDidMount() {
    if (navigator && navigator.geolocation) 
    { 
      navigator.geolocation.getCurrentPosition(pos => { 
        console.log(443322, pos);
        var coords = pos.coords; this.setState({ center: { lat: coords.latitude, lng: coords.longitude } }); }); }

  }
  
   renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
    position: { lat: this.state.center.lat, lng: this.state.center.lng },
    map,
    title: 'Hello World!'
    });
    return marker;
   };

   addMarker = ({x, y, lat, lng, event}) => {
     this.setState({center : {lat, lng}},
      //  () => {this.renderMarkers(map, maps)}
       ) 
   }

  handelSubmit = (values, errors) => {
    message.success("branch added successfully");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  changeCompanyStutes = (value) => {
    console.log(value);
  };

  render() {
    return (
      <Container>
        <PageContainer>
          <div className="add-company-form">
            <HeaderPageSection>
              <DropdownList
                title="user name"
                list={["Edit Profile", "Notification", "Logout"]}
                titleImage={UserAvatar}
              />
            </HeaderPageSection>
            <div className="form-holder">
              <h2>Add Branch</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                onFinishFailed={this.onFinishFailed}
              >
                <h4>Branch Info:</h4>
                <Form.Item
                  name="BranchReference"
                  label="Branch Reference"
                  rules={[
                    {
                      required: true,
                      message: "Please input your branch Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ArabicBranchReference"
                  label="Arabic Branch Reference"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Arabic branch Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Enable" name="branchStutes">
                  <Switch defaultChecked onChange={this.changeCompanyStutes} />
                </Form.Item>
                <div className="map-wrapper">
                  <label>Branch Location</label>
                <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyBh6FbV8FeEBGtnwkw1siI4XcpYEM7QyQQ" }}
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
                  onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                  onClick={this.addMarker}
                >
                  {/* <Marker lat={this.state.center.lat} lng={this.state.center.lng} /> */}
                </GoogleMapReact>
              </div>
              </div>
                <h4>Branch Info:</h4>
                <Form.Item
                  name="phone"
                  label="Branch Contact Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    // {
                    //   len: 11,
                    //   // message: "phone number should",
                    // },
                    //   {
                    //       min : 6
                    //     },
                    //   {
                    //       max : 6
                    //     }
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Branch Email Account"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="BranchUsername"
                  label="Branch Username"
                  rules={[
                    {
                      required: true,
                      message: "Please input Branch Username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Branch Type"
                  name="BranchType"
                  rules={[
                    {
                      required: true,
                      message: "Please select branch Type",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="online">online store</Select.Option>
                    <Select.Option value="physical">physical store</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="btn-action">
                  <Button
                    type="primary"
                    className="primary-fill xlg-btn mr-20"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                  <Button className="grayscale-fill xlg-btn">Cancel</Button>
                </div>
              </Form>
            </div>
          </div>
        </PageContainer>
      </Container>
    );
  }
}
