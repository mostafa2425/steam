import React, { Component } from "react";
import { Form, Input, InputNumber, Button, Select, Switch, message, Upload, Spin } from "antd";
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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

export default class UpdateVendor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vendorStutes : true,
      loadingBtn : false,
      imageUrl : null,
      companies : null,
      vendorIndustry : null,
      vendorID : null
    }
  }

  formRef = React.createRef();

  componentDidMount() {
    if(this.props.location.data){
      const {Name, NameLT, Phone, Enable, Email, Description, Password, ConfirmPassword, Percentage, Id } = this.props.location.data;
      this.formRef.current.setFieldsValue({
        VendorName: Name,
        ArabicVendorName: NameLT,
        email: Email,
        phone: Phone,
        VendorDescription: Description,
        CompanyStutes: Enable,
        Commission : Percentage,
        password : Password,
        confirm : ConfirmPassword, 
      })
      this.setState({CompanyStutes : this.props.location.data.Enable, vendorID : Id })
    }else{
      this.props.history.push("/vendors");
    }

    if(!this.props.isFromCompany){
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetCompanies?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let companies = data.model;
          this.setState({companies, loading : false}, () => {
            this.formRef.current.setFieldsValue({CompanyName: this.props.location.data && this.props.location.data.CompanyId,})
            console.log(this.props.location.data)
          })
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

    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendorTypes').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let vendorIndustry = data.model;
          this.setState({vendorIndustry, loading : false}, () => {
            this.formRef.current.setFieldsValue({Indastry: this.props.location.data && this.props.location.data.VendorTypeId})
          })
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
  }

  handelSubmit = (values, errors) => {
    console.log(values)
    this.setState({loadingBtn : true})
    let data = {
    "Id": this.state.vendorID,
    "Name":`${values.VendorName}`,
    "NameLT":`${values.ArabicVendorName}`,
    "Email":`${values.email}`,
    "Phone":`${values.phone}`,
    "Enable": this.state.vendorStutes,
    "CompanyId": +values.CompanyName,
    "Percentage":values.Commission,
    "VendorTypeId": values.Indastry,
    "Description":`${values.VendorDescription}`,
    "Password":values.password,
    "ConfirmPassword": values.confirm,
    "Logo": this.state.imageUrl, 
}

fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/EditVendor", {
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
      message.success('vendor Updated successfully'); 
      this.props.history.push("/vendors");
    })
    .catch((error) => {
      this.setState({loadingBtn : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  changeVendorStutes = (value) => {
    this.setState({vendorStutes : value})
  };

  // handleChangeCompany = (value) => {
  //   this.setState({vendorStutes : value})
  // };

  onChangeimg = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>{
        let imageUrljpeg = imageUrl.replace("data:image/jpeg;base64,", "");
        let imageUrlpng = imageUrljpeg.replace("data:image/png;base64,", "");
        this.setState({
          imageUrl : imageUrlpng,
          loading: false,
        })
      }
        
      );
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
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
            {!this.state.loading ?
            <div className="form-holder">
              <h2>Update Vendor</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                onFinishFailed={this.onFinishFailed}
                ref={this.formRef}
              >
                <Form.Item
                  label="Company Name"
                  name="CompanyName"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please select company",
                    },
                  ]}
                >
                  <Select disabled>
                      {this.state.companies && this.state.companies.map(company => <Select.Option value={company.Id}>{company.Name}</Select.Option>)}
                  </Select>
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
                  // rules={[{ required: true, message: "Please input Vendor Logo!", }]}
                >
                  <Upload onChange={this.onChangeimg}  
                      name ='file'
                      action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      beforeUpload={this.beforeUpload}> 
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
                  name="password"
                  label="Password"
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Please input your password!",
                    // },
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
                <Form.Item
                  label="Vendor Indastry"
                  name="Indastry"
                  rules={[
                    {
                      required: true,
                      message: "Please select Vendor Indastry",
                    },
                  ]}
                >
                  <Select>
                  {this.state.vendorIndustry && this.state.vendorIndustry.map(type => <Select.Option value={type.Id}>{type.Name}</Select.Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Enable" name="vendorStutes">
                  <Switch checked={this.state.vendorStutes} onChange={this.changeVendorStutes} />
                </Form.Item>
                <div className="btn-action">
                  <Button
                    type="primary"
                    className="primary-fill xlg-btn mr-20"
                    htmlType="submit"
                    loading = {this.state.loadingBtn}
                  >
                    Update
                  </Button>
                  <Link to="/vendors" className="grayscale-fill xlg-btn">Cancel</Link>
                </div>
              </Form>
            </div> : <Spin />}
          </div>
        </PageContainer>
      </Container>
    );
  }
}
