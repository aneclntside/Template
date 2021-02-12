import React from "react";
import * as dynamicContent from "../../../components/AddAttributes/DynamicContent";
import {
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonInput,
} from "@ionic/react";

export const setInitAttribute = (attributeTemp: any) => {
  const elementConfigsTemp = { ...attributeTemp.elementConfigsTemp };
  const selectedOption1 = [...attributeTemp.elementConfigs];
  const businessObjects = [...attributeTemp.businessObjects];
  const validation = [...attributeTemp.validations];
  attributeTemp.elementConfigsTemp = elementConfigsTemp;
  attributeTemp.elementConfigs = selectedOption1;
  attributeTemp.businessObjects = businessObjects;
  attributeTemp.validations = validation;
};


const getSubOptions = (
  name: string,
  options: dynamicContent.OPTIONS[],
  valueRef: any,
  onInputChangeHandler: any,
  display:any
) => {
  const inputElement = (
    <IonCol size="12" size-md="6" key={name}>
      <IonItem>
        <IonLabel position="floating">{name}</IonLabel>
        <IonSelect
          disabled={display}
          onIonChange={(event: any) => onInputChangeHandler(event, name)}
          interface="popover"
          value={valueRef}
        >
          {options.map((value, i) => (
            <IonSelectOption key={i} value={value.value}>
              {value.value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonCol>
  );

  return inputElement;
};

export const getInput = (inputObject: any, onInputChangeHandler: any, display:any) => {
  const formElementsArray = [];
  for (let key in inputObject) {
    formElementsArray.push({
      id: key,
      config: inputObject[key],
    });
  }
  const fieldType = formElementsArray.map((formElement, id) => {
    let inputElement = null;
    switch (formElement.config.type) {
      case "checkbox":
        inputElement = (
          <IonCol size="12" size-md="6" key={id}>
            <IonItem lines="none">
              <IonToggle
                slot="end"
                disabled={display}
                onIonChange={(event: any) =>
                  onInputChangeHandler(event, formElement.id)
                }
                checked={formElement.config?.value}
              ></IonToggle>
              <IonLabel>{formElement.id}</IonLabel>
            </IonItem>
          </IonCol>
        );
        break;
      case "input":
        inputElement = (
          <IonCol size="12" size-md="6" key={id}>
            <IonItem>
              <IonLabel position="floating">{formElement.id}</IonLabel>
              <IonInput
                onIonChange={(event: any) =>
                  onInputChangeHandler(event, formElement.id)
                }
                value={formElement.config?.value}
              />
            </IonItem>
          </IonCol>
        );
        break;
      case "select":
        inputElement = getSubOptions(
          formElement.id,
          formElement.config.values,
          formElement.config.value,
          onInputChangeHandler,
          display
        );
        break;
    }
    return inputElement;
  });
  return fieldType;
};
