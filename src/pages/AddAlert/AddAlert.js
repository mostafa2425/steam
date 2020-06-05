import React, { Component } from "react";
import { Form, Button, Select, message, Input } from "antd";
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
export default class AddAlert extends Component {

     onChangeDateRange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      }

  handelSubmit = (values, errors) => {
    message.success('alert added successfully'); 
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
                    <Select.Option value="Riyadh">Riyadh</Select.Option>
                    <Select.Option value="Jeddah">Jeddah</Select.Option>
                    <Select.Option value="Dammam">Dammam</Select.Option>
                    <Select.Option value="Khobar">Al Khobar</Select.Option>
                    <Select.Option value="Buraydah">Buraydah</Select.Option>
                    <Select.Option value="Abha">Abha</Select.Option>
                  </Select>
                </Form.Item>   

                <Form.Item name="range-picker" label="RangePicker">
                    <RangePicker disabledDate={disabledDate} />
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
