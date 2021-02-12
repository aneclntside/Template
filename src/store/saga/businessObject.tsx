import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios";

const accessKey = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwODgyNzIxN30.Ar0QvBe_2p_6xazUW5f8ja9hL3OTPMhQUO7tNP8AV2tB-wh5tcJsiZC5OwiT0EnUHzo54yO95mCcFcgFG3xZaA';
export function* getBusinessObjectSaga(action: any) {
  yield put(actions.getBusinessObjectStart());
  try {
    axios.defaults.headers.common["Authorization"] = accessKey;
    
    const response = yield axios.get(
        "/services/pim/api/business-objects?page=0&size=20&sort=id,asc"
    );
    const fetchBO = response.data;
    yield put(actions.getBusinessObjectSuccess(fetchBO));
  } catch (error) {
    yield put(actions.getBusinessObjectFail(error));
  }
}

export function* addBusinessObjectSaga(action: any) {
    yield put(actions.businessObjectsInit());
  try {
    axios.defaults.headers.common["Authorization"] = accessKey;
    
    const response = yield axios.post(
      "/services/pim/api/business-objects",
      action.payload
    );
    yield put(actions.addBusinessObjectSuccess(response.data));
  } catch (error) {
    yield put(actions.addBusinessObjectFail(error));
  }
}

export function* editBusinessObjectSaga(action: any) {
    yield put(actions.businessObjectsInit());
  try {
    axios.defaults.headers.common["Authorization"] = accessKey;
    
    const response = yield axios.put(
      "/services/pim/api/business-objects",
      action.payload
    );
    yield put(actions.editBusinessObjectSuccess(response.data));
  } catch (error) {
    yield put(actions.editBusinessObjectFail(error));
  }
}

export function* deleteBusinessObjectSaga(action: any) {
    yield put(actions.businessObjectsInit());
  try {
    axios.defaults.headers.common["Authorization"] =  accessKey;
    
    const uri = "/services/pim/api/business-objects/" + action.id;
    const response = yield axios.delete(uri);
    yield put(actions.deleteBusinessObjectSuccess(action.id));
  } catch (error) {
    yield put(actions.deleteBusinessObjectFail(error));
  }
}
