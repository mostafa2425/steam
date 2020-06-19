import React, { Component } from "react";
import { Form, Button, Select, message, Input, Spin, Upload, Modal } from "antd";
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
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
    function disabledDate(current) {
        return current && current < moment().endOf('day');
      }
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
export default class UpdateOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors : null,
      clubs : null,
      loading : true,
      StartDate : null,
      EndDate : null,
      imageUrl : null,
      Id : null
    }
      this.formRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.history.location.data)
    console.log(this.formRef)
    if(this.props.history.location.data){
    const { Id, ClubId, VendorId, end, start, title, titleAr } = this.props.history.location.data;
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendors?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let vendors = data.model;
          this.setState({vendors, Id, StartDate : start, EndDate : end}, () => {
            setTimeout(() => {
              this.formRef.current.setFieldsValue({VendorName : VendorId, OfferDescription : title, OfferDescriptionAr : titleAr, rangePicker : [moment(start, dateFormat), moment(end, dateFormat)] }); 
              this.setState({loading : false}) 
            }, 1000)
            
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
    fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetClubs?Page=0').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let clubs = data.model;
          this.setState({clubs, loading : false}, () => {
            setTimeout(() => {
              this.formRef.current.setFieldsValue({ClubName : ClubId});
            }, 1000)
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
  }else{
    this.props.history.push("/Offers");
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
    "Id": this.state.Id, 
    "VendorId": values.VendorName,
    "ClubId": values.ClubName,
    "Description":`${values.OfferDescription}`,
    "DescriptionLT":`${values.OfferDescriptionAr}`,
    "StartDate": this.state.StartDate,
    "EndDate": this.state.EndDate,
    "BannerImage": this.state.imageUrl,
}
fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/EditOffer", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then( (response) => { 
    this.setState({loadingBtn : false})
    message.success('offer update successfully');
    this.props.history.push("/Offers");
  })
  .catch((error) => {
    this.setState({loadingBtn : false})
    message.error('There has been a problem with your fetch operation: ' + error.message);
  });
};

  onChangeimg = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>{
        let imageUrljpeg = imageUrl.replace("data:image/jpeg;base64,", "");
        let imageUrlpeg = imageUrljpeg.replace("data:image/jpg;base64,", "");
        let imageUrlpng = imageUrlpeg.replace("data:image/png;base64,", "");  
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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  showDeleteConfirm = () => {
    confirm({
      title: `Are you sure delete this Offer ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk : () =>  {
        fetch(`http://native-001-site2.ctempurl.com/api/DeleteOffer?OfferId=${this.state.Id}`)
        .then((response) => {
          if(response.ok) {
            response.json().then((data) => {
              message.success('Offer deleted successfully'); 
              this.props.history.push("/Offers");
            });
          } else {
              message.error('Network response was not ok.');
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        });
      },
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
              <h2>Update Offer</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                ref={this.formRef}
              >
                <Form.Item
                  name="ClubLogo"
                  label="Offer Logo"
                  rules={[{ required: true, message: "Please input Club Logo!", }]}
                >
                  <Upload
                  name ='file'
                  action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76' 
                  onChange={this.onChangeimg} beforeUpload={this.beforeUpload}> 
                  <Button>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
                </Form.Item>
                <Form.Item
                  label="Club Name"
                  name="ClubName"
                  rules={[
                    {
                      required: true,
                      message: "Please select Club",
                    },
                  ]}
                >
                  <Select placeholder="select Club">
                  {this.state.clubs && this.state.clubs.map(club => <Select.Option value={club.Id}>{club.Name}</Select.Option>)}
                  </Select>
                </Form.Item>   
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
                  <Select placeholder="select Vendor">
                  {this.state.vendors && this.state.vendors.map(vendor => <Select.Option value={vendor.Id}>{vendor.Name}</Select.Option>)}
                  </Select>
                </Form.Item>   

                <Form.Item name="rangePicker" label="RangePicker">
                    <RangePicker showTime={{ format: 'HH:mm' }} disabledDate={disabledDate} onChange={this.onChangeDateRange} />
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
                <Form.Item
                  name="OfferDescriptionAr"
                  label="Offer Description Arbic"
                  rules={[{ required: true, message: "Please add Offer Description In Arabic!", }]}
                >
                  <TextArea
                    placeholder="Add Offer Description In Arabic"
                    autoSize={{ minRows: 2, maxRows: 6 }} 
                  />
                </Form.Item>

                <div className="btn-action">
                  <Button className="warning-fill xlg-btn mr-20" onClick={this.showDeleteConfirm}>Delete</Button>
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