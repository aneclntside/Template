import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonItem,
  IonLabel,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import * as globalStructre from "../../Components/Content";
import FormAccordion from "../FormAccordion/FormAccordion";
import { UtilBuildForm } from "../FormUtil";

interface FormHeaderProps {
  group: globalStructre.Group;
  control: any;
  errors: any;
}

const FormHeader: React.FC<FormHeaderProps> = (props) => {
  const { group, control, errors } = props;
  const buildHeader = (
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
          {UtilBuildForm(
            field,
            field.name + index,
            control,
            errors,
            group.groupName
          )}
        </IonCol>
      );
    });
  };

  return (
    <IonCard key={group.groupName}>
      <FormAccordion
        openPanel={group.groupExpand ? true : false}
        accIndex={group.groupName}
        renderHeader={() => {
          return (
            <span id={group.groupName} style={{ fontWeight: "bold" }}>
              {group.groupName}
            </span>
          );
        }}
        renderPanel={() => {
            return (
              <IonRow>
                {buildHeader(group.groupAttributes, control, errors)}
              </IonRow>
            );         
        }}
      />
    </IonCard>
  );
};

export default FormHeader;

/* }
         <IonItem lines="none">
          <IonLabel slot="end" className="ion-text-end" id={group.groupName}>{group.groupName}</IonLabel>
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            {buildHeader(group.groupAttributes, control, errors)}
          </IonRow>
        </IonCardContent>
      </IonCard>
 */

/**
 
        <IonCard key={group.groupName}>
        <IonCardHeader className="ion-no-padding">
{/*         <IonToolbar className="ion-no-padding">
          <IonItem lines="none" className="ion-float-right" id={group.groupName}>
            {group.groupName}
          </IonItem>
          </IonToolbar> */
