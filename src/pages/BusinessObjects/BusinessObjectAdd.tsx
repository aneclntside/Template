import React from 'react';
import AddBO from '../../components/AddBO/AddBO';
import { IonPage } from '@ionic/react';


const BusinessObjectAdd: React.FC = (props) => { 
  return (
    <AddBO />
  );
};

export default BusinessObjectAdd;

/*
 import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonMenuButton,
  IonButton,
  IonFooter,
  IonToast,
  IonCardHeader,
  IonIcon,
  IonCardContent,
  IonList,
  IonText
} from "@ionic/react";
import "./BusinessObjectAdd.css";
import * as dynamicContent from "../../components/AddAttributes/DynamicContent";
import { updateObject } from "../../shared/utility";
import "./BusinessObjectAdd.css";
import { addOutline, trash } from "ionicons/icons";

const BusinessObjectAdd: React.FC<dynamicContent.BOAddProps> = (props) => {
  const [bo, setBO] = useState<dynamicContent.BO_STRUCTURES>({
    ...dynamicContent.BO_STRUCTURE,
  });
  const [check, setCheck] = useState("");
  const [display, setDispaly] = useState(true);
  const {
    businessObjects,
    addBO,
    submitted,
    error,
    onAddBO,
    onEditBO,
    history,
  } = props;
  const FormRef: React.Ref<HTMLFormElement> = null;
  const editFlag = history?.location?.state?.editBusinessObject;
  const headerGroupRef = useRef<HTMLIonInputElement>(null);
  const itemGroupRef = useRef<HTMLIonInputElement>(null);
  const boRef = useRef<HTMLIonInputElement>(null);

  console.log("Add BO - Rendering");

  const _checkInput = (enteredText: string, indicator: string) => {
    if (!enteredText || enteredText.toString().trim().length === 0) {
      setCheck("Please enter a valid Text");
      return true;
    }
    let boValue;
    switch (indicator) {
      case "header":
        boValue = bo.headerGroups.find((group) => group === enteredText);
        if (boValue) {
          setCheck("Header Group Already Exists");
          return true;
        }
        break;
      case "item":
        boValue = bo.itemGroups.find((group) => group === enteredText);
        if (boValue) {
          setCheck("Item Group Already Exists");
          return true;
        }
        break;
    }
    setCheck("");
  };

  const onEditHandler = () => {
    if(!display) _setBO();  
    setDispaly(!display);
  };

  const onSaveHanler = (event: any) => {
    event.preventDefault();
    if (editFlag) {
      console.log("edit");
      onEditBO(bo);
      setDispaly(!display);
    } else {
      console.log("create");
      bo.boName = boRef.current!.value ? boRef.current!.value?.toString() : "";
      if (_checkInput(bo.boName, "")) {
        return;
      }
      onAddBO(bo);
      props.updateBOScreen(true);
    }
  };

  const _setBO = () => {
      console.log("INside setBO");
    const boList: any = businessObjects ? businessObjects : [];
    const boValue = boList.find(
      (bo: any) => bo.id === history?.location?.state?.data
    );
    if (boValue) {
      setBO(boValue);
    }
  };

  const onAddHeaderGroupsHandler = () => {
    const enteredText = headerGroupRef.current!.value;
    if (_checkInput(enteredText!.toString(), "header")) {
      return;
    } else {
      setBO((prev) => {
        let updatedBo = { ...prev };
        updatedBo.boName = boRef.current!.value;
        let newGroup = [...prev.headerGroups];
        newGroup.push(enteredText!.toString());
        updatedBo.headerGroups = newGroup;
        console.log(updatedBo);
        return updateObject(prev, updatedBo);
      });
      headerGroupRef.current!.value = "";
    }
  };

  const onAddItemGroupsHandler = () => {
    const enteredText = itemGroupRef.current!.value;
    if (_checkInput(enteredText!.toString(), "item")) {
      return;
    } else {
      setBO((prev) => {
        let updatedBo = { ...prev };
        updatedBo.boName = boRef.current!.value;
        let newGroup = [...prev.itemGroups];
        newGroup.push(enteredText!.toString());
        updatedBo.itemGroups = newGroup;
        console.log(updatedBo);
        return updateObject(prev, updatedBo);
      });
      itemGroupRef.current!.value = "";
    }
  };

  const onDeleteHandler = (groupName: string) => {
    setBO((prev) => {
      let updatedBo = { ...prev };
      let newGroup = [...prev.headerGroups];
      const newIUpdateGroup = newGroup.filter((group) => group !== groupName);
      updatedBo.headerGroups = newIUpdateGroup;
      return updateObject(prev, updatedBo);
    });
  };

  const onDeleteItemHandler = (groupName: string) => {
    setBO((prev) => {
      let updatedBo = { ...prev };
      let newGroup = [...prev.itemGroups];
      const newIUpdateGroup = newGroup.filter((group) => group !== groupName);
      updatedBo.itemGroups = newIUpdateGroup;
      return updateObject(prev, updatedBo);
    });
  };

  useEffect(() => {
    console.log("Component Load - Inside AddBO");
    if (editFlag) {
      _setBO();
    }
  }, []);

  useEffect(() => {
    console.log("Component Update - Inside AddBO");
  });

  let linkDirectAccess = null;

  return (
    <React.Fragment>
        {linkDirectAccess}
      <IonToast isOpen={!!submitted} message={submitted} duration={2000} />
      <form ref={FormRef} onSubmit={onSaveHanler}>
        <fieldset disabled={display && !addBO}>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
                <IonTitle>{!addBO ? "Edit" : "Add"} Business Object</IonTitle>
                <IonButtons slot="end">
                  {addBO ? (
                    <IonButton
                      fill="clear"
                      color="warning"
                      onClick={() => props.updateBOScreen(false)}
                    >
                      Close
                    </IonButton>
                  ) : (
                    <IonBackButton />
                  )}
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow>
                  <IonCol size-sm="8" offset-sm="2" size-md="10" offset-md="1">
                    <IonGrid>
                      <IonCard>
                        <IonRow>
                          <IonCol>
                            <IonItem>
                              <IonLabel
                                position="floating"
                                className="required"
                              >
                                Business Object Name
                              </IonLabel>
                              <IonInput
                                key="boName"
                                ref={boRef}
                                type="text"
                                disabled={!addBO}
                                required
                                placeholder="Enter BO Name"
                                value={bo?.boName}
                              />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        {check && (
                          <IonRow className="ion-text-center">
                            <IonCol>
                              <IonText color="danger">
                                <p>{check}</p>
                              </IonText>
                            </IonCol>
                          </IonRow>
                        )}
                      </IonCard>
                      <IonCard>
                        <IonCardHeader>
                          <IonToolbar>
                            <IonTitle>Header Groups</IonTitle>
                            <IonButtons slot="end">
                              <IonButton
                                onClick={onAddHeaderGroupsHandler}
                                disabled={!addBO && display}
                              >
                                <IonIcon slot="icon-only" icon={addOutline} />
                              </IonButton>
                            </IonButtons>
                          </IonToolbar>
                          <IonRow>
                            <IonInput
                              key="groupName"
                              ref={headerGroupRef}
                              type="text"
                              placeholder="Enter Group Name"
                            />
                          </IonRow>
                        </IonCardHeader>
                        <IonCardContent>
                          {bo.headerGroups.length === 0 && (
                            <h2 className="ion-text-center">
                              No Groups Found!
                            </h2>
                          )}
                          {bo.headerGroups.length > 0 && (
                            <IonList inset={true}>
                              {bo.headerGroups.map((group: any) => (
                                <IonItem key={group}>
                                  <IonLabel>
                                    <h6>{group}</h6>
                                  </IonLabel>
                                  <IonButton
                                    onClick={() => onDeleteHandler(group)}
                                    hidden={!addBO && display}
                                  >
                                    <IonIcon slot="icon-only" icon={trash} />
                                  </IonButton>
                                </IonItem>
                              ))}
                            </IonList>
                          )}
                        </IonCardContent>
                      </IonCard>
                      <IonCard>
                        <IonCardHeader>
                          <IonToolbar>
                            <IonTitle>Item Groups</IonTitle>
                            <IonButtons slot="end">
                              <IonButton
                                onClick={onAddItemGroupsHandler}
                                disabled={!addBO && display}
                              >
                                <IonIcon slot="icon-only" icon={addOutline} />
                              </IonButton>
                            </IonButtons>
                          </IonToolbar>
                          <IonRow>
                            <IonInput
                              key="ItemgroupName"
                              ref={itemGroupRef}
                              type="text"
                              placeholder="Enter Group Name"
                            />
                          </IonRow>
                        </IonCardHeader>
                        <IonCardContent>
                          {bo.itemGroups.length === 0 && (
                            <h2 className="ion-text-center">
                              No Groups Found!
                            </h2>
                          )}
                          {bo.itemGroups.length > 0 && (
                            <IonList inset={true}>
                              {bo.itemGroups.map((group: any) => (
                                <IonItem key={group}>
                                  <IonLabel>
                                    <h6>{group}</h6>
                                  </IonLabel>
                                  <IonButton
                                    onClick={() => onDeleteItemHandler(group)}
                                    hidden={!addBO && display}
                                  >
                                    <IonIcon slot="icon-only" icon={trash} />
                                  </IonButton>
                                </IonItem>
                              ))}
                            </IonList>
                          )}
                        </IonCardContent>
                      </IonCard>
                    </IonGrid>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
            <IonFooter>
              <IonToolbar>
                <IonButtons slot="end">
                  <IonButton
                    color="success"
                    fill="solid"
                    onClick={onEditHandler}
                    hidden={addBO}
                  >
                    {display ? "Edit" : "Display"}
                  </IonButton>
                  <IonButton
                    color="success"
                    fill="solid"
                    type="submit"
                    hidden={display && !props.addBO}
                  >
                    {!props.addBO ? "Update" : "Save"}
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonFooter>
          </IonPage>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    businessObjects: state.bo?.businessObjects,
    submitted: state.bo?.submitted,
    error: state.bo?.submitError,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddBO: (boDetails: any) =>
      dispatch(actions.addBusinessObject(boDetails, "token")),
    onEditBO: (boDetails: any) =>
      dispatch(actions.editBusinessObject(boDetails, "token")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessObjectAdd);
 */