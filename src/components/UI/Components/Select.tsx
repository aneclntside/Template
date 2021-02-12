import React, { FC } from "react";
import {
  IonItem,
  IonLabel,
  IonText,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Controller, useWatch } from "react-hook-form";
import * as globalStructre from "./Content";
import _ from "lodash";
import './Components.css';

let eventField:any;

const Select: FC<globalStructre.IngressProps> = ({
  ind,
  name,
  defaultValue,
  control,
  attributes,
  label,
  rules,
  errors,
  options,
  group,
  watchAttributeName
}) => {
  console.log("SELECT NAME "+ name);
  const watchValue:any = useWatch({
    control,
    name: watchAttributeName || 'DonotWatch', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  //  defaultValue: "default" // default value before the render
  });

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

/*   const hideSegments = (selectValue:string) =>{
    let segName = document.getElementById("Testing2Button");
    if(selectValue === 'SA'){
          segName?.classList.add('groupHidden');
    }
    else{
      if(segName?.classList.contains(`groupHidden`)){
        segName?.classList.remove('groupHidden');
      }
    }
  } */
  
  let requiredClass = '';
  if ((_.result(attributes,'required')) || (_.result(rules,'required'))){
    requiredClass = 'required'
  }
  let selectOptions:any[];
  let valueUpdate:string;
  if(watchAttributeName){
    selectOptions = options[watchValue];
    if(eventField === watchAttributeName){
      if(selectOptions)
      valueUpdate = selectOptions[0];
    }
  }else{
    selectOptions = options?.default;
  }

  return (
    <>
      <IonItem lines="none" key={ind}>
        {label && <IonLabel position="floating" className={requiredClass}>{label}</IonLabel>}
        <Controller
          render={({ onChange, onBlur, value }) => (
            <IonSelect
              value={valueUpdate ? valueUpdate : value}
              onIonChange= {(e) => {
                eventField = name;
               // hideSegments(e?.detail.value);
                onChange(e?.detail.value);
              }}
              //{onChange}
              {...attributes}
              // aria-invalid={errors ? "true" : "false"}
              // aria-describedby={`${name}Error`}
            >
              {selectOptions?.map((value, i) => {
                return (
                  <IonSelectOption key={i} value={value}>
                    {value}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
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

export default Select;
