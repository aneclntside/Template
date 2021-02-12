import React, { FC } from "react";
import {
  IonItem,
  IonLabel,
  IonText,
  IonRadioGroup,
  IonRadio,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { Controller } from "react-hook-form";
import * as globalStructre from "./Content";
import _ from "lodash";
import './Components.css';

const Radio: FC<globalStructre.IngressProps> = ({
  ind,
  name,
  defaultValue,
  control,
  attributes,
  label,
  rules,
  errors,
  options,
  group
}) => {
  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    if (error === undefined) {
      error = _.get(errors, _fieldName, undefined);
    }
    let labelName = group + 'seg';
    let groupName = document.getElementById(labelName);
    if(error && group && groupName){
      groupName.classList.add(`Invalid-${_fieldName}`);
    }
    else if (!error && group && groupName){
      if(groupName.classList.contains(`Invalid-${_fieldName}`)){
        groupName.classList.remove(`Invalid-${_fieldName}`);
      }
    }
    return error ? (
      <IonText color="danger" className="ion-padding-start">
        <small>
          <span role="alert" id={`${group}Error${_fieldName}`}>
            {error.message || "Field Is Required"}
          </span>
        </small>
      </IonText>
    ) : null;
  };
  let requiredClass = ['ion-padding-top'];
  if ((_.result(attributes,'required')) || (_.result(rules,'required'))){
    requiredClass.push('required');
  }
  let radioOptions:any[] = options.default;
  return (
    <>
      <IonItem lines="none" key={ind}>
        <Controller
          render={({ onChange, onBlur, value }) => (
            <IonRadioGroup value={value} onIonChange={onChange} {...attributes}>
                <IonLabel className={requiredClass.join(' ')}>
                  {label}
                </IonLabel>
              <IonGrid>
                <IonRow>
                  {radioOptions?.map((value, i) => {
                    return (
                      <IonCol key={i}>
                        <IonItem lines="none">
                          <IonLabel>{value}</IonLabel>
                          <IonRadio slot="start" value={value} />
                        </IonItem>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </IonRadioGroup>
          )}
          name={name}
          defaultValue={defaultValue}
          control={control}
          rules={rules}
        />
      </IonItem>
      {showError(name)}
    </>
  );
};

export default Radio;
