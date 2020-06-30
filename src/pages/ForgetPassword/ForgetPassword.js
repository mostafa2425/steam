import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingBtn: false,
      loginFaild: false,
    };
  }
  handeSubmit = (values) => {
    this.setState({ loadingBtn: true });
    fetch(
      `http://native-001-site2.ctempurl.com/api/AdminForgetPassword?Email=${values.Email}`
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setTimeout(() => {
              this.setState({ loadingBtn: false });
              message.success('New Password Send To Your E-Mail'); 
              this.props.history.push("/login");
            }, 1500);
          });
        } else {
          if (response.status === 401) {
            this.setState({ loginFaild: true, loadingBtn: false });
          } else {
            message.error("Network response was not ok.");
          }
        }
      })
      .catch((error) => {
        this.setState({ loadingBtn: false });
        message.error(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="form-wrapper">
            {this.state.loginFaild && (
              <p className="warning-msg">
                email address is incorrect
              </p>
            )}
            <Form
              name="basic"
              ref={this.formRef}
              initialValues={{
                remember: true,
              }}
              onFinish={this.handeSubmit}
            >
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="please Enter Your E-Mail" />
              </Form.Item>
              <div className="login-btn">
                <Form.Item>
                  <Button
                    loading={this.state.loadingBtn}
                    className="primary-fill"
                    type="primary"
                    htmlType="submit"
                  >
                    Send
                  </Button>
                </Form.Item>
                <Link to="/login">Back To Login</Link>
              </div>
            </Form>
          </div>
          <div className="auth-hero"></div>
        </div>
      </div>
    );
  }
}
