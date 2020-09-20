/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';

// --- FIREBASE
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// @ts-ignore
import { history, configuredStore } from './redux/store';

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  try {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY || '',
      authDomain: process.env.REACT_APP_AUTH_DOMAIN || '',
      databaseURL: process.env.REACT_APP_DATABASE_URL || '',
      projectId: process.env.REACT_APP_PROJECT_ID || '',
      storageBucket: process.env.REACT_APP_STORE_BUCKET || '',
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || '',
      appId: process.env.REACT_APP_APP_ID || '',
      measurementId: process.env.REACT_APP_MEASUREMENT_ID || '',
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.auth().signInAnonymously();
  } catch (error) {
    console.log('Error ao iniciar FIREBASE', { error });
  }

  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});
