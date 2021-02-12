import React, { useRef } from "react";

import * as globalStructre from "../Components/Content";

import { ErrorMessage } from "@hookform/error-message";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface FormProps {
  title: string;
  defaultFieldValues?: {};
  formFields: globalStructre.FormProps;
  edit?: boolean;
  operation: string;
  menu: boolean;
  validate?: boolean;
  onSubmit?: (formDetails: any) => void;
  onSetCallingState?: (data: boolean) => void;
}
const DynTest: React.FC<FormProps> = (props) => {

  const formRef = useRef<HTMLFormElement>(null);    
  const { control, handleSubmit, errors, reset, formState } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const { fields, append, remove  } = useFieldArray({
    control,
    name: "data"
  });

  const onReset = () => {
    reset({});
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const submitForm = (flag: boolean) => {
    console.log("inside submit form");
    //Check if requestSubmit() is available to current browser
    if (formRef!.current!.requestSubmit) {
      formRef!.current!.requestSubmit();
    }
    //If not, perform constraint validation and call submit function directly
    else {
      console.log("inside submit form else");
      if (formRef!.current!.reportValidity()) {
        handleSubmit(onSubmit);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>React Hook Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Details</p>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <IonItem>
            <IonLabel>Gender</IonLabel>
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonSelect placeholder="Select One" onIonChange={onChange}>
                  <IonSelectOption value="FEMALE">Female</IonSelectOption>
                  <IonSelectOption value="MALE">Male</IonSelectOption>
                </IonSelect>
              )}
              control={control}
              name="gender"
              rules={{ required: "This is a required field" }}
            />
          </IonItem>
{/*           <ErrorMessage
            errors={errors}
            name="gender"
            as={<div style={{ color: "red" }} />}
          /> */}
          

          <IonItem>
            <IonLabel>Email</IonLabel>
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonInput onIonChange={onChange} />
              )}
              control={control}
              name="email"
              rules={{
                required: "This is a required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              }}
            />
          </IonItem>
{/*           <ErrorMessage
            errors={errors}
            name="email"
            as={<div style={{ color: "red" }} />}
          /> */}
          <IonItem>
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonRange
                  min={-200}
                  max={200}
                  color="secondary"
                  onIonChange={onChange}
                >
                  <IonLabel slot="start">-200</IonLabel>
                  <IonLabel slot="end">200</IonLabel>
                </IonRange>
              )}
              control={control}
              name="rangeInfo"
              rules={{ required: "Please Select A Value" }}
            />
          </IonItem>
{/*           <ErrorMessage
            errors={errors}
            name="rangeInfo"
            as={<div style={{ color: "red" }} />}
          /> */}
        </form>
      </IonContent>
      <div>
        <IonButton onClick={onSubmit}>submit</IonButton>
      </div>
      <div>
        <IonButton onClick={onReset}>Reset</IonButton>
      </div>
    </IonPage>
  );
};

export default DynTest;

/**
 
import React from 'react';

import * as globalStructre from "../Components/Content";

import { ErrorMessage } from "@hookform/error-message";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRange, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';

interface FormProps {
    title: string;
    defaultFieldValues?: {};
    formFields: globalStructre.FormProps;
    edit?: boolean;
    operation: string;
    menu: boolean;
    validate?: boolean;
    onSubmit?: (formDetails: any) => void;
    onSetCallingState?: (data: boolean) => void;
  }
const DynTest:React.FC<FormProps> = (props) => {

    const { control, handleSubmit, errors, reset, formState } = useForm({
        defaultValues: {},
        mode: "onChange",
      });

      const onReset = () => {
        reset({});
      };  

      const onSubmit = (data:any) => {
          console.log(data);
      };

return(

    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>React Hook Form</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <p>Details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel>Gender</IonLabel>
          <Controller
            render={({ onChange, onBlur, value }) => (
              <IonSelect placeholder="Select One" onIonChange={onChange}>
                <IonSelectOption value="FEMALE">Female</IonSelectOption>
                <IonSelectOption value="MALE">Male</IonSelectOption>
              </IonSelect>
            )}
            control={control}
            name="gender"
            rules={{ required: "This is a required field" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="gender"
          as={<div style={{ color: "red" }} />}
        />

        <IonItem>
          <IonLabel>Email</IonLabel>
          <Controller
            render={({ onChange, onBlur, value }) => (
              <IonInput onIonChange={onChange} />
            )}
            control={control}
            name="email"
            rules={{
              required: "This is a required field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              }
            }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="email"
          as={<div style={{ color: "red" }} />}
        />
        <IonItem>
          <Controller
            render={({ onChange, onBlur, value }) => (
              <IonRange
                min={-200}
                max={200}
                color="secondary"
                onIonChange={onChange}
              >
                <IonLabel slot="start">-200</IonLabel>
                <IonLabel slot="end">200</IonLabel>
              </IonRange>
            )}
            control={control}
            name="rangeInfo"
            rules={{ required: "Please Select A Value" }}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="rangeInfo"
          as={<div style={{ color: "red" }} />}
        />
        <div>
          <IonButton type="submit">submit</IonButton>
        </div>
        <div>
          <IonButton onClick={onReset}>Reset</IonButton>
        </div>
      </form>
    </IonContent>
  </IonPage>
);


};

export default DynTest;
 */
