import React from 'react';
import background from '../assets/bg.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="tuto1">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tuto-ttl">
              <h1>Hello</h1>
              <span>my name is</span>
            </div>
          </div>
        </div>
      </div>

      <div className="disco-path">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="headline">
                <h1 className="">
                  Create your personal profile to share with friends nearby
                </h1>
              </div>
            </div>
            <div className="col-12">
              <img src={background} className="img-fluid" alt="background" />
            </div>
            <div className="col-12">
              <Link to="/register" className="btn">
                Get Started on Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
