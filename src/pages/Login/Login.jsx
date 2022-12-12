import {useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import {useInput} from "../../hooks/useInput";

import getIsFormValid from "../../utils/getFormValid";
import getFormErrors from "../../utils/getFormErrors";
import {createFormErrors} from "../../utils/createFormErrors";

import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import authImage from '../../assets/Register.svg';

import './Login.css';
import '../../common/styles/form.css';
import '../../common/styles/auth.css';
import '../../common/styles/inputErrors.css'

function Login() {
  const username = useInput('', {minLength: 7, maxLength: 25, required: true});
  const password = useInput('', {minLength: 7, maxLength: 25, required: true});
  const { logIn, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [username.value, password.value]);

  const submitForm = (event) => {
    event.preventDefault();

    if (!username.value || !password.value ) return;

    logIn({ username: username.value, password: password.value });
  };


  const isFormValid = getIsFormValid(username.isValid, password.isValid);
  const usernameErrors = createFormErrors(username.errors, username.touched);
  const passwordErrors = createFormErrors(password.errors, password.touched);
  const formErrors = getFormErrors(error);

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
            <div className='common-form-fieldset-row'>
              <div className='common-form-fieldset-button'>
                <Input
                    labelText="Full Name"
                    value={username.value}
                    onBlur={username.onBlur}
                    onChange={username.onChange}
                />
              </div>
              {usernameErrors}
            </div>
          </fieldset>

          <fieldset className="common-form-fieldset common-form-passwords">
            <div className='common-form-fieldset-row'>
              <div className='common-form-fieldset-button'>
                <Input
                    labelText="Password"
                    value={password.value}
                    type="password"
                    onBlur={password.onBlur}
                    onChange={password.onChange}
                />
              </div>
              {passwordErrors}
            </div>
          </fieldset>

          {formErrors}

          <fieldset className="common-form-fieldset common-form-footer">
            <div className="common-form-button">
              <Button
                  buttonText="CONTINUE"
                  type="submit"
                  disabled={!isFormValid}
              />
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
