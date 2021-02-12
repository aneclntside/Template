import React, { FC } from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import * as globalStructre from "./Content";
import _ from "lodash";
import './Components.css';

const Input: FC<globalStructre.IngressProps> = ({
  ind,
  name,
  defaultValue,
  control,
  attributes,
  label,
  rules,
  errors,
  group,
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
  let requiredClass = '';
  if ((_.result(attributes,'required')) || (_.result(rules,'required'))){
    requiredClass = 'required'
  }
  console.log("Rendering Input....");
  return (
    <>
      <IonItem lines="none" key={ind}>
        {label && <IonLabel position="floating" className={requiredClass}>{label}</IonLabel>}
        <Controller
          render={({ onChange, onBlur, value }) => {
            return (
              <IonInput 
              value={value} 
              onIonChange={onChange} {...attributes} />
            );
          }}
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

export default Input;

/**
 * 
 * 
 * 
 * 
 * import React, { FC } from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import * as globalStructre from "./Content";

const Input: FC<globalStructre.IngressProps> = ({
  ind,
  name,
  control,
  attributes,
  label,
  rules,
  errors,
  onInput,
}) => {

  const changeHandler = (value:any) => {

        console.log("inside onchange");

    };

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <IonText color="danger" className="ion-padding-start">
        <small>
          <span role="alert" id={`${_fieldName}Error`}>
            {error.message || "Field Is Required"}
          </span>
        </small>
      </IonText>
    ) : null;
  };
  return (
    <>
      <IonItem key={ind}>
        {label && <IonLabel position="floating">{label}</IonLabel>}
        <Controller
          render={({ onChange, onBlur, value }) => {
            return (
              <IonInput value={value} onIonChange={ (value:any) => {
                onChange(value);
                changeHandler(value);
              } }
              {...attributes} />
            );
          }}
          name={name}
          control={control}
          rules={rules}
        />
      </IonItem>
      {showError(name)}
    </>
  );
};

export default Input;
 */
