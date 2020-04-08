import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddSocialsView from './Views/AddSocialsView';
import { updateUser } from '../actions/registerUser';
const EditProfile = ({ loading, user, updateUser, isAuth }) => {
  useEffect(() => {
    setuser({ ...user });
    setloading(false);
  }, [user]);
  const [User, setuser] = useState();
  const [Loading, setloading] = useState(true);
  const onChange = (e) => {
    setuser({ ...User, [e.target.name]: e.target.value });
  };
  const onSubmit = (social) => {
    setloading(true);
    updateUser({ ...User, social });
  };

  console.log(User);
  if (Loading) return <p>loading</p>;
  else if (!user && loading) return <p>loading</p>;
  else if (!isAuth) {
    return <Redirect to="/register" />;
  } else
    return (
      <div className="add-pro-photo edit-pro edit-pro2 social-link">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form id="imgForm">
                <div class="edit-pro-ttl">
                  <span>EDIT PROFILE</span>
                  <Link to={`/dashboard/${User._id}`}>
                    <i class="fas fa-times-circle"></i>
                  </Link>
                </div>
                <div class="upload-btn-wrapper">
                  <img src={User.avatarUrl} id="tmpImg" alt="" />
                  <button class="btnn" type="button">
                    <i class="camera-icon"></i>
                  </button>
                  <small>Change Profile Photo</small>
                  <input name="img" type="file" id="img" />
                </div>
              </form>
              <form>
                <div class="form-con">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    value={User.name}
                    onChange={onChange}
                  />
                </div>
                <div class="form-con">
                  <span>Email</span>
                  <input
                    name="email"
                    type="text"
                    value={User.email}
                    onChange={onChange}
                  />
                </div>
                <div class="form-con">
                  <span>My Bio</span>
                  <textarea name="bio" value={User.bio} onChange={onChange} />
                </div>
              </form>

              <h4>Social Networks</h4>
              <AddSocialsView
                onSubmit={onSubmit}
                mode={'edit'}
                initialState={user.social}
                id={user._id}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  user: state.registerUser.user,
  isAuth: state.registerUser.isAuth,
  loading: state.registerUser.loading,
});

export default connect(mapStateToProps, { updateUser })(EditProfile);
