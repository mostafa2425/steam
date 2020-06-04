import React, { Component } from "react";
import { Form, Input, InputNumber, Button, Select, Switch, message, Upload } from "antd";
import { Link } from "react-router-dom";
import DropdownList from "../DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2; 
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class AddVendor extends Component {



  handelSubmit = (values, errors) => {
    message.success('vendor added successfully'); 
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  changeCompanyStutes = (value) => {
    console.log(value);
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  render() {
    return (
      <Container>
        <PageContainer>
          <div className="add-company-form add-vendor-form">
            <HeaderPageSection>
              <DropdownList
                title="user name"
                list={["Edit Profile", "Notification", "Logout"]}
                titleImage={UserAvatar}
              />
            </HeaderPageSection>
            <div className="form-holder">
              <h2>Add Vendor</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  name="CompanyName"
                  label="Company Name"
                >
                  <Input  value="McDonald's" />
                </Form.Item>
                <Form.Item
                  name="VendorName"
                  label="Vendor Name"
                  
                  rules={[{ required: true, message: "Please input Vendor Name!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ArabicVendorName"
                  label="Arabic Vendor Name"
                  rules={[{ required: true, message: "Please input Arabic Vendor Name!", }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="VendorLogo"
                  label="Vendor Logo"
                  rules={[{ required: true, message: "Please input Vendor Logo!", }]}
                >
                  <Upload {...props} beforeUpload={this.beforeUpload}> 
                  <Button>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
                </Form.Item>
                <Form.Item
                  name="VendorDescription"
                  label="Vendor Description"
                  // rules={[{ required: true, message: "Please input Arabic Vendor Name!", }]}
                >
                  <TextArea
                    placeholder="Add Vendor Description"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
                <Form.Item
                  name="Commission"
                  label="Vendor Commission Percentage"
                  rules={[{ required: true, message: "Please input Vendor Commission", }]}
                >
                  <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    // onChange={onChange}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Vendor Contact Phone"
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
                  label="Vendor Email Address"
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
                  label="Vendor Indastry"
                  name="Location"
                  rules={[
                    {
                      required: true,
                      message: "Please select Vendor Indastry",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="Food">Food</Select.Option>
                    <Select.Option value="Education">Education</Select.Option>
                    <Select.Option value="Food">Food</Select.Option>
                    <Select.Option value="Education">Education</Select.Option>
                    <Select.Option value="Food">Food</Select.Option>
                    <Select.Option value="Education">Education</Select.Option>
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
