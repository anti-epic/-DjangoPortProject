import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Form, Input, Button } from "antd";
import Signup from "../Signup";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./Login.css";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login(emailOrUsername, password))
      .then((data) => closeModal())
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  const onCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  const validateForm = () => {
    setIsFormValid(emailOrUsername.length >= 4 && password.length >= 6);
  };

  return (
    <Form
    layout="vertical"
    onFinish={handleSubmit}
    onKeyPress={(e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    }}
    className="LoginModalForm"
    initialValues={{ remember: true }}
  >
    <h1>LOGIN</h1>
    <div className="errorContainer">
      {errors &&
        errors.map((error, idx) => <div key={idx}>{error}</div>)}
    </div>
    <Form.Item
      label="Username or Email"
      name="emailOrUsername"
      rules={[
        { hidden: true, message: 'Please enter your username or email' },
        { min: 4, message: 'Must be at least 4 characters long' },
      ]}
    >
      <Input
        value={emailOrUsername}
        onChange={(e) => {
          setEmailOrUsername(e.target.value);
          validateForm()
        }}
        placeholder="username or email"
      />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[
        { hidden: true, message: 'Please enter your password' },
        { min: 6, message: 'Username must be at least 6 characters long' },
      ]}
    >
      <Input.Password
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validateForm()
        }}
        placeholder="password"
      />
    </Form.Item>
    <div>
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>
      <Button
        key="submit"
        type="primary"
        onClick={handleSubmit}
        htmlType="submit"
        disabled={!isFormValid}
      >
        Log In
      </Button>
    </div>
    <OpenModalMenuItem
      itemText="Don't have an account? Signup here"
      modalComponent={<Signup />}
    />
  </Form>
  );
}

export default Login;
