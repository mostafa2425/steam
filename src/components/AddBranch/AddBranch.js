import React, { Component } from "react";
// import {GoogleMapReact} from 'google-map-react';
// import { GoogleMap, Marker } from "react-google-maps"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Switch,
  message,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import DropdownList from "../DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";
export default class AddBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 29.347202,
        lng: 30.867469200000002
      },
      zoom: 11,
      branchStutes : true,
      // this.onMapClicked = this.onMapClicked.bind(this);
    }
  }

  static defaultProps = {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh6FbV8FeEBGtnwkw1siI4XcpYEM7QyQQ&v=3.exp&libraries=geometry,drawing,places",
    }

    onMapClicked(props, map, e) {
      let location = this.state.position;
      location.lat = e.latLng.lat();
      location.lng = e.latLng.lng();

      this.setState({
          position: location
      })
      console.log(this.state.position);
  }

    CMap = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        center={{ lat: this.state.center.lat, lng: this.state.center.lng }}
        onClick ={ (e) => this.handleMapClick(e)} 
      >
          {props.children}
      </GoogleMap>
    ));

  formRef = React.createRef();
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
    });
    return marker;
   };

   addMarker = ({x, y, lat, lng, event}) => {
     console.log(lat,lng)
     this.setState({center : {lat, lng}},
      //  () => {this.renderMarkers(map, maps)}
       ) 
   }


  handelSubmit = (values, errors) => {
    console.log(values)
    this.setState({loadingBtn : true})
    // "Name":"Cocacola",
    // "NameLT":"كوكاكولا",
    // "Email":"cocavendor@yahoo.com",
    // "Phone":"0100000000",
    // "Enable":true,
    // "CompanyId":1,
    // "VendorId":1,
    // "Longitude":44.5,
    // "Latitude":55.2,
    // "Type":true,
    // "Password":"123456",
    // "ConfirmPassword":"123456"
    let data = {
    "Name":`${values.BranchReference}`,
    "NameLT":`${values.ArabicBranchReference}`,
    "Email":`${values.email}`,
    "Phone":`${values.phone}`,
    "Enable":this.state.branchStutes,
    "CompanyId":1,
    "VendorId":1,
    "Longitude":this.state.center.lng,
    "Latitude":this.state.center.lat,
    "type" : values.BranchType,
    "Password":values.password,
    "ConfirmPassword": values.confirm, 
}

fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/AddBranch", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    })
    .then( (response) => { 
      console.log(response)
      this.setState({loadingBtn : false})
      message.success("branch added successfully");
      this.formRef.current.resetFields(); 
    })
    .catch((error) => {
      this.setState({loadingBtn : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  handleMapClick = (e) => {
    this.setState({center : {lat : e.latLng.lat(), lng : e.latLng.lng()}})
    // console.log(e.latLng.lat())  
    // console.log('==> handleMapClick(..) : ' + lat + ',' + lng + ' (x=' + x + ',y=' + y + ')');
    }

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  changeBranchStutes = (value) => {
    this.setState({branchStutes : value})
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
                ref={this.formRef}
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
                  <Switch defaultChecked onChange={this.changeBranchStutes} />
                </Form.Item>
                <div className="map-wrapper">
                  <label>Branch Location</label>
                <div style={{ height: '50vh', width: '100%' }}>
                <this.CMap
                    googleMapURL={this.props.googleMapURL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center= {{ lat: this.state.center.lat, lng: this.state.center.lng }} 
                    // onClick={ this.handleMapClick }
                >
                    <Marker
                        position={{ lat: this.state.center.lat, lng: this.state.center.lng }}
                    />
                </this.CMap>
                {/* <GoogleMap
                  defaultZoom={8}
                  defaultCenter={{ lat: this.state.center.lat, lng: this.state.center.lng }}
                >
                  <Marker position={{ lat: this.state.center.lat, lng: this.state.center.lng }} />}
                </GoogleMap> */}
                {/* <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyBh6FbV8FeEBGtnwkw1siI4XcpYEM7QyQQ" }}
                  center ={this.state.center}
                  defaultZoom={this.state.zoom}
                  onDragend={this.centerMoved}
                  // onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                  onClick={this.addMarker}
                >
                </GoogleMapReact> */}
                  {/* <Marker lat={this.state.center.lat} lng={this.state.center.lng} /> */}
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
                    <Select.Option value="true">online store</Select.Option>
                    <Select.Option value="false">physical store</Select.Option>
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
                    loading={this.state.loadingBtn}
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
