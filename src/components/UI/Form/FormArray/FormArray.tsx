import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { addOutline, trashOutline } from "ionicons/icons";
import { useFieldArray } from "react-hook-form";
import * as globalStructre from "../../Components/Content";
import { UtilBuildForm } from "../FormUtil";
import _ from "lodash";
import "./FormArray.css";
import FormAccordion from "../FormAccordion/FormAccordion";
import { setTokenSourceMapRange } from "typescript";

interface FormArrayProps {
  group: globalStructre.Group;
  control: any;
  errors: any;
  arrayName: string;
  defaultValues: any;
  register: any;
}

const FormArray: React.FC<FormArrayProps> = (props) => {
  const { group, control, defaultValues, errors, arrayName } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  });
  const clearMenuErrors = (ind:any) =>{
    let labelName = arrayName + 'seg';
    let segName = document.getElementById(labelName);
    let myClasses:any = segName?.classList;
    const segClassList = [...myClasses];
    segClassList.forEach(item=>{
      if(item.startsWith(`Invalid-${arrayName}[${ind}]`)) {
        myClasses.remove(item) ;
      }
  })
  };
  return (
    <IonCard key={group.groupName}>
      <FormAccordion
        openPanel={group.groupExpand ? true : false}
        accIndex={group.groupName}
        expand={true}
        renderHeader={() => {
          return (
            <IonItem className='item-content' lines='none'>
            <IonButton
              className='ion-float-start ion-no-padding'
              size='small'
              slot='start'
              fill="clear"
              onClick={(e) => {
                e.stopPropagation();
                let panel:any = document.getElementById(group.groupName+'Button')?.nextElementSibling;
                panel.style.maxHeight = (panel.scrollHeight)+ 95 + "px";
                append({});
              }}
            >
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <span slot='end' id={group.groupName} style={{ fontWeight: "bold"}}>{group.groupName}</span>
            </IonItem>
          );
        }}
        renderPanel={() => {
          return (
              <IonCardContent className="horizontalScroll">
                <IonGrid>
                  {fields.map((item: any, index: any) => {
                    let groupFields = [...group.groupAttributes];
                    return (
                      <IonRow className="ion-nowrap" key={item.id}>
                        {groupFields.map((field) => {
                          let fieldTemp = { ...field };
                          let nameValue = fieldTemp.name;
                          let defaultValue = _.get(item, nameValue, "");
                          let name = `${arrayName}[${index}].${fieldTemp.name}`;
                          fieldTemp.name = name;
                          return (
                            <IonCol size="12" size-md="4" key={field.name}>
                              {UtilBuildForm(
                                fieldTemp,
                                fieldTemp.name + index,
                                control,
                                errors,
                                group.groupName,
                                defaultValue
                              )}
                            </IonCol>
                          );
                        })}
                        <IonCol size="12" size-md="4">
                          <IonButton
                            fill="clear"
                            color="danger"
                            className="deleteButton"
                            onClick={() => {remove(index)
                              clearMenuErrors(index);
                            }}
                          >
                            <IonIcon slot="icon-only" icon={trashOutline} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    );
                  })}
                </IonGrid>
              </IonCardContent>
          );
        }}
      />
    </IonCard>
  );
};

export default FormArray;

//*****

      /*       <IonCardHeader className="ion-no-padding">
        <IonItem lines="none">
        <IonButton
              fill="clear"
              onClick={() => {
                append({});
              }} >
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonLabel slot="end" className="ion-text-end" id={group.groupName}>{group.groupName}</IonLabel>
        </IonItem>
      </IonCardHeader>
      <IonCardContent className="horizontalScroll">
        <IonGrid>
          {fields.map((item: any, index: any) => {
            let groupFields = [...group.groupAttributes]
            return (
              <IonRow className="ion-nowrap" key={item.id}>
                {groupFields.map((field) => {
                  let fieldTemp = {...field};
                  let nameValue = fieldTemp.name;
                  let defaultValue = _.get(item,nameValue,'')
                  let name = `${arrayName}[${index}].${fieldTemp.name}`;
                  fieldTemp.name = name;
                  return (
                    <IonCol size="12" size-md="4" key={field.name}>
                      {UtilBuildForm(
                        fieldTemp,
                        fieldTemp.name + index,
                        control,
                        errors,
                        group.groupName,
                        defaultValue
                      )}
                    </IonCol>
                  );
                })}
                <IonCol size="12" size-md="4">
                  <IonButton
                    fill="clear"
                    color="danger"
                    className="deleteButton"
                    onClick={() => remove(index)} >
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            )
          })}
        </IonGrid>
      </IonCardContent> */


//***** */







/*         case "Textarea":
          inputElement = (
            <Textarea
              key={ind}
              name={field.name}
              control={control}
              attributes={field.attributes}
              label={field.label}
              rules={field.rules}
              errors={errors}
            />
          );
          break;
        case "Toggle":
          inputElement = (
            <Toggle
              key={ind}
              name={field.name}
              control={control}
              attributes={field.attributes}
              label={field.label}
              rules={field.rules}
              errors={errors}
            />
          );
          break; */
/*         case "Select":
          inputElement = (
            <Select
              key={ind}
              name={field.name}
              control={control}
              attributes={field.attributes}
              label={field.label}
              rules={field.rules}
              errors={errors}
              options={field.options}
            />
          );
          break;
        case "Radio":
          inputElement = (
            <Radio
              key={ind}
              name={field.name}
              control={control}
              attributes={field.attributes}
              label={field.label}
              rules={field.rules}
              errors={errors}
              options={field.options}
            />
          );
          break;
        case "Range":
          inputElement = (
            <Range
              key={ind}
              name={field.name}
              control={control}
              attributes={field.attributes}
              label={field.label}
              rules={field.rules}
              errors={errors}
              rangeMin={field.rangeMin}
              rangeMax={field.rangeMax}
            />
          );
          break;
        case "Checkbox":
          inputElement = (
            <Checkbox
              key={ind}
              name={field.name}
              control={control}
              attributes={field.attributes}
              label={field.label}
              rules={field.rules}
              errors={errors}
            />
          );
          break; */

/**
           *
           * 
          
  const buildFieldElements = (
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
    dynFields.map((fieldTemp: any, ind: any) => {
      field = { ...fieldTemp };
      name = field.name;
      console.log(name);
      field.name = `${groupName}[${index}].${name}`;
      field.defaultValue = `${item.name}`;
      let formElement = (
        <IonCol size="12" size-md="4">
          {UtilBuildForm(field, field.name + ind, control, errors)}
        </IonCol>
      );
      formElements.push(formElement);
    });
    formElements.push(
      <IonCol size="12" size-md="4">
        {index}
        <IonButton
          fill="clear"
          color="danger"
          className="deleteButton"
          onClick={() => remove(index)}
        >
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonButton>
      </IonCol>
    );
    return formElements;
  };

           */
