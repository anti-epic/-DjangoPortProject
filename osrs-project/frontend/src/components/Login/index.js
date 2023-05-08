import React, {useState} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";

function Login() {
    const dispatch = useDispatch();
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login(emailOrUsername, password)).then(closeModal).catch(async (res) => {
            if (res && res.ok) {
              const data = await res.json();
              console.log(data, 'here23')
              if (data && data.errors){
                let errorMessage = Object.values(data.errors)
                setErrors(errorMessage);
              }
            } else {
              console.error('Login request failed:', res);
            }
          });
    };

    return (<div className="loginContainer">
        <h1 className="loginHeader">Log In</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="errorContainer"> {errors.map((error, idx) => (<div key={idx}> {error}</div>))} </div>
            <label>
                Username or Email
                <input type="text"
                    value={emailOrUsername}
                    onChange={
                        (e) => setEmailOrUsername(e.target.value)
                    }
                    required/>
                    </label>
            <label>
                Password
                <input type="password"
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    required/>
                    </label>
            <button type="submit">Log In</button>
        </form>
    </div>);
}

export default Login;
