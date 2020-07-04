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
import { setClubsList, setAllClubList } from "../../Dashboard/store/actions";
import { connect } from "react-redux";
const { TextArea } = Input; 
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class UpdateClub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clubStutes : true,
      loadingBtn : false,
      imageUrl : null,
      companies : null,
      vendorIndustry : null,
      clubId : null
    }
  }

  formRef = React.createRef();

  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");

    if(this.props.location.data){
      const {Name, NameLT, Phone, HeadQuarter, Enable, IdentityId,Email, Percentage, ClubTypeId } = this.props.location.data;
      this.formRef.current.setFieldsValue({
        ClubName: Name,
        ArabicClubName: NameLT,
        email: Email,
        phone: Phone,
        League : ClubTypeId, 
        Percentage : Percentage ? Percentage : 0
      })
      this.setState({clubStutes : this.props.location.data.Enable, clubId : this.props.location.data.Id, loading:false })
    }else{
      this.props.history.push("/clubs");
    }
  }

  handelSubmit = (values) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    this.setState({loadingBtn : true})
    let data = {
      "Id":this.state.clubId,
    "Name":`${values.ClubName}`,
    "NameLT":`${values.ArabicClubName}`,
    "ClubTypeId": values.League,
    "Email":`${values.email}`,
    "Phone":`${values.phone}`, 
    "Percentage": values.Percentage,
    "Enable":this.state.clubStutes,
    "Logo": this.state.imageUrl ? this.state.imageUrl : "", 
}

fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/EditClub", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem("token")),

      },
      body: JSON.stringify(data) 
    })
    .then((response) => { 
      if(response.ok) {
        message.success('club Updated successfully'); 
        this.props.dispatch(setClubsList([]))
        this.props.dispatch(setAllClubList([]))
        this.props.history.push("/clubs");
        // fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetClubs?Page=0", {
        //   method: 'GET',
        //    headers: myHeaders, 
        // })
        // .then((response) => {
        //   if (response.ok) {
        //     response.json().then((data) => {
        //       let clubs = data.model;
        //       this.props.dispatch(setClubsList(clubs))
        //       this.setState({loadingBtn : false})
        //       this.props.history.push("/clubs");
        //     });
        //   }
        // })
        // .catch((error) => {
        //   this.setState({ loading: false });
        //   message.error(
        //     "There has been a problem with your fetch operation: " + error.message
        //   );
        // });
      } else {
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

  changeClubStutes = (value) => {
    this.setState({clubStutes : value})
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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === "image/jpg";
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
                list={["Edit Profile", "Notification"]}
                titleImage={UserAvatar}
              />
            </HeaderPageSection>
            <div className="form-holder">
              <h2>Update Club</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                ref={this.formRef}
              >
                <Form.Item
                  name="ClubName"
                  label="Club Name"
                  rules={[{ required: true, message: "Please input Club Name!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ArabicClubName"
                  label="Arabic Club Name"
                  rules={[{ required: true, message: "Please input Arabic Club Name!", }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ClubLogo"
                  label="Club Logo"
                  // rules={[{ required: true, message: "Please input Club Logo!", }]}
                >
                  <Upload
                  name ='file'
                  accept=".png, .jpg, .jpeg"
                  action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76' 
                  onChange={this.onChangeimg} beforeUpload={this.beforeUpload}> 
                  <Button>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
                </Form.Item>
                <Form.Item
                  label="League Division"
                  name="League"
                  rules={[
                    {
                      required: true,
                      message: "Please club league division",
                    },
                  ]}
                >
                  <Select>
                      <Select.Option value={1}>First Division</Select.Option>
                      <Select.Option value={2}>Second Division</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="Percentage"
                  label="Club Percentage Percentage"
                  rules={[{ required: true, message: "Please input Club Percentage", }]}
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
                  label="Club Contact Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Club number!",
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
                  label="Club Email Address"
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
                <Form.Item label="Enable" name="clubStutes">
                  <Switch checked={this.state.clubStutes} onChange={this.changeClubStutes} />
                </Form.Item>
                <div className="btn-action">
                  <Button
                    type="primary"
                    className="primary-fill xlg-btn mr-20"
                    htmlType="submit"
                    loading={this.state.loadingBtn}
                  >
                    Update
                  </Button>
                  <Link to="/clubs" className="grayscale-fill xlg-btn">Cancel</Link>
                </div>
              </Form>
            </div>
          </div>
        </PageContainer>
      </Container>
    );
  }
}

export default connect()(UpdateClub)
