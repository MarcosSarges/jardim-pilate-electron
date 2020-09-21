/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase/app';
import { callbackify } from 'util';

export const { firestore } = firebase;

export const extratorData = (
  result: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  callback: (result: any) => void
) => {
  callback(result.docs.map((el) => el.data()));
};
