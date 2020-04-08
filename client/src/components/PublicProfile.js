import React, { useEffect, useState } from 'react';
import qr from '../assets/imgs/qr-code.svg';
import user from '../assets/imgs/users/33137_5d4db4dc17d01709aac1ce0a4567a278.jpg';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/registerUser';
const PublicProfile = ({ authh: { isAuth, loading }, logout }) => {
  const [user, setuser] = useState();
  const [show, setshow] = useState('show1');
  useEffect(() => {}, []);
  if (loading) return <p>loading</p>;
  else
    return (
      <div>
        <div className="tuto1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tuto-ttl">
                  <h1>Hello</h1>
                  <span>my name is</span>
                  <a href="">
                    <i className=""></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-profile">
          <div className="container">
            <div className="row">
              <div
                className="col-12 text-right pt-2 pl-2 pr-2"
                onClick={() => setshow('show')}
              >
                <img
                  src="https://www.profiles.blue/assets/imgs/qr-code.svg"
                  width="25"
                  className="showPopup"
                  target="#profileQrCon"
                />
              </div>
              <div className="col-12">
                <div className="my-profile-photo">
                  <img
                    src="https://www.profiles.blue/assets/imgs/users/33406_295837b07376f707dec3e74c92f838b4.jpg"
                    alt="photo"
                    id="profileImg"
                  />
                </div>
                <h1 id="name">Metro</h1>
                <p id="bio">ljk</p>
                <div className="col-12" id="btnDownloadVcard">
                  <a
                    href="https://www.profiles.blue/download/vcard/33406"
                    target="_blank"
                    className="btn"
                  >
                    Add to Contacts <i className="fa fa-download"></i>
                  </a>
                </div>
                <b className="text-center mt-2 mb-2 d-block">
                  <a className="d-block href" id="shareContact">
                    Share My Contact With Metro?
                  </a>
                  <div className="col-12 social2">
                    <ul className="row selfPro">
                      <li className="col-12">
                        <a
                          type="instagram"
                          href="http://instagram.com/adsfs"
                          target="_blank"
                        >
                          <img src="https://www.profiles.blue/assets/imgs/social-network-instagram.png" />
                          <div>
                            <p>
                              <b>Instagram</b>
                            </p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </b>
              </div>
              <b className="text-center mt-2 mb-2 d-block"></b>
            </div>
            <b className="text-center mt-2 mb-2 d-block"></b>
          </div>
          <b className="text-center mt-2 mb-2 d-block"></b>
        </div>
        <div>
          <div className={`col-12 ${show}`} id="profileQrCon">
            <div
              className="col-12 text-right pt-4 p-0"
              onClick={() => setshow('')}
            >
              <img
                src="https://www.profiles.blue/assets/imgs/xclose.png"
                width="25"
                className="clsPopup"
                target="#profileQrCon"
              />
            </div>
            <div className="col-12 r2 text-center">
              <div className="col-12 p-0">
                <img src="https://www.profiles.blue/assets/imgs/users/33406_295837b07376f707dec3e74c92f838b4.jpg" />
              </div>
              <div className="col-12 p-0">
                <h3>Metro</h3>
              </div>
            </div>
            <div className="col-12 text-center r3">
              <img src="https://www.profiles.blue/assets/imgs/users/qr/33406.png" />
            </div>
            <div className="col-12 text-center r4">
              <b>Scan this code with a camera</b>
              <br />
              <b>to share your Blue profile.</b>
            </div>
            <div className="col-12 text-center r5">
              <img
                src="https://www.profiles.blue/assets/imgs/blue-logo.png"
                width="78"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  authh: state.registerUser,
  user: state.registerUser.user,
});

export default connect(mapStateToProps, { logout })(PublicProfile);
