import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios";

const accessKey = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwODgyNzIxN30.Ar0QvBe_2p_6xazUW5f8ja9hL3OTPMhQUO7tNP8AV2tB-wh5tcJsiZC5OwiT0EnUHzo54yO95mCcFcgFG3xZaA';
export function* getAttributeSaga(action: any) {
  yield put(actions.getAttributeStart());
  try {
    axios.defaults.headers.common["Authorization"] = accessKey;
    
    const response = yield axios.get(
      "/services/pim/api/attributes?page=0&size=20&sort=attName"
    );
    const fetchAtt = response.data;
    yield put(actions.getAttributeSuccess(fetchAtt));
  } catch (error) {
    yield put(actions.getAttributeFail(error));
  }
}

export function* addAttributeSaga(action: any) {
    yield put(actions.attributesInit());
  try {
    axios.defaults.headers.common["Authorization"] = accessKey;
    
    const response = yield axios.post(
      "/services/pim/api/attributes",
      action.payload
    );
    yield put(actions.addAttributeSuccess(response.data));
  } catch (error) {
    yield put(actions.addAttributeFail(error));
  }
}

export function* editAttributeSaga(action: any) {
    yield put(actions.attributesInit());
  try {
    axios.defaults.headers.common["Authorization"] = accessKey;
    
    const response = yield axios.put(
      "/services/pim/api/attributes",
      action.payload
    );
    yield put(actions.editAttributeSuccess(response.data));
  } catch (error) {
    yield put(actions.editAttributeFail(error));
  }
}

export function* deleteAttributeSaga(action: any) {
    yield put(actions.attributesInit());
  try {
    axios.defaults.headers.common["Authorization"] =  accessKey;
    
    const uri = "/services/pim/api/attributes/" + action.id;
    const response = yield axios.delete(uri);
    yield put(actions.deleteAttributeSuccess(action.id));
  } catch (error) {
    yield put(actions.deleteAttributeFail(error));
  }
}
