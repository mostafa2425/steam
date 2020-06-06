import React, { Component } from "react";
import { Form, Button, Select, message, Input, Spin } from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import { Link } from "react-router-dom";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";
function disabledDate(current) {
    return current && current < moment().endOf('day');
  }
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export default class AddOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors : null,
      loading : true,
      StartDate : null,
      EndDate : null,
    }
  }

     onChangeDateRange = (dates, dateStrings) => {
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.setState({StartDate : dateStrings[0], EndDate : dateStrings[1]})
      }

  handelSubmit = (values, errors) => {
    console.log(values)
    this.setState({loadingBtn : true})
    let data = {
      "VendorId":1,
	    "ClubId":1,
      "Description":`${values.OfferDescription}`,
      "StartDate": this.state.StartDate,
      "EndDate": this.state.EndDate,
  }
  fetch("http://native-001-site2.ctempurl.com/api/AddOffer", {
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
      message.success('offer added successfully');
      // this.formRef.current.resetFields();
    })
    .catch((error) => {
      this.setState({loadingBtn : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  componentDidMount() {
    fetch('http://native-001-site2.ctempurl.com/api/GetVendors?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let vendors = data.model;
          console.log(vendors)
          this.setState({vendors, loading : false})
        });
      } else {
        message.error('Network response was not ok.');
        this.setState({loading : false})
      }
    })
    .catch((error) => {
      this.setState({loading : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });
  }


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
            {!this.state.loading ?
            <div className="form-holder">
              <h2>Add Offer</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Vendor Name"
                  name="VendorName"
                  rules={[
                    {
                      required: true,
                      message: "Please select Vendor",
                    },
                  ]}
                >
                  <Select>
                  {this.state.vendors && this.state.vendors.map(vendor => <Select.Option value={`${vendor.Id}`}>{vendor.Name}</Select.Option>)}
                  </Select>
                </Form.Item>   

                <Form.Item name="range-picker" label="RangePicker">
                    <RangePicker disabledDate={disabledDate} onChange={this.onChangeDateRange} />
                </Form.Item> 

                <Form.Item
                  name="OfferDescription"
                  label="Offer Description"
                  rules={[{ required: true, message: "Please add Offer Description!", }]}
                >
                  <TextArea
                    placeholder="Add Offer Description"
                    autoSize={{ minRows: 2, maxRows: 6 }} 
                  />
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
            </div> : <Spin />}
          </div>
        </PageContainer>
      </Container>
    );
  }
}
