import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
// import './SignupForm.css';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import { Form, Input, Button } from 'antd';

const Signup = ({ handleSubmit, errors }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { closeModal } = useModal();
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    setIsFormValid(username.length >= 4 && password.length >= 6 && password === confirmPassword);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    validateForm();
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm();
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateForm();
  }
  const onCancel = (e) => {
    e.preventDefault();
    closeModal();
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
      className="SignupModalForm"
      initialValues={{ remember: true }}
    >
      <h1>SIGN UP</h1>
      <div className="errorContainer">
        {errors &&
          errors.map((error, idx) => <div key={idx}>{error}</div>)}
      </div>
      <Form.Item
        label="Email"
        name="email"

        rules={[
          { type: 'email', message: 'Please enter a valid email' },
          { required: true, message: 'Please enter your email' },
        ]}
      >
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please enter your username' },
          { min: 4, message: 'Username must be at least 4 characters long' },
        ]}
      >
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder="4 character minimum"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { min: 6, message: 'Password must be at least 6 characters long' },
        ]}
      >
        <Input.Password
          value={password}
          onChange={handlePasswordChange}
          placeholder="6 character minimum"
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your password' },
          { validator: (_, value) => {
              if (value && value !== password) {
                return Promise.reject('The two passwords do not match');
              }
              return Promise.resolve();
            }
          },
        ]}
      >
        <Input.Password
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
        />
      </Form.Item>
      <div>
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </Button>
      </div>
      <OpenModalMenuItem
        itemText="Don't have an account? Signup here"
        modalComponent={<Signup />}
      />
    </Form>
  );
}

export default Signup;
