import { nextTick } from "process";

export const updateObject = (oldObject: any, updatedObject: any) => {
  return {
    ...oldObject,
    ...updatedObject,
  };
};

export const updateArray = (oldObject: any, updatedObject: any) => {
  return [...oldObject, ...updatedObject];
};

export const editObject = (editedObject: any) => {
  const updatedObject = { ...editedObject };
  const elementConfigs = [...updatedObject.elementConfigs];
  const updatedElementConfigs = elementConfigs.filter(
    (element: any) => element.fieldValue
  );
  updatedObject.elementConfigs = updatedElementConfigs;
  return updatedObject;
};

export const convertDynamicFields = (attObject: any, dynamicObject: any) => {
  for (let key in attObject) {
    const fieldName = attObject[key].fieldName;
    const fieldValue = attObject[key].fieldValue;
    const field = {...dynamicObject[fieldName]};
    if (field !== undefined) {field.value = fieldValue;
      dynamicObject[fieldName] = field;
    }
  }
};

export const upsert = (
  array: { fieldName: any; fieldValue: any }[],
  item: { fieldName: any; fieldValue: any }
) => {
  // (1)
  const i = array.findIndex(function (_item, index) {
    return _item.fieldName === item.fieldName ? true : false;
  });
  if (i > -1) array[i] = item;
  // (2)
  else array.push(item);
};
