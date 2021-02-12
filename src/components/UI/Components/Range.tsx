import React, { FC } from "react";
import { IonItem, IonLabel, IonText, IonRange } from "@ionic/react";
import { Controller } from "react-hook-form";
import * as globalStructre from "./Content";
import _ from "lodash";
import './Components.css';

const Range: FC<globalStructre.IngressProps> = ({
  ind,
  name,
  defaultValue,
  control,
  label,
  attributes,
  rules,
  errors,
  rangeMin,
  rangeMax,
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
            <IonRange
              onIonChange={onChange}
              {...attributes}
              min={rangeMin}
              max={rangeMax}
              pin
              // aria-invalid={errors ? "true" : "false"}
              // aria-describedby={`${name}Error`}
            >
              <IonLabel slot="start">{rangeMin}</IonLabel>
              <IonLabel slot="end">{rangeMax}</IonLabel>
            </IonRange>
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

export default Range;
