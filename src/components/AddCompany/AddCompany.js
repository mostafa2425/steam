import React, { Component } from "react";
import { Form, Input, InputNumber, Button, Select, Switch, message } from "antd";
import { Link } from "react-router-dom";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";

export default class AddCompany extends Component {



  handelSubmit = (values, errors) => {
    message.success('company added successfully'); 
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
              <h2>Add Company</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  name="CompanyName"
                  label="Company Name"
                  rules={[{ required: true, message: "Please input your Company Name!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ArabicCompanyName"
                  label="Arabic Company Name"
                  rules={[{ required: true, message: "Please input your Arabic Company Name!", }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Contact Phone"
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
                  label="Email Address"
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
                  label="Headquarter Location"
                  name="Location"
                  rules={[
                    {
                      required: true,
                      message: "Please select Headquarter Location",
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
                <Form.Item label="Enable" name="CompanyStutes">
                  <Switch defaultChecked onChange={this.changeCompanyStutes} />
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
