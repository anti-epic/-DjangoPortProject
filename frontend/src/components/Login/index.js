import React, {useState} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import { Modal, Form, Input, Button } from 'antd';
function Login() {
    const dispatch = useDispatch();
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal();



      const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login(emailOrUsername, password)).then((data)=> closeModal())
        .catch((error) => {
            setErrors([error.message]);;
          });
      };

      const onCancel = (e) => {
        e.preventDefault();
        closeModal()
      };

      return (

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Username or Email"
              name="emailOrUsername"
              rules={[{ required: true, message: 'Please enter your email or username' }]}
            >
              <Input value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <div className="errorContainer" style={{ backgroundColor: 'red' }}>
              {errors && errors.map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            </div>
            <Button key="cancel" onClick={onCancel}>Cancel</Button>
          <Button key="submit" type="primary" onClick={handleSubmit}>Log In</Button>
          </Form>

      );
}

export default Login;
