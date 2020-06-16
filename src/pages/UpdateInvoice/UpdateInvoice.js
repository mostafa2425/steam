import React, { Component } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { Link } from "react-router-dom";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import {
  HeaderPageSection,
  Container,
  PageContainer,
} from "./StyledComponents";

export default class UpdateInvoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingBtn : false,
    }
  } 

  formRef = React.createRef();

  componentDidMount() {
    // if(this.props.location.data){
    //   const {Name, NameLT, Phone, HeadQuarter, Enable, IdentityId,Email, Commission, ClubTypeId } = this.props.location.data;
    //   this.formRef.current.setFieldsValue({
    //     ClubName: Name,
    //     ArabicClubName: NameLT,
    //     email: Email,
    //     phone: Phone,
    //     League : ClubTypeId,
    //     Commission : Commission ? Commission : 0
    //   })
    //   this.setState({clubStutes : this.props.location.data.Enable, clubId : this.props.location.data.Id, loading:false })
    // }else{
    //   this.props.history.push("/clubs");
    // }
  }

  handelSubmit = (values) => {
    this.setState({loadingBtn : true})
    let data = {
      "Id":this.state.clubId,
    "Name":`${values.ClubName}`,
    "NameLT":`${values.ArabicClubName}`,
    "ClubTypeId": values.League,
    "Email":`${values.email}`,
    "Phone":`${values.phone}`,
    // "Commission":`${values.Commission}`,
    "Enable":this.state.clubStutes,
    "Logo": this.state.imageUrl ? this.state.imageUrl : "", 
}

fetch("https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/EditClub", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    })
    .then( (response) => { 
      if(response.ok) {
        message.success('club Updated successfully'); 
        this.setState({loadingBtn : false})
        this.props.history.push("/clubs");
      } else {
        message.error('Network response was not ok.');
        this.setState({loadingBtn : false}) 
      }
    })
    .catch((error) => {
      this.setState({loadingBtn : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
    });
  };

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
              <h2>Update Invouce</h2>
              <Form
                name="nest-messages"
                onFinish={this.handelSubmit}
                ref={this.formRef}
              >
                <Form.Item
                  name="InvoiceID"
                  label="Invoice ID"
                  
                  rules={[{ required: true, message: "Please input Invoice ID!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="VendorName"
                  label="Vendor Name"
                  
                  rules={[{ required: true, message: "Please input Vendor Name!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="AmountDue"
                  label="Vendor Amount Due"
                  
                  rules={[{ required: true, message: "Please input Vendor Amount Due!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="paidAmount"
                  label="Invoice paid Amount"
                  
                  rules={[{ required: true, message: "Please input Invoice paid Amount!",}]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="payAmount"
                  label="Enter Amount"
                  rules={[{ required: true, message: "Please input pay Amount", }]}
                >
                  <InputNumber
                    min={0}
                    max={100}
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
                  <Link to="/brand-invoice" className="grayscale-fill xlg-btn">Cancel</Link>
                </div>
              </Form>
            </div>
          </div>
        </PageContainer>
      </Container>
    );
  }
}
