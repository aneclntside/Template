import React, { useRef, useState } from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Form.css";
import { useForm } from "react-hook-form";
import * as globalStructre from "../Components/Content";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FormArray from "./FormArray/FormArray";
import FormHeader from "./FormHeader/FormHeader";
import FormSegment from "./FormSegment/FormSegment";
import FormItem from "./FormItem/FormItem";
import "./DynamicForm.css";
import FormAttachments from "./FormAttachments/FormAttachments";
import { watchFile } from "fs";

interface FormProps {
  title: string;
  defaultValues: {};
  defaultValuesItem?: {}[];
  uniqueName: string;
  header: globalStructre.Group[];
  items?: globalStructre.Group[];
  itemList?: globalStructre.ItemList;
  watchList?:string[];
  operation: string;
  menu: boolean;
  validate?: boolean;
  callingComp?: string;
  onSubmit?: (formDetails: any) => void;
  onSetCallingState?: (data: boolean) => void;
}

const DynamicForm: React.FC<FormProps> = (props) => {
  const [itemData, setItemData] = useState() as any;
  const [updateFlag, setUpdateFlag] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    title,
    defaultValues,
    defaultValuesItem,
    uniqueName,
    header,
    items,
    itemList,
    watchList,
    operation,
    menu,
    validate,
    callingComp,
    onSubmit,
    onSetCallingState,
  } = props;

  const {
    control,
    handleSubmit,
    errors,
    reset,
    formState,
    register,
    setError,
    watch
  } = useForm({
    defaultValues: { ...defaultValues }
  });
  let trigger: any = null;
  let formObject: any = {};
  let itemError = false;
  const wacthFields:any = watch(watchList || ['test']);

  // user authorizaiton to edit, ioic core erros for segments, enable vertical scroll on items ?
  // inputmask, item level input
  // select from specific collection(select options and change values in another select and group), errors from backend
  // Accordion for items, slides (image carosoule)
  // when item edited enable the update or validate button
  // use device storage to save the form PWA
  // printable forms
