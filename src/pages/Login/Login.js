import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
export default class Login extends Component {
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
      `https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/AdminLogin?Email=${values.username}&Password=${values.password}`
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            localStorage.setItem("userInfo", JSON.stringify(data.model));
            localStorage.setItem("token", JSON.stringify(data.model.Token));
            setTimeout(() => {
              this.setState({ loadingBtn: false });
              this.props.history.push("/");
            }, 500);
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
                email address or password is incorrect
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
                label="Email / Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <div className="login-btn">
                <Form.Item>
                  <Button
                    loading={this.state.loadingBtn}
                    className="primary-fill"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
                <Link to="/forget-password">Forget Password ?</Link>
              </div>
            </Form>
          </div>
          <div className="auth-hero"></div>
        </div>
      </div>
    );
  }
}
