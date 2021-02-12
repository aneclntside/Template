import React from "react";
import {IonModal } from "@ionic/react";
import DynamicForm from "../Form/DynamicForm";
import * as globalStructre from "../Components/Content";

interface ModalProps {
  title: string;
  open: boolean;
  operation:string;
  uniqueName:string;
  defaultFieldValues: {};
  defaultFieldValuesItem?:{}[];  
  header: globalStructre.Group[];
  items?:globalStructre.Group[];
  itemList?:globalStructre.ItemList;
  validate?:boolean;
  callingComp?:string;
  onSetCallingState: (close: boolean) => void;
  onSubmit: (formDetails: any) => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    open,
    operation,
    uniqueName,
    defaultFieldValues,
    defaultFieldValuesItem,
    header,
    items,
    itemList,
    validate,
    callingComp,
    onSetCallingState,
    onSubmit,
  } = props;
  return (
    <IonModal
      id="addModal"
      isOpen={open}
      animated={true}
      onDidDismiss={() => onSetCallingState(false)}
    >
      <DynamicForm
        title={title}
        uniqueName={uniqueName}
        defaultValues={defaultFieldValues}
        defaultValuesItem={defaultFieldValuesItem}
        header = {header}
        items={items}
        itemList={itemList}
        operation={operation}
        menu={false}
        validate={validate}
        callingComp={callingComp}
        onSubmit={(data: any) => onSubmit(data)}
        onSetCallingState={() => onSetCallingState(false)}
      />
    </IonModal>
  );
};

export default Modal;
