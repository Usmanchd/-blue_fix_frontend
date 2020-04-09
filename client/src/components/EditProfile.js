import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddSocialsView from './Views/AddSocialsView';
import { updateUser } from '../actions/registerUser';
import firebase from '../config/fbConfig';
import FileUploader from 'react-firebase-file-uploader';

const EditProfile = ({ loading, user, updateUser, isAuth }) => {
  useEffect(() => {
    setuser({ ...user });
    setloading(false);
  }, [user]);

  const [User, setuser] = useState();
  const [Loading, setloading] = useState(true);

  const [state, setstate] = useState({
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    imageloading: false,
  });
  const handleUploadStart = () =>
    setstate({ ...state, isUploading: true, progress: 0, imageloading: true });
  const handleProgress = (progress) => setstate({ progress });
  const handleUploadError = (error) => {
    setstate({ ...state, isUploading: false });
  };
  const handleUploadSuccess = (filename) => {
    setstate({ ...state, avatar: filename, progress: 100 });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) =>
        setstate({ ...state, avatarURL: url, imageloading: false })
      );
  };

  // const handleUpdateUser = () => {
  //   if (state.avatarURL === '') {
  //     alert('Image is Required');
  //   }
  //   updateUser({ avatarUrl: state.avatarURL });
  // };

  const onChange = (e) => {
    setuser({ ...User, [e.target.name]: e.target.value });
  };
  const onSubmit = (social) => {
    setloading(true);
    let updatedUser = { ...User, social };
    if (state.avatarURL) updatedUser.avatarUrl = state.avatarURL;

    updateUser(updatedUser);
  };

  console.log(state.imageloading);
  if (Loading || state.imageloading === undefined || state.imageloading)
    return <p>loading</p>;
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
                  <img
                    src={
                      state.avatarURL !== '' ? state.avatarURL : User.avatarUrl
                    }
                    id="tmpImg"
                    alt=""
                  />
                  <button class="btnn" type="button">
                    <i class="camera-icon"></i>
                  </button>
                  <small>Change Profile Photo</small>
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    id="img"
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                    // style={{ width: '200px', display: 'none' }}
                  />
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
