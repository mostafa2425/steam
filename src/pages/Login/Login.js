import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingBtn: false,
      invoice: null,
      payAmountMax: 0,
    };
  }
  handeSubmit = () => { this.props.history.push("/") };
  render() {
    return (
      <div className="auth-wrapper">
          <div className="auth-content">
        <div className="form-wrapper">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.handeSubmit}
          >
            <Form.Item
              label="Email/Username"
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
                <Button className="primary-fill" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <Link to="/">Forget Password ?</Link>
            </div>
          </Form>
        </div>
        <div className="auth-hero"></div>
      </div>
      </div>
    );
  }
}
