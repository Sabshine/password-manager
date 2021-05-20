import * as actionTypes from './actionTypes';
import axios from '../../axios-passdata';
import CryptoJS from 'crypto-js';

export const addPassSuccess = (id, passData) => {
  return {
    type: actionTypes.ADD_PASS_SUCCESS,
    passId: id,
    passData: passData
  };
};

export const addPassFail = (error) => {
  return {
    type: actionTypes.ADD_PASS_FAIL,
    error: error
  };
};

export const addPassStart = () => {
  return {
    type: actionTypes.ADD_PASS_START,
  };
};

export const addPass = (passData, token) => {
  return dispatch => {
    dispatch(addPassStart());
    axios.post( '/passdata.json?auth=' + token, passData )
      .then( response => {
        dispatch(addPassSuccess(response.data, passData));
      } )
      .catch( error => {
        dispatch(addPassFail(error));
      } );
  };
};

export const fetchPassSuccess = (passwords) => {
  return {
    type: actionTypes.FETCH_PASS_SUCCESS,
    passwords: passwords
  };
};

export const fetchPassFail = (error) => {
  return {
    type: actionTypes.FETCH_PASS_FAIL,
    error: error
  };
};

export const fetchPassStart = () => {
  return{
    type: actionTypes.FETCH_PASS_START,
  };
};

export const fetchPass = (token, userId, isSearch) => {
  return dispatch => {
    dispatch(fetchPassStart());
    let queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get( '/passdata.json' + queryParams)
        .then( res => {
            let fetchedPasswords = [];
            if (isSearch){
              for ( let key in res.data ) {
                let applicationValue = res.data[key].formData.application.toLowerCase();
                if (applicationValue.includes(isSearch)){
                  fetchedPasswords.push( {
                    ...res.data[key],
                    id: key
                  } );
                } 
            }
            } else {
              for ( let key in res.data ) {
                fetchedPasswords.push( {
                    ...res.data[key],
                    id: key
              } );
            }
            }
            //decrypting password and adding it to the fetchedpasswords array which contains more data than only passwords
            for (let key in fetchedPasswords) {
              const bytes  = CryptoJS.AES.decrypt(fetchedPasswords[key].formData.password, 'secret key 123');
              const originalPass = bytes.toString(CryptoJS.enc.Utf8);
              fetchedPasswords[key].formData.password = originalPass;
            }
            dispatch(fetchPassSuccess(fetchedPasswords));
        } )
        .catch( err => {
            dispatch(fetchPassFail(err));
        } );
  };
};