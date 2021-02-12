import React, { useState, useRef, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
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
  IonToast,
  IonText,
} from "@ionic/react";
import "./AddBO.css";
import * as dynamicContent from "../../components/AddAttributes/DynamicContent";
import { updateObject } from "../../shared/utility";
import ShowFooter from "../UI/ShowFooter";
import AddGroups from "./AddGroups";

interface AddBOProps {
  businessObjects: [];
  addBO?: boolean;
  updateBOScreen?: (reset: boolean) => void;
  onAddBO: (boDetails: any) => void;
  onEditBO: (boDetails: any) => void;
  error: boolean;
  submitted: string;
}

interface LocationState {
  state: {
    data: string;
    editBusinessObject: boolean;
  };
  editBusinessObject: boolean;
  data: string;
}

const AddBO: React.FC<AddBOProps> = (props) => {
  const [bo, setBO] = useState<dynamicContent.BO_STRUCTURES>({
    ...dynamicContent.BO_STRUCTURE,
  });
  const [check, setCheck] = useState("");
  const [display, setDispaly] = useState(true);
  const location = useLocation<LocationState>();
  let {
    businessObjects,
    addBO,
    updateBOScreen,
    submitted,
    error,
    onAddBO,
    onEditBO,
  } = props;
  const FormRef: React.Ref<HTMLFormElement> = null;
  const headerGroupRef = useRef<HTMLIonInputElement>(null);
  const itemGroupRef = useRef<HTMLIonInputElement>(null);
  const boRef = useRef<HTMLIonInputElement>(null);
  const editFlag = location?.state?.editBusinessObject;

  console.log("Add BO - Rendering");
  console.log(location.state);

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
    if (!display) _setBO();
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
      if (updateBOScreen) updateBOScreen(true);
    }
  };

  const _setBO = () => {
    console.log("INside setBO");
    const boList: any = businessObjects ? businessObjects : [];
    const boValue = boList.find(
      (bo: any) => bo.id === location?.state?.data //history?.location?.state?.data
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

  const onDeleteHeaderHandler = (groupName: string) => {
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

  if (!addBO) {
    addBO = false;
  }

  let linkDirectAccess = null;
  if (location.state == undefined || location.state == null) {
    linkDirectAccess = <Redirect to="/pim/businessobjects" />;
  }
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
                      onClick={() => {
                          if(updateBOScreen) updateBOScreen(false)
                        }}
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
                      <AddGroups
                        title="Header Groups"
                        addBO={addBO!}
                        display={display}
                        groups={bo.headerGroups}
                        onAddGroupsHandler={onAddHeaderGroupsHandler}
                        onDeleteHandler={(group: string) =>
                          onDeleteHeaderHandler(group)
                        }
                        ref={headerGroupRef}
                      />
                      <AddGroups
                        title="Item Groups"
                        addBO={addBO}
                        display={display}
                        groups={bo.itemGroups}
                        onAddGroupsHandler={onAddItemGroupsHandler}
                        onDeleteHandler={(group: string) =>
                            onDeleteItemHandler(group)
                        }
                        ref={itemGroupRef}
                      />
                    </IonGrid>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
            <ShowFooter
              onEditHandler={onEditHandler}
              addBO={addBO}
              display={display}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBO);
