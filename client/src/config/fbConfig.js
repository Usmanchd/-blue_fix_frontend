import * as firebase from 'firebase/app';
import 'firebase/storage';

// Replace this with your own config details
var config = {
  apiKey: 'AIzaSyC46xvchpBhMKqTwdj2TCS63DyZFg6tDZs',
  authDomain: 'blue-f42e7.firebaseapp.com',
  databaseURL: 'https://blue-f42e7.firebaseio.com',
  projectId: 'blue-f42e7',
  storageBucket: 'blue-f42e7.appspot.com',
  messagingSenderId: '124711658617',
  appId: '1:124711658617:web:70ffcd41d42bc53ece60a8',
};
firebase.initializeApp(config);

export default firebase;
