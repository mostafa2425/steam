import React, { Component } from "react";
import {
  Form,
  Button,
  Select,
  message,
  Input,
  Spin,
  Upload,
  Modal,
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
import { UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { setClubsList } from "../../Dashboard/store/actions";
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "YYYY/MM/DD";
function disabledDate(current) {
  return current && current < moment().endOf("day");
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
// const now = moment().format('YYYY-MM-DD HH:mm');
class UpdateAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: null,
      clubs: null,
      loading: true,
      StartDate: null,
      EndDate: null,
      imageUrl: null,
      Id: null,
      isSelectAllClubs : false
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    if (this.props.history.location.data) {
      const {
        Id,
        ClubId,
        VendorId,
        start,
        title,
        titleAr,
        TotalCost,
        Time,
      } = this.props.history.location.data;
      let startDate = moment(start, "DD-MM-YYYY HH:mm");
      this.setState({StartDate : startDate.format('YYYY/MM/DD HH:mm')}) 

      fetch(
        "http://native-001-site2.ctempurl.com/api/GetVendors?Page=0", {
          method: 'GET',
          headers: myHeaders, 
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let vendors = data.model;
              this.setState(
                { vendors, Id, },
                () => {
                  setTimeout(() => {
                    this.formRef.current.setFieldsValue({
                      VendorName: VendorId,
                      TotalCost: TotalCost ? TotalCost.toFixed(2) : 0,
                      OfferDescription: title, 
                      OfferDescriptionAr: titleAr,
                      Time: Time,
                    });
                    this.setState({ loading: false });
                  }, 1000);
                }
              );
            });
          } else {
            message.error("Network response was not ok.");
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          message.error(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });

      if (!this.props.clubsList.length > 0) {
        fetch("http://native-001-site2.ctempurl.com/api/GetClubs?Page=0", {
          method: 'GET',
          headers: myHeaders, 
        })
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                let clubs = data.model;
                this.setState({ clubs, loading: false }, () => {
                  setTimeout(() => {
                    this.formRef.current.setFieldsValue({ ClubName: ClubId });
                  }, 1000);
                });
                this.props.dispatch(setClubsList(clubs));
              });
            } else {
              message.error("Network response was not ok.");
              this.setState({ loading: false });
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
        this.setState({ clubs: this.props.clubsList, loading: false }, () => {
          setTimeout(() => {
              this.formRef.current.setFieldsValue({ ClubName: ClubId }); 
          }, 500);
        });
      }
    } else {
      this.props.history.push("/alerts");
    }
  }

  handelSubmit = (values, errors) => {
    console.log(values);
    this.setState({ loadingBtn: true });
    let data = {
      Id: this.state.Id,
      VendorId: values.VendorName,
      ClubId: values.ClubName,
      Description: `${values.OfferDescription}`,
      DescriptionLT: `${values.OfferDescriptionAr}`,
      StartDate: this.state.StartDate,
      TotalCost: values.TotalCost ? values.TotalCost : 0,
      BannerImage: this.state.imageUrl,
      Time : values.Time
    };
    fetch(
      "http://native-001-site2.ctempurl.com/api/EditAlert",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        this.setState({ loadingBtn: false });
        message.success("alert update successfully");
        this.props.history.push("/alerts");
      })
      .catch((error) => {
        this.setState({ loadingBtn: false });
        message.error(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

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
        });
      });
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  beforeUpload = (file) => {
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
  };

  showDeleteConfirm = () => {
    confirm({
      title: `Are you sure delete this Offer ?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        fetch(
          `http://native-001-site2.ctempurl.com/api/DeleteAlert?AlertId=${this.state.Id}`
        )
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                message.success("alert deleted successfully");
                this.props.history.push("/alerts");
              });
            } else {
              message.error("Network response was not ok.");
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
            message.error(
              "There has been a problem with your fetch operation: " +
                error.message
            );
          });
      },
    });
  };

  onChangeDateRange = (value, dateString) =>  {
    this.setState({StartDate : dateString})
  }

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
                <h2>Update Alert</h2>
                <Form
                  name="nest-messages"
                  onFinish={this.handelSubmit}
                  ref={this.formRef}
                >
                  <Form.Item
                    name="ClubLogo"
                    label="Alert Logo"
                    // rules={[{ required: true, message: "Please input Club Logo!", }]}
                  >
                    <Upload
                      name="file"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={this.onChangeimg}
                      beforeUpload={this.beforeUpload}
                    >
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
                      <>
                      {this.state.clubs &&
                        this.state.clubs.map((club) => (
                          <Select.Option value={club.Id}>
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
                  <Form.Item name="rangepicker" label="RangePicker">
                    <DatePicker
                      showTime={{ format: "HH:mm" }}
                      disabledDate={disabledDate}
                      onChange={this.onChangeDateRange}
                      defaultValue={this.state.StartDate && moment(this.state.StartDate)}
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
                  <InputNumber style={{ width: "100%" }} /> 
                </Form.Item>

                <Form.Item
                  name="Time"
                  label="Alert Time"
                  rules={[ 
                    {
                      required: true,
                      message: "Please input your Alert Time!",
                    },
                  ]}
                >
                  <InputNumber placeholder="Please add Alert Time" style={{ width: "100%" }} /> 
                </Form.Item>

                  <Form.Item
                    name="OfferDescription"
                    label="alert Description"
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
                    label="alert Description Arbic"
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
                      className="warning-fill xlg-btn mr-20"
                      onClick={this.showDeleteConfirm}
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      className="primary-fill xlg-btn mr-20"
                      htmlType="submit"
                      loading={this.state.loadingBtn}
                    >
                      Update
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
    clubsList: state.dashboard.clubsList,
  };
};
export default connect(mapStateToProps)(UpdateAlert);
