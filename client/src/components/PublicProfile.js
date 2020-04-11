import React, { useEffect, useState } from 'react';

import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/registerUser';
import axios from 'axios';
var QRCode = require('qrcode.react');

const PublicProfile = ({ authh: { isAuth, loading }, logout, logedUser }) => {
  const { id } = useParams();
  const [user, setuser] = useState();
  const [show, setshow] = useState('show1');

  useEffect(() => {
    (() =>
      axios
        .get(`/api/users/current/${id}`)
        .then((user) => setuser(user.data)))();
  }, []);

  // const handleClicks = async (name) => {
  //   const config = {
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   };

  //   let social = {
  //     ...user.social,
  //     [name]: {
  //       ...user.social[name],
  //       clicks: user.social[name].clicks + 1,
  //     },
  //   };
  //   const body = JSON.stringify({ social });

  //   try {
  //     const User = await axios.post(
  //       `/api/users/update_clicks/${user._id}`,
  //       body,
  //       config
  //     );
  //     setuser({ ...User.data });
  //   } catch (err) {}
  // };

  const getLink = (username) => {
    if (
      username !== 'address' &&
      username !== 'link' &&
      username !== 's_email' &&
      username !== 'website' &&
      username !== 'phone'
    ) {
      if (user.social[username].value) {
        if (username === 'spotify')
          return `http://open.${username}.com/add/${user.social[username].value}`;
        else if (username === 'snapchat')
          return `http://${username}.com/add/${user.social[username].value}}`;
        else if (username === 'whatsapp')
          return `https://api.whatsapp.com/send?phone=${user.social[username].value}`;
        else return `http://${username}.com/${user.social[username].value}`;
      }
    }
  };

  if (logedUser !== null && id === logedUser._id)
    return <Redirect to="/login" />;

  if (loading || !user)
    return <p style={{ textAlign: 'center' }}>loading...</p>;
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
                  {isAuth ? (
                    <Link to="/login">
                      <i className=""></i>
                      Profile
                    </Link>
                  ) : (
                    <Link to="/login">
                      <i className=""></i>
                      Login
                    </Link>
                  )}
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
                  <img src={user.avatarUrl} alt="photo" id="profileImg" />
                </div>
                <h1 id="name">{user.name}</h1>
                <p id="bio">{user.bio}</p>
                <div className="col-12" id="btnDownloadVcard">
                  <a
                    href={`https://profileblue.herokuapp.com/api/users/vcf/${user._id}`}
                    download
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
                    <ul className="row">
                      {Object.keys(user.social).map(
                        (username) =>
                          user.social[username].value !== '' && (
                            <React.Fragment>
                              <li className="col-12">
                                <a
                                  type="instagram"
                                  href={getLink(username)}
                                  target="_blank"
                                  // onClick={() => handleClicks(username)}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '100%',
                                    margin: 'auto',
                                  }}
                                >
                                  <img
                                    src={
                                      username === 'address'
                                        ? 'https://www.profiles.blue/assets/imgs/map.png'
                                        : `https://www.profiles.blue/assets/imgs/social-network-${username}.png`
                                    }
                                  />
                                  <div>
                                    <p
                                      style={{
                                        marginBottom: '0',
                                        marginLeft: '10px',
                                      }}
                                    >
                                      <b>
                                        {username.charAt(0).toUpperCase() +
                                          username.slice(1)}
                                      </b>
                                      <br />
                                      {/* <b>Clicks: </b>
                                      {user.social[username].clicks} */}
                                    </p>
                                  </div>
                                </a>
                              </li>
                              <span
                                style={{
                                  borderTop: '1px solid #bdbdbd',
                                  // height: '1px',
                                  width: '100%',
                                  margin: 'auto',
                                }}
                              ></span>
                            </React.Fragment>
                          )
                      )}
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
              <div className="col-12 p-0 ">
                <img src={user.avatarUrl} width="200" />
              </div>
              <div className="col-12 p-0">
                <h3>{user.name}</h3>
              </div>
            </div>
            <div className="col-12 text-center r3">
              <QRCode
                value={`https://profileblue.herokuapp.com/profile/${user._id}`}
              />
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
  logedUser: state.registerUser.user,
});

export default connect(mapStateToProps, { logout })(PublicProfile);
