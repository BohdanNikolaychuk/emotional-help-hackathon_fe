import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';
import { Checkbox } from '@mui/material';

import authImage from '../../assets/Register.svg';

import '../../common/styles/form.css';
import '../../common/styles/auth.css';
import './Registration.css';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [policyConfirmed, setPolicyConfirmed] = useState(false);
  const { signUp } = useAuth();

  const submitRegistration = (event) => {
    event.preventDefault();

    if (!username || !email || !password || !rePassword || !policyConfirmed) return;
    if (password !== rePassword) return;

    signUp({ username, email, password })
      .then(() => {})
      .catch(() => {
        alert('Write correct value');
      });
  };

  const handleFieldChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const toggleCheckbox = (event) => {
    setPolicyConfirmed(event.target.checked);
  };

  return (
    <div className="registration">
      <div className="container registration-container">
        <form className="common-form registration-form" onSubmit={submitRegistration}>
          <h3 className="common-form-title">Create Your Account</h3>

          <div className="common-form-redirect">
            <Link className="common-form-redirect-link" to="/login">
              Or login with your name
            </Link>
          </div>

          <fieldset className="common-form-fieldset">
            <Input
              labelText="Name"
              value={username}
              onChange={(event) => handleFieldChange(event, setUsername)}
            />
          </fieldset>

          <fieldset className="common-form-fieldset">
            <Input
              labelText="Email"
              value={email}
              type="email"
              onChange={(event) => handleFieldChange(event, setEmail)}
            />
          </fieldset>

          <fieldset className="common-form-fieldset common-form-passwords">
            <Input
              labelText="Password"
              value={password}
              type="password"
              onChange={(event) => handleFieldChange(event, setPassword)}
            />

            <Input
              labelText="Repeat password"
              value={rePassword}
              type="password"
              onChange={(event) => handleFieldChange(event, setRePassword)}
            />
          </fieldset>

          <fieldset className="common-form-fieldset common-form-footer">
            <div className="common-form-confirm">
              <Checkbox
                checked={policyConfirmed}
                onChange={toggleCheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <p className="common-form-policy">
                I have read and accept the Terms of <br />
                <Link className="common-form-policy-link" to="/policy">
                  Service & Privacy Policy*
                </Link>
              </p>
            </div>

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

export default Registration;
