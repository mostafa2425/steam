import React, { Component } from "react";
import { Form, Input, InputNumber, Button, Select, Switch, message, Upload, Spin } from "antd";
import { Link } from "react-router-dom";
import DropdownList from "../DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import ImageUploader from "react-images-upload";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";
import { UploadOutlined } from '@ant-design/icons';
import { setVendorList, setAllVendorList } from "../../Dashboard/store/actions";
import { connect } from "react-redux";
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class UpdateVendor extends Component {

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
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");

    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    if(this.props.location.data){
      const {Name, NameLT, Phone, Enable, Email, Description, Password, ConfirmPassword, Percentage, Id } = this.props.location.data;
      this.formRef.current.setFieldsValue({
        VendorName: Name,
        ArabicVendorName: NameLT,
        email: Email,
        phone: Phone,
        VendorDescription: Description,
        Commission : Percentage,
        password : Password,
        confirm : ConfirmPassword, 
      })
      this.setState({vendorStutes : this.props.location.data.Enable, vendorID : Id })
    }else{
      this.props.history.push("/vendors");
    }

    if(!this.props.isFromCompany){
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetCompanies?Page=0', {
      method: 'GET',
      headers: myHeaders, 
    }).then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let companies = data.model;
          this.setState({companies, loading : false}, () => {
            this.formRef.current.setFieldsValue({CompanyName: this.props.location.data && this.props.location.data.CompanyId,})
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

    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendorTypes', {
      method: 'GET',
      headers: myHeaders, 
    }).then((response) => {
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
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem("token")),

      },
      body: JSON.stringify(data) 
    })
    .then( (response) => { 
      if(response.ok){
        this.setState({loadingBtn : false})
        message.success('vendor Updated successfully'); 
        this.props.dispatch(setVendorList([]));
        this.props.dispatch(setAllVendorList([]))
        this.props.history.push("/vendors");
      }else{
        response.json().then((data) => {
          this.setState({ loadingBtn: false });
          message.error(`${data.errors.message}`); 
        });
      }
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

  onDrop = (pictureFiles, pictureDataURLs) => {
    if (pictureFiles.length > 0) {
      let dataURL = "" + pictureDataURLs;
      let dataURL64 = dataURL.replace(
        `;name=${pictureFiles[0].name};base64,`,
        ""
      );
      let imageUrljpeg = dataURL64.replace("data:image/jpeg", "");
      let imageUrlpeg = imageUrljpeg.replace("data:image/jpg", "");
      let imageUrlpng = imageUrlpeg.replace("data:image/png", "");
      this.setState({
        pictures: pictureFiles,
        imageUrl: imageUrlpng,
      });
    }
  };

  render() {
    return (
      <Container>
        <PageContainer>
          <div className="add-company-form add-vendor-form">
            <HeaderPageSection>
              <DropdownList
                title="user name"
                list={["Edit Profile", "Notification"]}
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
                  <ImageUploader
                      className="file-upload-wrapper"
                      withIcon={false}
                      buttonText="Choose images"
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".jpeg", ".png"]}
                      accept=".png, .jpg, .jpeg"
                      // maxFileSize={4}
                      singleImage={true}
                      withPreview={true}
                    />
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

export default connect()(UpdateVendor)
