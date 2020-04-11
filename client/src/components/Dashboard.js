import React, { useState } from 'react';
import qr from '../assets/imgs/qr-code.svg';
import user from '../assets/imgs/users/33137_5d4db4dc17d01709aac1ce0a4567a278.jpg';
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, updateClicks } from '../actions/registerUser';
var QRCode = require('qrcode.react');
const Dashboard = ({
  authh: { isAuth, loading },
  logout,
  user,
  updateClicks,
}) => {
  const [show, setshow] = useState('');
  const { id } = useParams();

  if (id === undefined && !isAuth && !loading)
    return <Redirect to="/register" />;
  else if ((!isAuth || (id !== undefined && user._id !== id)) && !loading) {
    return <Redirect to={`/profile/${id}`} />;
  }

  const handleClicks = (name) => {
    let social = {
      ...user.social,
      [name]: {
        ...user.social[name],
        clicks: user.social[name].clicks + 1,
      },
    };
    updateClicks({ social }, user._id);
  };

  const getLink = (username) => {
    if (
      username !== 'address' &&
      username !== 'link' &&
      username !== 's_email' &&
      username !== 'website' &&
      username !== 'phone'
    ) {
      if (user.social[username]) {
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

  if (loading || !user.social)
    return <h5 style={{ textAlign: 'center' }}>loading...</h5>;
  else
    return (
      <div>
        <div className="tuto1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tuto-ttl">
                  <Link to="/edit_profile" className="edit1">
                    Edit Profile
                  </Link>
                  <h1>Hello</h1>
                  <span>
                    <a href="!#"></a>
                    my name is
                  </span>
                  <Link to="/login" onClick={logout}>
                    <i className=""></i>
                    Log out
                  </Link>
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
                  src={qr}
                  width="25"
                  className="showPopup"
                  target="#profileQrCon"
                />
              </div>
              <div className="col-12">
                <div className="my-profile-photo">
                  <img src={user.avatarUrl} alt="photo" id="profileImg" />
                </div>
                <h1 id="name">{user.name} </h1>

                <p id="bio">{user.bio}</p>

                <b className="text-center mt-2 mb-2 d-block">
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
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '75%',
                                    margin: 'auto',
                                  }}
                                  onClick={() => handleClicks(username)}
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
                                        marginLeft: '16px',
                                      }}
                                    >
                                      <b>
                                        {username.charAt(0).toUpperCase() +
                                          username.slice(1)}
                                      </b>
                                      <br />
                                      <b style={{ fontSize: '14px' }}>
                                        Clicks:{' '}
                                      </b>
                                      <span style={{ fontSize: '14px' }}>
                                        {user.social[username].clicks}
                                      </span>
                                    </p>
                                  </div>
                                </a>
                              </li>
                              <span
                                style={{
                                  borderTop: '1px solid #bdbdbd',
                                  // height: '1px',
                                  width: '80%',
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
            </div>
          </div>
        </div>

        {/* <div className="col-12 buyNowTopBar d-none">
        <div className="col-12 text-center buyNow">
          Buy <span className="txt-blue">Blue</span> Smart Card
        </div>
        <img src="assets/imgs/xicon.png" width="15" className="clsTopBar" />
      </div>
      <div className="col-12 buyNowWrapper">
        <div className="col-12 text-right pt-4 p-0">
          <img
            src="assets/imgs/xclose.png"
            width="25"
            className="clsPopup"
            target=".buyNowWrapper"
          />
        </div>
        <div className="r2">
          <div className="col-12 text-center pt-2 p-0">
            <img src="assets/imgs/blue-logo.png" width="78" />
          </div>
          <div className="col-12 text-center pt-4">
            <img src="assets/imgs/bluesocialsmartcardbuynow.png" width="100%" />
          </div>
          <div className="col-12 text-center pt-3">
            <h1 className="appDefHdng pb-0">
              <span className="txt-blue appDefHdng">Blue</span> Smart Card
              <br />
              15% OFF
            </h1>
          </div>
          <div className="col-12 text-center pt-1">
            <a
              href="https://blue.social/?afmc=1g"
              target="_blank"
              className="btn mt-1 mb-1"
            >
              BUY NOW
            </a>
          </div>
          <div className="col-12 text-center">
            <span className="btnLater clsBuyPopup">Later</span>
          </div>
        </div>
      </div>
      <div className="col-12" id="profileQrCon">
        <div className="col-12 text-right pt-4 p-0">
          <img
            src="assets/imgs/xclose.png"
            width="25"
            className="clsPopup"
            target="#profileQrCon"
          />
        </div>
      </div>
      <div className="col-12 r2 text-center">
        <div className="col-12 p-0">
          <img src="assets/imgs/users/33489_faedb434dcc8cb929561274d06568271.png" />
        </div>
        <div className="col-12 p-0">
          <h3>Muhammad Arslan Akmal </h3>
        </div>
      </div>
      <div className="col-12 text-center r3">
        <img src="#" />
      </div>
      <div className="col-12 text-center r4">
        <b>Scan this code with a camera</b>

        <br />

        <b>to share your Blue profile.</b>

        <div className="col-12 text-center r5">
          <img src="assets/imgs/blue-logo.png" width="78" />
        </div>*/}
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
  user: state.registerUser.user,
});

export default connect(mapStateToProps, { logout, updateClicks })(Dashboard);
