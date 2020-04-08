import React, { useState, useEffect } from 'react';
// import avatar from '../assets/imgs/blue-logo.png';
import { Link } from 'react-router-dom';

const AddSocialsView = ({ onSubmit, mode, initialState, id }) => {
  useEffect(() => {
    if (mode !== 'gettingStarted') {
      setstate({ ...state, ...initialState });
    }
  }, []);

  const [state, setstate] = useState({
    instagram: '',
    venmo: '',
    snapchat: '',
    whatsapp: '',
    phone: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    pinterest: '',
    applemusic: '',
    spotify: '',
    paypal: '',
    soundcloud: '',
    website: '',
    link: '',
    s_email: '',
    address: '',
  });

  const [display, setdisplay] = useState({
    instagram: 'none',
    venmo: 'none',
    snapchat: 'none',
    twitter: 'none',
    facebook: 'none',
    whatsapp: 'none',
    phone: 'none',
    linkedin: 'none',
    youtube: 'none',
    pinterest: 'none',
    applemusic: 'none',
    spotify: 'none',
    paypal: 'none',
    soundcloud: 'none',
    website: 'none',
    link: 'none',
    s_email: 'none',
    address: 'none',
  });

  const getLink = (social) => {
    if (
      social !== 'address' &&
      social !== 'link' &&
      social !== 's_email' &&
      social !== 'website' &&
      social !== 'phone' &&
      social !== 'whatsapp'
    ) {
      if (state[social]) {
        return (
          <li
            className="urlCon"
            style={{ display: display[social] }}
            id="uc_instagram"
          >
            {social === 'spotify' ? (
              <div>
                <p className="m-0">
                  http://open.{social}.com/add/{state[social]}
                  <b></b>
                </p>
              </div>
            ) : (
              <div>
                <p className="m-0">
                  {social === 'snapchat'
                    ? `http://${social}.com/add/${state[social]}`
                    : `http://${social}.com/${state[social]}`}
                  <b></b>
                </p>
              </div>
            )}
          </li>
        );
      }
    }
  };

  return (
    <div id="show1" className="toppad showtxt1">
      <form onSubmit={(e) => e.preventDefault()}>
        <ul>
          {[
            'instagram',
            'venmo',
            'snapchat',
            'twitter',
            'facebook',
            'linkedin',
            'youtube',
            'pinterest',
            'whatsapp',
            'applemusic',
            'spotify',
            'paypal',
            'soundcloud',
            'website',
            'link',
            'phone',
            's_email',
            'address',
          ].map((social) => (
            <React.Fragment>
              <li>
                <div className="s-img">
                  <img
                    src={
                      social === 'address'
                        ? 'https://www.profiles.blue/assets/imgs/map.png'
                        : `https://www.profiles.blue/assets/imgs/social-network-${social}.png`
                    }
                    alt="social"
                  />
                </div>
                <input
                  value={state[social]}
                  onChange={(e) => {
                    if (e.target.value[e.target.value.length - 1] === ' ')
                      return;
                    setstate({
                      ...state,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onFocus={(e) =>
                    setdisplay({ ...display, [e.target.name]: 'block' })
                  }
                  onBlur={(e) =>
                    setdisplay({ ...display, [e.target.name]: 'none' })
                  }
                  name={social}
                  placeholder={social.toUpperCase()}
                  className="socLink"
                  type="text"
                />
              </li>
              {getLink(social)}
            </React.Fragment>
          ))}
        </ul>
        {mode === 'gettingStarted' ? (
          <React.Fragment>
            <Link to={`/dashboard/${id}`}>
              <button
                className="btn w-100prc"
                id="submitBtn"
                onClick={() => onSubmit(state)}
              >
                Connect
              </button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to={`/dashboard/${id}`}>
              <button
                className="btn w-100prc"
                id="submitBtn"
                onClick={() => onSubmit(state)}
              >
                Save
              </button>
            </Link>
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default AddSocialsView;
