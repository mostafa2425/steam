import React, { Component } from "react";
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
export default class UpdateBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 29.347202,
        lng: 30.867469200000002
      },
      zoom: 11,
      branchStutes : true,
      branchType : "false",
      VendorId : null
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
    
    if(this.props.location.data){
      const {Name, NameLT, Phone, Enable, Email, Latitude, Longitude, Password, ConfirmPassword, Type, VendorId, VendorTypeName, Id } = this.props.location.data;
      this.props.location.vendorName && this.formRef.current.setFieldsValue({
        vendorName :  this.props.location.vendorName
      })
      if(Longitude){
        this.setState({ center: { lat: Latitude, lng: Longitude } });
      }else{
        if (navigator && navigator.geolocation){ 
          navigator.geolocation.getCurrentPosition(pos => { 
          var coords = pos.coords; this.setState({ center: { lat: coords.latitude, lng: coords.longitude } }); }); }
        }
        this.formRef.current.setFieldsValue({
          vendorName: VendorTypeName,
          BranchReference: Name,
          ArabicBranchReference: NameLT,
          email: Email,
          phone: Phone,
          BranchType : `${Type}`, 
          password : Password,
          confirm : ConfirmPassword,
        })
        this.setState({Enable : Enable, VendorId ,branchId : Id, branchType : Type}) 
      }else{
        this.props.history.push("/vendors");
      }
    }

  handelSubmit = (values, errors) => {
    this.setState({loadingBtn : true})
    let data = {
    "Id": this.state.branchId,
    "Name":`${values.BranchReference}`,
    "NameLT":`${values.ArabicBranchReference}`,
    "Email":`${values.email}`,
    "Phone":`${values.phone}`,
    "Enable":this.state.branchStutes,
    "VendorId": this.state.VendorId,
    "Longitude":this.state.center.lng,
    "Latitude":this.state.center.lat,
    "type" : values.BranchType,
    "Password":values.password,
    "ConfirmPassword": values.confirm, 
}

fetch("http://native-001-site2.ctempurl.com/api/EditBranch", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem("token")),

      },
      body: JSON.stringify(data) 
    })
    .then( (response) => { 
      this.setState({loadingBtn : false})
      message.success("branch Updated successfully");
      this.props.history.push("/vendors");
    })
    .catch((error) => {
      this.setState({loadingBtn : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  handleMapClick = (e) => {
    this.setState({center : {lat : e.latLng.lat(), lng : e.latLng.lng()}})
    }

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  changeBranchStutes = (value) => {
    this.setState({branchStutes : value})
  };
  onChangeBranchType = (value) => {
    console.log(value)
    this.setState({branchType : value})
  };

  render() {
    return (
      <Container>
        <PageContainer>
          <div className="add-company-form">
            <HeaderPageSection>
              <DropdownList
                title="user name"
                list={["Edit Profile", "Notification"]}
                titleImage={UserAvatar}
              />
            </HeaderPageSection>
            <div className="form-holder">
              <h2>Update Branch</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                onFinishFailed={this.onFinishFailed}
                ref={this.formRef}
              >
                <h4>Branch Info:</h4>
                <Form.Item
                  name="vendorName"
                  label="vendor Name"
                >
                  <Input disabled/>
                </Form.Item>
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
                <Form.Item
                  label="Branch Type"
                  name="BranchType"
                  // initialValue = {this.status.branchType}
                  rules={[
                    {
                      required: true,
                      message: "Please select branch Type",
                    },
                  ]}
                >
                  <Select  onChange={this.onChangeBranchType}>
                    <Select.Option value="true">online store</Select.Option> 
                    <Select.Option value="false">physical store</Select.Option> 
                  </Select>
                </Form.Item>
                <Form.Item label="Enable" name="branchStutes">
                  <Switch checked={this.state.branchStutes} onChange={this.changeBranchStutes} />
                </Form.Item>
                {this.state.branchType === "false" &&
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
              </div>
              </div>
               }
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
                    // {
                    //   required: true,
                    //   message: "Please confirm your password!",
                    // },
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
