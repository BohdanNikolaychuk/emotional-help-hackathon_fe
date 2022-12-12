import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import {useInput} from "../../hooks/useInput";

import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import getIsFormValid from "../../utils/getFormValid";
import createFormErrors from "../../utils/createFormErrors";
import getFormErrors from "../../utils/getFormErrors";

import { Checkbox } from '@mui/material';

import authImage from '../../assets/Register.svg';

import '../../common/styles/form.css';
import '../../common/styles/auth.css';
import './Registration.css';


function Registration() {
  const username = useInput('', { minLength: 7, maxLength: 25, required: true });
  const email = useInput('', { minLength: 7, maxLength: 25, required: true, email: true });
  const password = useInput('', { minLength: 7, maxLength: 25, required: true });
  const rePassword = useInput('', { minLength: 7, maxLength: 25, required: true });
  const [formError, setFormError] = useState('');

  const [policyConfirmed, setPolicyConfirmed] = useState(false);
  const { signUp, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
    setFormError('');
  }, [username.value, email.value, password.value, rePassword.value]);


  const submitRegistration = (event) => {
    event.preventDefault();

    if (!username.value || !email.value || !password.value || !rePassword.value ) {
      setFormError('Please provide all values');
      return;
    }

    if (password.value !== rePassword.value ) {
      setFormError('Passwords should be equal');
      return;
    }


    signUp({
      username: username.value,
      email: email.value,
      password: password.value
    });
  };

  const toggleCheckbox = (event) => {
    setPolicyConfirmed(event.target.checked);
  };



  const isFormValid = getIsFormValid(username.isValid, email.isValid, password.isValid, rePassword.isValid);
  const usernameErrors = createFormErrors(username.errors, username.touched);
  const emailErrors = createFormErrors(email.errors, email.touched);
  const passwordErrors = createFormErrors(password.errors, password.touched);
  const rePasswordErrors = createFormErrors(rePassword.errors, rePassword.touched);
  const formErrors = getFormErrors(error, formError);

  return (
    <div className="registration">
      <div className="container registration-container">
        <form
            className="common-form registration-form"
            onSubmit={submitRegistration}
        >
          <h3 className="common-form-title">Create Your Account</h3>

          <div className="common-form-redirect">
            <Link className="common-form-redirect-link" to="/login">
              Or login with your name
            </Link>
          </div>

          <fieldset className="common-form-fieldset">
            <div className='common-form-fieldset-row'>
              <div className='common-form-fieldset-button'>
                <Input
                    labelText="Name"
                    value={username.value}
                    onChange={username.onChange}
                    onBlur={username.onBlur}
                />
              </div>
              {usernameErrors}
            </div>
          </fieldset>

          <fieldset className="common-form-fieldset">
            <div className='common-form-fieldset-row'>
              <div className='common-form-fieldset-button'>
                <Input
                    labelText="Email"
                    type="email"
                    value={email.value}
                    onChange={email.onChange}
                    onBlur={email.onBlur}
                />
              </div>
              {emailErrors}
            </div>

          </fieldset>

          <fieldset className="common-form-fieldset common-form-passwords">
            <div className='common-form-fieldset-row'>
              <div className='common-form-fieldset-button'>
                <Input
                    labelText="Password"
                    type="password"
                    value={password.value}
                    onChange={password.onChange}
                    onBlur={password.onBlur}
                />
              </div>
              {passwordErrors}
            </div>

            <div className='common-form-fieldset-row'>
              <div className='common-form-fieldset-button'>
                <Input
                    labelText="Repeat password"
                    type="password"
                    value={rePassword.value}
                    onChange={rePassword.onChange}
                    onBlur={rePassword.onBlur}
                />
              </div>
              {rePasswordErrors}
            </div>
          </fieldset>

          {formErrors}

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

export default Registration;
