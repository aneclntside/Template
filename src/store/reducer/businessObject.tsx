import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const intialState = {
  businessObjects: [],
  loading: false,
  error: false,
  submitted: "",
  submitError: false,
};

const businessObjectsInit = (state: any, action: any) => {
  return updateObject(state, {
    loading: false,
    error: false,
    submitted: "",
    submitError: false,
  });
};

const addBusinessObjectSuccess = (state: any, action: any) => {
  return updateObject(state, {
    submitted: "BusinessObject Added",
    submitError: false,
    businessObjects: state.businessObjects.concat(action.payload),
  });
};

const addBusinessObjectFail = (state: any, action: any) => {
  return updateObject(state, { submitted: "", submitError: true });
};

const editBusinessObjectSuccess = (state: any, action: any) => {
  const updatedBusinessObjects = [...state.businessObjects];
  const businessObjectIndex = updatedBusinessObjects.findIndex(
      businessObject => businessObject.id === action.payload.id
  );
  updatedBusinessObjects[businessObjectIndex] = action.payload;
  return updateObject(state, {
    submitted: "BusinessObject Updated",
    submitError: false,
    businessObjects: updatedBusinessObjects,
  });
};

const editBusinessObjectFail = (state: any, action: any) => {
  return updateObject(state, { submitted: "", submitError: true });
};

const deleteBusinessObjectSuccess = (state: any, action: any) => {
  return updateObject(state, {
    submitted: "BusinessObject Deleted",
    submitError: false,
    businessObjects: state.businessObjects.filter((businessObject:any) => businessObject.id !== action.id),
  });
};

const deleteBusinessObjectFail = (state: any, action: any) => {
  return updateObject(state, { submitted: "", submitError: true });
};

const getBusinessObjectStart = (state: any, action: any) => {
  return updateObject(state, { loading: true });
};

const getBusinessObjectSuccess = (state: any, action: any) => {
  return updateObject(state, {
    businessObjects: action.payload,
    loading: false,
    error: false,
  });
};

const getBusinessObjectFail = (state: any, action: any) => {
  return updateObject(state, { loading: false, error: true });
};

const reducer = (state = intialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_BO_START:
      return getBusinessObjectStart(state, action);
    case actionTypes.GET_BO_SUCESS:
      return getBusinessObjectSuccess(state, action);
    case actionTypes.GET_BO_FAIL:
      return getBusinessObjectFail(state, action);
    case actionTypes.BO_INIT:
      return businessObjectsInit(state, action);
    case actionTypes.ADD_BO_SUCESS:
      return addBusinessObjectSuccess(state, action);
    case actionTypes.ADD_BO_FAIL:
      return addBusinessObjectFail(state, action);
    case actionTypes.EDIT_BO_SUCESS:
      return editBusinessObjectSuccess(state, action);
    case actionTypes.EDIT_BO_FAIL:
      return editBusinessObjectFail(state, action);
    case actionTypes.DELETE_BO_SUCESS:
      return deleteBusinessObjectSuccess(state, action);
    case actionTypes.DELETE_BO_FAIL:
      return deleteBusinessObjectFail(state, action);
    default:
      return state;
  }
};

export default reducer;
