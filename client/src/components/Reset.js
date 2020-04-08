import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/imgs/blue-logo.png';

const Reset = () => {
  return (
    <div class="my-name create-account wel-back">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login1">
              <Link to="register" className="account1">
                Don’t have an account?
              </Link>
              <Link to="register" className="log-in">
                SIGN UP
              </Link>
            </div>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <form id="sendOtp">
              <h1>Send 4 digit code</h1>
              <p className="p1">
                Enter the email address associated with your account, and we’ll
                email you a 4 digit code to reset your password.
              </p>
              <input
                type="email"
                name="email"
                id="iEmail"
                placeholder="Email address"
                required
              />
              <button className="btn w-100prc" id="submitBtnSendOtp">
                Send 4 digit code
              </button>
            </form>
            <form id="submitOtp" className="d-none">
              <h1>Submit 4 digit code</h1>
              <p className="p1">
                Enter the 4 digit code recieved on the{' '}
                <span className="email"></span>.
              </p>
              <input type="number" name="otp" id="iOtp" placeholder="OTP" />
              <button className="btn w-100prc" id="submitBtnOtp">
                Submit Code
              </button>
            </form>
            <form id="resetPass" className="d-none">
              <h1>Reset Password</h1>
              <p className="p1"></p>
              <input
                type="password"
                name="password"
                id="pass"
                placeholder="New Password"
              />
              <input
                type="password"
                id="rePass"
                placeholder="Retype Password"
              />
              <button className="btn w-100prc" id="submitBtnResetPass">
                Submit
              </button>
            </form>
            <Link to="login" className="forgot">
              Back to Login?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
