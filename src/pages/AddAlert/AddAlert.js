import React, { Component } from "react";
import {
  Form,
  Button,
  Select,
  message,
  Input,
  Spin,
  Upload,
  InputNumber,
} from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";
import { UploadOutlined } from "@ant-design/icons";
import { setClubsList, setVendorList, setAlertList, setAllVendorList, setAllClubList } from "../../Dashboard/store/actions";
import { connect } from "react-redux";
const { TextArea } = Input;
function disabledDate(current) {
  return current && current < moment().add(-1, "days");
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
class AddAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: null,
      clubs: null,
      loading: true,
      StartDate: null,
      EndDate: null,
      imageUrl: null,
      isSelectAllClubs: false,
      fileList: [],
    };
  }

  formRef = React.createRef();

  handelSubmit = (values, errors) => {
    console.log(values);
    this.setState({ loadingBtn: true });

    let data = {
      ForAll: this.state.isSelectAllClubs,
      VendorId: values.VendorName,
      // ClubId: 13,
      Description: `${values.OfferDescription}`,
      DescriptionLT: `${values.OfferDescriptionAr}`,
      StartDate: this.state.StartDate,
      TotalCost: values.TotalCost,
      BannerImage: this.state.imageUrl,
    };
    if (!this.state.isSelectAllClubs) {
      data.ClubId = values.ClubName;
    }

    fetch(
      "https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/AddAlert",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          this.setState({ loadingBtn: false });
          message.success("Alert added successfully");
          this.props.dispatch(setAlertList([]));
          this.formRef.current.resetFields();
        } else {
          this.setState({ loadingBtn: false });
          message.error(`${data.errors.message}`);
        }
      })
      .catch((error) => {
        this.setState({ loadingBtn: false });
        message.error(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) &&
      this.props.history.push("/login");

    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    });
    if (!this.props.vendorList.length > 0) {
      fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendors?Page=-1", {
        method: 'GET',
        headers: myHeaders, 
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let vendors = data.model;
              this.setState({ vendors, loading: false });
              this.props.dispatch(setAllVendorList(vendors));
            });
          } else {
              response.json().then((data) => {
              this.setState({ loading: false });
              message.error(`${data.errors.message}`); 
            });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          message.error(
            "There has been a problem with your fetch operation: " + error.message
          );
        });
    }else{
      this.setState({ vendors : this.props.allVendorList, loading: false });
    }
    if (!this.props.clubsList.length > 0) {
      fetch(
        "https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetClubs?Page=-1",
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let clubs = data.model;
              this.setState({ clubs, loading: false });
              this.props.dispatch(setAllClubList(clubs));
            });
          } else {
            response.json().then((data) => {
              this.setState({ loading: false });
              message.error(`${data.errors.message}`);
            });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          message.error(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });
    } else {
      this.setState({ clubs: this.props.allClubList, loading: false });
    }
  }

  onChangeimg = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        let imageUrljpeg = imageUrl.replace("data:image/jpeg;base64,", "");
        let imageUrlpeg = imageUrljpeg.replace("data:image/jpg;base64,", "");
        let imageUrlpng = imageUrlpeg.replace("data:image/png;base64,", "");
        this.setState({
          imageUrl: imageUrlpng,
          loading: false,
          fileList: info.fileList,
        });
      });
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      this.setState({ fileList: info.fileList })
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  beforeUpload = (file) => {
    // console.log(this.state.fileList.length)
    // if (this.state.fileList.length >= 1) {
    //   message.error("can't upload more than one image");
    // } else {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    // }
  };

  changeClub = (value) =>
    value === "all" && this.setState({ isSelectAllClubs: true });

  onChangeDateRange = (value, dateString) => {
    this.setState({ StartDate: dateString });
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
            {!this.state.loading ? (
              <div className="form-holder">
                <h2>Add Alert</h2>
                <Form
                  name="nest-messages"
                  onFinish={this.handelSubmit}
                  onFinishFailed={this.onFinishFailed}
                  ref={this.formRef}
                >
                  {/* <Form.Item
                    name="ClubLogo"
                    label="Alert Logo"
                    rules={[
                      { required: true, message: "Please input Club Logo!" },
                    ]}
                  >
                    <Upload
                      // disabled={this.state.fileList.length >= 1}
                      name="file"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={this.onChangeimg}
                      beforeUpload={this.beforeUpload}
                      // fileList={this.state.fileList}
                    >
                      <Button>
                        <UploadOutlined /> Click to Upload
                      </Button>
                    </Upload>
                  </Form.Item> */}
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
                    <Select
                      onChange={this.changeClub}
                      placeholder="select Club"
                    >
                      <>
                        <Select.Option
                          style={{ fontWeight: "bold" }}
                          value="all"
                        >
                          All Clubs
                        </Select.Option>
                        {this.state.clubs &&
                          this.state.clubs.map((club) => (
                            <Select.Option value={`${club.Id}`}>
                              {club.Name}
                            </Select.Option>
                          ))}
                      </>
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
                      {this.state.vendors &&
                        this.state.vendors.map((vendor) => (
                          <Select.Option value={vendor.Id}>
                            {vendor.Name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="rangepicker" label="Alert date & time">
                    <DatePicker
                      showTime={{ format: "HH:mm" }}
                      disabledDate={disabledDate}
                      onChange={this.onChangeDateRange}
                    />
                  </Form.Item>

                  <Form.Item
                    name="TotalCost"
                    label="Total Cost"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Total Cost!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Please add Total Cost"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  {/* <Form.Item
                    name="Time"
                    label="Alert Time"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Alert Time!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Please add Alert Time"
                      style={{ width: "100%" }}
                    />
                  </Form.Item> */}

                  <Form.Item
                    name="OfferDescription"
                    label="Offer Description"
                    rules={[
                      {
                        required: true,
                        message: "Please add alert Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Add alert Description"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="OfferDescriptionAr"
                    label="Offer Description Arbic"
                    rules={[
                      {
                        required: true,
                        message: "Please add alert Description In Arabic!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Add alert Description In Arabic"
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
                    <Link to="/alerts" className="grayscale-fill xlg-btn">
                      Cancel
                    </Link>
                  </div>
                </Form>
              </div>
            ) : (
              <Spin />
            )}
          </div>
        </PageContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allClubList: state.dashboard.allClubList,
    allVendorList: state.dashboard.allVendorList,
  };
};
export default connect(mapStateToProps)(AddAlert);
