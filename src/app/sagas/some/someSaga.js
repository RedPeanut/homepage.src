import React from "react";
import {put, call, cancel, cancelled, takeLatest, select, race, take} from 'redux-saga/effects'
import {fromJS, List, Map} from 'immutable';

//import * as someSaga from '../../sagas/some/someSaga'
//import * as someTypes from '../../actions/some/types';
//import * as Api from "../../apis/apis";

/* types */
export const METHOD_URL_REQUEST = 'METHOD_URL_REQUEST';
export const METHOD_URL_SUCCESS = 'METHOD_URL_SUCCESS';

/* api */
export const Api = {
  getXyz: function() {
    let url = globals.someApiUrl + '/x/y/z';
    return Ajax.get(url).then((response) => {
        response = JSON.parse(response);
        return response;
    }).catch(err => ({err}));
  }
};

/*  */
export function* getXyz() {

  try {
    const response = yield call(Api.getXyz, {
        param_a: "",
        param_b: ""
      }
    );

    if(response.resultCode === 200) {
      let resultData = fromJS(response.resultData);

      let v = resultData.v;

      yield put({
        type: METHOD_URL_SUCCESS,
        payload: v,
      });
    }
  } catch (error) {
    console.log("error = ", error);
  }
}

/* sagas */
export default [
  takeLatest(METHOD_URL_REQUEST , getXyz),
];