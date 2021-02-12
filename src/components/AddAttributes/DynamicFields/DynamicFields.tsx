import React, { useState, useEffect, useCallback } from "react";
import * as dynamicFields from "../DynamicContent";
import {
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonInput,
  IonCard,
  IonRow,
} from "@ionic/react";

const DyanmicFields: React.FC<{
                                selectedOption: any
                                onChangeHandler: (event:any, inputIdentifier:any) => void
                              }> = (props) => {
  const { selectedOption, onChangeHandler } = props;
  const [buildForm, setBuildForm] = useState<any>(null);

  console.log("Rendering - Dyanmic Fields");

  const getSubOptions = (name: string, options: dynamicFields.OPTIONS[], valueRef:any) => {
    const inputElement = (
      <IonCol size="12" size-md="6" key={name}>
        <IonItem>
          <IonLabel position="floating">{name}</IonLabel>
          <IonSelect onIonChange={(event) => onChangeHandler(event, name)} interface="popover" value={valueRef}>
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

  const getInput = useCallback(
    (inputObject: any) => {
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
                  <IonToggle slot="end" onIonChange={(event) => onChangeHandler(event, formElement.id)} checked={formElement.config?.value}></IonToggle>
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
                  <IonInput onIonChange={(event) => onChangeHandler(event, formElement.id)} value={formElement.config?.value}/>
                </IonItem>
              </IonCol>
            );
            break;
          case "select":
            inputElement = getSubOptions(
              formElement.id,
              formElement.config.values,
              formElement.config.value
            );
            break;
        }
        return inputElement;
      });
      setBuildForm(fieldType);
    },
    [setBuildForm]
  );

  useEffect(() => {
    console.log("inside Dynamic Fields use Effect")
    getInput(selectedOption);
  }, [selectedOption, getInput]);

  return (
    <IonCard>
      <IonRow>{buildForm}</IonRow>
    </IonCard>
  );
};

export default React.memo(DyanmicFields);