// // use Context for transfering the attachment data
// items not showing the errors when dialog opens
// after update form should be in display mode should not enable buttons when change the form unless reload
  const onReset = () => {
    reset(defaultValues);
    if (!!!callingComp) {
      console.log("inside reset master");
      setUpdateFlag(true);
    }
  };

  const registerButtonSubmit = (data: any) => {
    if (!!!callingComp) {
      // called from regular/root form submit
      if (onSubmit && trigger && !itemError) {
        data.action = "submit";
        formObject.Header = data;
        if (!!itemData) {
          formObject.Item = itemData;
        }
        //  onSubmit(data);
        onSubmit(formObject);
        reset(data);
      } else if (onSubmit && !trigger && !itemError) {
        data.action = "validate";
        onSubmit(data);
      }
    } else {
      // called from item form submit
      if (onSubmit && trigger) {
        console.log("inside on submit item");
        data.action = "submit";
        onSubmit(data);
      } else if (onSubmit && !trigger) {
        console.log("inside on validate item");
        data.action = "validate";
        onSubmit(data);
      }
    }
  };

  const submitForm = (flag: boolean) => {
    console.log("inside submit form");
    //Check if requestSubmit() is available to current browser
    if (formRef!.current!.requestSubmit) {
      console.log("inside submit form - first if");
      trigger = flag;
      formRef!.current!.requestSubmit();
    }
    //If not, perform constraint validation and call submit function directly
    else {
      console.log("inside submit form else");
      if (formRef!.current!.reportValidity()) {
        console.log("inside submit form second if");
        trigger = flag;
        handleSubmit(registerButtonSubmit);
      }
    }
  };
  // when Item is selected and submitted
  const submitItem = (itemData: any) => {
    console.log("Submit Item");
    setItemData(itemData);
  };
  // when error in Item
  const errorHandler = (flag: any) => {
    itemError = flag;
    /*   const name:never = 'serverError' as never;
  setError(name, {
    type: "manual",
    message: "Errors in Item"
  }); */
  };

  const buildHeader = () => {
    let segmentArray:any = [];
    let headerFields:any = [];
    header.map((group: any) => {
       
        if(group?.groupWatch?.attName){
          if(wacthFields[group?.groupWatch?.attName] === group?.groupWatch?.attVal)
          return;
        }
        
         if(group.groupName === 'Attachments'){
          headerFields.push(
          <FormAttachments key={"form" + group.groupName} />
          );
         }
         else if (!group.groupMultiple && group.groupName) {
            console.log("inside group not multiple");
            segmentArray.push(group.groupName);
            headerFields.push (
              <FormHeader
                {...{ group, control, errors }}
                key={"formHeader" + group.groupName}
              />
            );
          } else if (group.groupMultiple && group.groupName) {
            console.log("inside group multiple");
            segmentArray.push(group.groupName);
            let arrayName = group.groupName;
            headerFields.push (
              <FormArray
                {...{
                  group,
                  control,
                  register,
                  defaultValues,
                  errors,
                  arrayName,
                }}
                key={"formArray" + group.groupName}
              />
            );
          }
        })
    if (!!items){
      segmentArray.push("Items");
    }    
    return [segmentArray,headerFields]
  };

  let [segmentArray,headerData] = buildHeader();
  console.log(errors);
  console.log("Dynamic Form component rendering....");
  console.log("formState errors");
  console.log(formState.errors);
  return (
    <IonPage>
      <Header
        title={title}
        operation={operation}
        menu={menu}
        onResetModal={(data) => {
          if (onSetCallingState) onSetCallingState(data);
        }}
      />
      <IonToolbar>
        <FormSegment
          segmentArray = {segmentArray}
/*           formFields={header}
          fieldArrayName={!!items}
          errors={errors} */
        />
      </IonToolbar>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="10" offset-md="1">
              <IonGrid>
                <div className="ion-padding">
                  <form
                    onSubmit={handleSubmit(registerButtonSubmit)}
                    ref={formRef}
                  >
                    <IonTitle className="ion-text-center">
                      {uniqueName}
                    </IonTitle>
                    {headerData}
                  </form>
                  {items && itemList && (
                    <FormItem
                      items={[...items]}
                      itemList={{ ...itemList }}
                      defaultValues={
                        defaultValuesItem ? [...defaultValuesItem] : [{}]
                      }
                      uniqueName={uniqueName}
                      operation="add"
                      updateFlag={updateFlag}
                      onSendItem={(itemData) => submitItem(itemData)}
                      onSendError={(flag) => errorHandler(flag)}
                    />
                  )}
                </div>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer
        edit={operation === "edit" ? true : false}
        onSubmitHandler={() => submitForm(true)}
        onValidateHandler={() => submitForm(false)}
        onResetHandler={onReset}
        dirty={Object.keys(formState.dirtyFields).length > 0}
        validate={validate ? validate : false}
      />
    </IonPage>
  );
};

export default DynamicForm;

/**
 * 
 * 
 
       <IonContent fullscreen>
        {console.log("rendering content...")}
        <div className="ion-padding">
          <form onSubmit={handleSubmit(registerButtonSubmit)} ref={formRef}>
            <IonGrid> 
              <IonTitle className="ion-text-center">
                {formFields.uniqueName}
              </IonTitle>
              <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="10" offset-md="1">
                  <IonGrid>
                    {formFields.Header.map((group: any) => {
                      if (!group.groupMultiple) {
                        console.log("inside group not multiple");
                        return(
                          <FormHeader {...{group, control, errors}} key={"formHeader" + group.groupName}/>
                        )
                      } else if (group.groupMultiple) {
                        console.log("inside group multiple");
                        let arrayName = group.groupName;
                        return (
                      <FormArray {...{group, control, register, defaultValues, errors, arrayName }} key={"formArray" + group.groupName}/>
                        );
                      }

                    })}
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </div>
        <div className="ion-padding">
        <FormItem  items={[...formFields.Item]}/>
        </div>
      </IonContent>



                                         <IonCard>
                      {header.map((group: any) => {
                        if (!group.groupMultiple) {
                          console.log("inside group not multiple");
                          return (
                            <FormHeader
                              {...{ group, control, errors }}
                              key={"formHeader" + group.groupName}
                            />
                          );
                        } else if (group.groupMultiple) {
                          console.log("inside group multiple");
                          let arrayName = group.groupName;
                          return (
                            <FormArray
                              {...{
                                group,
                                control,
                                register,
                                defaultValues,
                                errors,
                                arrayName,
                              }}
                              key={"formArray" + group.groupName}
                            />
                          );
                        }
                      })}
                    </IonCard> 

 */
