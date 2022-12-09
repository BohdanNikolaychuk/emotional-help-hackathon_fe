import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import authImage from '../../assets/Register.svg';

import './Login.css';
import '../../common/styles/form.css';
import '../../common/styles/auth.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  const submitForm = (event) => {
    event.preventDefault();

    if (!username || !password) return;

    logIn({ username, password })
      .then(() => {})
      .catch(() => {});
  };

  const handleFieldChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  return (
    <div className="login">
      <div className="container login-container">
        <form className="common-form login-form" onSubmit={submitForm}>
          <h3 className="common-form-title">Login into Your Account</h3>

          <div className="common-form-redirect">
            <Link className="common-form-redirect-link" to="/registration">
              Or register with email
            </Link>
          </div>

          <fieldset className="common-form-fieldset">
            <Input
              labelText="Full Name"
              value={username}
              onChange={(event) => handleFieldChange(event, setUsername)}
            />
          </fieldset>

          <fieldset className="common-form-fieldset common-form-passwords">
            <Input
              labelText="Password"
              value={password}
              type="password"
              onChange={(event) => handleFieldChange(event, setPassword)}
            />
          </fieldset>

          <fieldset className="common-form-fieldset common-form-footer">
            <div className="common-form-button">
              <Button buttonText="CONTINUE" type="submit" />
            </div>
          </fieldset>
        </form>
        <div className="auth-content">
          <h2 className="auth-title">Lorem ipsum dolor sit amet</h2>
          <p className="auth-text">
            consectetur adipiscing elit. Suspendisse sed urna in justo euismod condimentum.
          </p>
          <div className="auth-image">
            <img className="auth-img" src={authImage} alt="Imagefor Medical registration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
