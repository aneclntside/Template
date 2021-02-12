import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {getAttributeSaga, addAttributeSaga, editAttributeSaga, deleteAttributeSaga} from './attribute';
import { addBusinessObjectSaga, editBusinessObjectSaga, deleteBusinessObjectSaga, getBusinessObjectSaga } from './businessObject';

export function* watchAttributes() {
    yield takeLatest(actionTypes.ADD_ATTRIBUTE, addAttributeSaga);
    yield takeLatest(actionTypes.EDIT_ATTRIBUTE, editAttributeSaga);
    yield takeLatest(actionTypes.DELETE_ATTRIBUTE, deleteAttributeSaga);
    yield takeLatest(actionTypes.GET_ATTRIBUTE, getAttributeSaga);
}

export function* watchBusinessObjects() {
    yield takeLatest(actionTypes.ADD_BO, addBusinessObjectSaga);
    yield takeLatest(actionTypes.EDIT_BO, editBusinessObjectSaga);
    yield takeLatest(actionTypes.DELETE_BO, deleteBusinessObjectSaga);
    yield takeLatest(actionTypes.GET_BO, getBusinessObjectSaga);
}