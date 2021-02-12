import React, { FC } from "react";
import { IonItem, IonLabel, IonText, IonDatetime } from "@ionic/react";
import { Controller } from "react-hook-form";
import * as globalStructre from "./Content";
import _ from 'lodash';
import './Components.css';

const Date: FC<globalStructre.IngressProps> = ({
  ind,
  name,
  defaultValue,
  control,
  attributes,
  label,
  rules,
  errors,
  group
}) => {

  const showError = (_fieldName: string) => {
    let error:any = (errors as any)[_fieldName]; 
    if((error === undefined)) {
      error = _.get(errors,_fieldName, undefined );
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
  return (
    <>
      <IonItem lines="none" key={ind}> 
        {label && <IonLabel position="floating" className={requiredClass}>{label}</IonLabel>}
        <Controller
          render={({ onChange, onBlur, value }) => (
            <IonDatetime
              value={value}
              onIonChange={onChange}
              {...attributes}
              // aria-invalid={errors ? "true" : "false"}
              // aria-describedby={`${name}Error`}
            />
          )}
          name={name}
          control={control}
          defaultValue={defaultValue} 
          rules={rules}
        />
      </IonItem>
      {showError(name)}
    </>
  );
};

export default Date;
