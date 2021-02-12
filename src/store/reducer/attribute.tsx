import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const intialState = {
  attributes: [],
  loading: false,
  error: false,
  submitted: "",
  submitError: false,
};

const attributesInit = (state: any, action: any) => {
  return updateObject(state, {
    loading: false,
    error: false,
    submitted: "",
    submitError: false,
  });
};

const addAttributeSuccess = (state: any, action: any) => {
  return updateObject(state, {
    submitted: "Attribute Added",
    submitError: false,
    attributes: state.attributes.concat(action.payload),
  });
};

const addAttributeFail = (state: any, action: any) => {
  return updateObject(state, { submitted: "", submitError: true });
};

const editAttributeSuccess = (state: any, action: any) => {
  const updatedAttributes = [...state.attributes];
  const attributeIndex = updatedAttributes.findIndex(
      attribute => attribute.id === action.payload.id
  );
  updatedAttributes[attributeIndex] = action.payload;
  return updateObject(state, {
    submitted: "Attribute Updated",
    submitError: false,
    attributes: updatedAttributes,
  });
};

const editAttributeFail = (state: any, action: any) => {
  return updateObject(state, { submitted: "", submitError: true });
};

const deleteAttributeSuccess = (state: any, action: any) => {
  return updateObject(state, {
    submitted: "Attribute Deleted",
    submitError: false,
    attributes: state.attributes.filter((attribute:any) => attribute.id !== action.id),
  });
};

const deleteAttributeFail = (state: any, action: any) => {
  return updateObject(state, { submitted: "", submitError: true });
};

const getAttributeStart = (state: any, action: any) => {
  return updateObject(state, { loading: true });
};

const getAttributeSuccess = (state: any, action: any) => {
  return updateObject(state, {
    attributes: action.payload,
    loading: false,
    error: false,
  });
};

const getAttributeFail = (state: any, action: any) => {
  return updateObject(state, { loading: false, error: true });
};

const reducer = (state = intialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_ATTRIBUTE_START:
      return getAttributeStart(state, action);
    case actionTypes.GET_ATTRIBUTE_SUCESS:
      return getAttributeSuccess(state, action);
    case actionTypes.GET_ATTRIBUTE_FAIL:
      return getAttributeFail(state, action);
    case actionTypes.ATTRIBUTE_INIT:
      return attributesInit(state, action);
    case actionTypes.ADD_ATTRIBUTE_SUCESS:
      return addAttributeSuccess(state, action);
    case actionTypes.ADD_ATTRIBUTE_FAIL:
      return addAttributeFail(state, action);
    case actionTypes.EDIT_ATTRIBUTE_SUCESS:
      return editAttributeSuccess(state, action);
    case actionTypes.EDIT_ATTRIBUTE_FAIL:
      return editAttributeFail(state, action);
    case actionTypes.DELETE_ATTRIBUTE_SUCESS:
      return deleteAttributeSuccess(state, action);
    case actionTypes.DELETE_ATTRIBUTE_FAIL:
      return deleteAttributeFail(state, action);
    default:
      return state;
  }
};

export default reducer;
