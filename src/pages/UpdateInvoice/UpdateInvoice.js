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
      invoice : null,
      payAmountMax : 0
    }
  } 

  formRef = React.createRef();

  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    if(this.props.location.data){
      const { Id } = this.props.location.data;
    fetch(`http://native-001-site2.ctempurl.com/api/GetInvoice?InvoiceId=${Id}` ,{
      method: 'GET',
      headers: myHeaders, 
    }).then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          let invoice = data.model;
          this.setState({invoice, payAmountMax :  (+invoice.DueAmount - +invoice.PaidAmount)},
           () => console.log(this.state))
          this.formRef.current.setFieldsValue({
            InvoiceID: Id,
            VendorName: invoice.Vendor.Name,
            AmountDue: invoice.DueAmount,
            paidAmount: invoice.PaidAmount,
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
      this.props.history.push("/brand-invoice");
    }
  }

  handelSubmit = (values) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("token")),
    });
    fetch(`http://native-001-site2.ctempurl.com/api/UpdateInvoice?InvoiceId=${this.state.invoice.Id}&EnterAmount=${values.payAmount}`, {
      method: 'GET',
      headers: myHeaders, 
    })
        .then((response) => {
          if(response.ok) {
            response.json().then((data) => { 
              message.success('invoice updated successfully'); 
              setTimeout(() => {
                this.props.history.push("/brand-invoice");
              }, 500)
            });
          } else {
            message.error('Network response was not ok.');
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        });
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
                  <Input disabled/>
                </Form.Item>
                <Form.Item
                  name="VendorName"
                  label="Vendor Name"
                  
                  rules={[{ required: true, message: "Please input Vendor Name!",}]}
                >
                  <Input disabled/>
                </Form.Item>
                <Form.Item
                  name="AmountDue"
                  label="Vendor Amount Due"
                  
                  rules={[{ required: true, message: "Please input Vendor Amount Due!",}]}
                >
                  <Input disabled/>
                </Form.Item>
                <Form.Item
                  name="paidAmount"
                  label="Invoice paid Amount"
                  
                  // rules={[{ required: true, message: "Please input Invoice paid Amount!",}]}
                >
                  <Input disabled/>
                </Form.Item>
                <Form.Item
                  name="payAmount"
                  label="Enter Amount"
                  rules={[{ required: true, message: "Please input pay Amount", }]}
                >
                  <InputNumber
                    min={0}
                    max={this.state.payAmountMax} 
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
