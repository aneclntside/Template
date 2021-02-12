import React from "react";
import * as globalStructre from "../Components/Content";
import Input from "../Components/Input";
import Date from "../Components/Date";
import Select from "../Components/Select";
import Textarea from "../Components/Textarea";
import Toggle from "../Components/Toggle";
import Radio from "../Components/Radio";
import Range from "../Components/Range";
import Checkbox from "../Components/Checkbox";
import "./FormUtil.css";
import {updateObject} from '../../../shared/utility';
import _ from 'lodash';
import { exit } from "ionicons/icons";
import { array } from "yup";

// Build Form
export const UtilBuildForm = (
  field: globalStructre.IngressProps,
  ind: any,
  control: any,
  errors: any,
  group?:any,
  defaultValue?:any
) => {
  let inputElement = null;
  switch (field.type) {
    case "Input":
      inputElement = (
        <Input
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Textarea":
      inputElement = (
        <Textarea
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Toggle":
      inputElement = (
        <Toggle
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Date":
      inputElement = (
        <Date
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Select":
      inputElement = (
        <Select
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          options={field.options}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Radio":
      inputElement = (
        <Radio
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          options={field.options}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Range":
      inputElement = (
        <Range
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          rangeMin={field.rangeMin}
          rangeMax={field.rangeMax}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
    case "Checkbox":
      inputElement = (
        <Checkbox
          key={ind}
          name={field.name}
          control={control}
          attributes={{...field.attributes}}
          label={field.label}
          defaultValue={defaultValue}
          rules={{...field.rules}}
          errors={errors}
          group={group}
          watchAttributeName={field.watchAttributeName}
        />
      );
      break;
  }

  return inputElement;
};


// validate form Items

const checkValidity = (value:any, rules:any) => {
  let isValid = true;
  if(!rules){
      return true;
  }

  if(rules.required){
      isValid = value.trim() !== '' && isValid;
  }

  if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
  }

  if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
}


export const UtilValidateForm = (
  itemFormFields: globalStructre.Group[], // all fields
  fieldValues:{} // one row entry at a time
) => {
  let isValid = true;
  itemFormFields.map((group:any)=>{
    let fields:globalStructre.IngressProps[] = [];
    let validations = {};
    let valCount = 0;
    if(group.groupMultiple && isValid){
      //multiple entries on this group
      fields = [...group.groupAttributes];
      for(let field of fields){
        validations = updateObject(field.attributes, field.rules);
        valCount = Object.keys(validations).length;
        if(valCount > 0){
          // check each entry in the array
          let arrayFields = _.get(fieldValues,group.groupName,'');

            for(let arrayField of arrayFields){
              // fields array loop
              isValid = checkValidity(_.get(arrayField,field.name, ''),validations);
              if(!isValid){ break; }
            }

        }
        if(!isValid){ break; }
      }
    }
    else if (!group.groupMultiple && isValid){
      // single entry on this group
      fields = [...group.groupAttributes];
      for(let field of fields){
        validations = updateObject(field.attributes, field.rules);
        valCount = Object.keys(validations).length;
        if(valCount > 0){
          isValid = checkValidity(_.get(fieldValues,field.name, ''),validations)
        }
        if(!isValid){
          break;
        }
      }
    }

  });

  return isValid;
};


export function addServerErrors<T>(
  errors: { [P in keyof T]?: string[] },
  setError: (
    fieldName: keyof T,
    error: { type: string; message: string }
  ) => void
) {
  return Object.keys(errors).forEach((key) => {
    setError(key as keyof T, {
      type: "server",
      message: errors[key as keyof T]!.join(
        ". "
      ),
    });
  });
}

/*   


========
       _.forEach(fields, function(field:globalStructre.IngressProps){
        validations = updateObject(field.attributes, field.rules);
        valCount = Object.keys(validations).length;
        if(valCount > 0){
          isValid = checkValidity(_.get(fieldValues,field.name, ''),validations)
        }
        if(!isValid){
          break;
        }
      }); 

===========


//Build Header
export const UtilBuildHeader = (
  attributes: globalStructre.IngressProps[],
  control: any,
  errors: any
) => {
  let dynFields = [...attributes];
  let field = null;
  return dynFields.map((fieldTemp: any, index: any) => {
    field = { ...fieldTemp };
    return (
      <IonCol size="12" size-md="4" key={field.name + index}>
        {UtilBuildForm(field, field.name + index, control, errors)}
      </IonCol>
    );
  });
};

const UtilBuildFieldElements = (
  groupName: string,
  buildFields: any,
  item: any,
  index: any,
  control: any,
  errors: any,
  remove: any
) => {
  let formElements = [];
  let dynFields = [...buildFields];
  let field = null;
  let name = null;
  dynFields.map((fieldTemp: any, ind:any) => {
    field = { ...fieldTemp };
    name = field.name;
    console.log(name);
    field.name = `${groupName}[${index}].${name}`;
    field.defaultValue = `${item.name}`;
    let formElement = (
      <IonCol size="12" size-md="4" >
        {UtilBuildForm(field, field.name + ind, control, errors)}
      </IonCol>
    );
    formElements.push(formElement);
  });
  formElements.push(
    <IonCol size="12" size-md="4" >
      {index}
        <IonButton fill="clear" color="danger" className="deleteButton" onClick={() => remove(index)}>
        <IonIcon slot="icon-only"  icon={trashOutline} />
        </IonButton>
    </IonCol>
  );
  return formElements;
};

export const UtilBuildGroup = (
  group: any,
  control: any,
  errors: any,
  defaultValues:any,
  register:any
) => {
  if (!group.groupMultiple) {
    console.log("inside group not multiple");
    return (
      <IonCard key={group.groupName}>
        <IonCardHeader className="ion-no-padding">
          <IonItem lines="none" className="ion-float-right" id={group.groupName}>
            {group.groupName}
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            {UtilBuildHeader(group.groupAttributes, control, errors)}
          </IonRow>
        </IonCardContent>
      </IonCard>
    );
  } else if (group.groupMultiple) {
    console.log("inside group multiple");
    let key = "formArray" + group.groupName;
    let arrayName = group.groupName;
    return (
  <FormArray {...{group, control, register, defaultValues, errors, arrayName }} key={"formArray" + group.groupName}/>
    );
  }
};





===========



const scrollSegment = (e: any) => {
  let myElement = document.getElementById(e.detail.value);
  myElement?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
};

export const UtilBuildSegments = (fields:any, fieldArrayName:string) => {
  let segmentArray = fields[fieldArrayName];
  let segmentElement = null;
  let segmentElements:any = [];
  let defaultValue = null;
  segmentArray.map((field:any, index:any) => {
    
    if(field.groupName){
    segmentElement = (
    <IonSegmentButton value={field.groupName} 
    key={field.groupName}>
    <IonLabel className="ion-text-capitalize">{field.groupName}</IonLabel>
  </IonSegmentButton> );
    segmentElements.push(segmentElement);
    }
  });

  return (
    <IonRow className="ion-justify-content-center">
      <IonSegment
        color="primary"
        scrollable
        value={defaultValue}
        className="ion-text-center"
        onIonChange={(e) => scrollSegment(e)}
      >
        {segmentElements}
      </IonSegment>
    </IonRow>
        );









=========



return (
    <IonRow className="ion-justify-content-center">
      <IonSegment
        color="danger"
        scrollable
        value="map"
        className="ion-text-center"
        onIonChange={(e) => scrollSegment(e)}
      >
        <IonSegmentButton value="Purchasing" layout="icon-end">
          <IonIcon icon={call} />
          <IonLabel>Purchasing</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="Pricing" layout="icon-end">
          <IonIcon icon={heart} />
          <IonLabel>Pricing</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="map" layout="icon-end">
          <IonIcon icon={pin} />
          <IonLabel>Map</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="call" layout="icon-end">
          <IonIcon icon={call} />
          <IonLabel>Call</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="favorite" layout="icon-end">
          <IonIcon icon={heart} />
          <IonLabel>Favorite</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="map" layout="icon-end">
          <IonIcon icon={pin} />
          <IonLabel>Map</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="call" layout="icon-end">
          <IonIcon icon={call} />
          <IonLabel>Call</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="favorite" layout="icon-end">
          <IonIcon icon={heart} />
          <IonLabel>Favorite</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="map" layout="icon-end">
          <IonIcon icon={pin} />
          <IonLabel>Map</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonRow>
  ); */

