import React, { useState, useEffect } from "react";
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
  IonSelect,
  IonSelectOption,
  IonCard,
  IonMenuButton,
  IonButton,
  IonFooter,
  IonToast,
  IonText,
} from "@ionic/react";
import "./AddAttributes.css";
import * as dynamicContent from "../../components/AddAttributes/DynamicContent";
import { getInput } from "./utility/utility";
import {
  updateObject,
  upsert,
  editObject,
  convertDynamicFields,
} from "../../shared/utility";

import "./AddAttributes.css";
import { Redirect } from "react-router-dom";

const AddAttributes: React.FC<dynamicContent.Props> = (props) => {
  const [attribute, setAttribute] = useState<dynamicContent.FIELD_STRUCTURES>({
    ...dynamicContent.FIELD_STRUCTURE,
  });
  const [check, setCheck] = useState("");
  const [display, setDispaly] = useState(true);
  const {
    attributes,
    submitted,
    error,
    onAddAttribute,
    onEditAttribute,
    history,
  } = props;
  const attributeFrom = dynamicContent;
  const FormRef: React.Ref<HTMLFormElement> = null;
  const editFlag = history?.location?.state?.editAttribute;
  let attributeTemp: dynamicContent.FIELD_STRUCTURES = { ...attribute };
  let attributeValue: any = null;

  console.log("Add Attribute - Rendering");

  const setEditAttribute = () => {
    const attributeList: any = attributes ? attributes : [];
    attributeValue = attributeList.find(
      (att: any) => att.id === history?.location?.state?.data
    );
    if (attributeValue) {
      attributeTemp = { ...attributeValue };
      let dynamicFields: any = { ...attributeFrom.DYNAMIC_FIELDS };
      let fieldObject = { ...dynamicFields[attributeTemp.elementType] };
      convertDynamicFields([...attributeTemp.elementConfigs], fieldObject);
      attributeTemp.elementConfigsTemp = fieldObject;
      setAttribute(attributeTemp);
    }
  };

  const _checkInput = () => {
    if (attributeTemp.businessObjects.length === 0 || !attribute.elementType) {
      setAttribute(attributeTemp);
      setCheck("Please enter all Mandatory Fields");
      return false;
    } else {
      setCheck("");
      return true;
    }
  };

  const onEditHandler = () => {
    if (!display) setEditAttribute();
    setDispaly(!display);
  };

  const onSaveHanler = (event: any) => {
    event.preventDefault();
    if (editFlag) {
      console.log("edit");
      const updatedAttribute = editObject(attributeTemp);
      onEditAttribute(updatedAttribute);
      setAttribute(attributeTemp);
      setDispaly(!display);
    } else {
      console.log("create");
      if (_checkInput()) {
        onAddAttribute(attributeTemp);
        attributeTemp = { ...dynamicContent.FIELD_STRUCTURE };
        props.updateAttributeScreen(true);
      }
    }
  };

  const onClearHandler = () => {
    if (editFlag) {
      console.log("insideEditclear");
      //  _setAttributeTemp(attributeTemp.elementType);
      setEditAttribute();
    } else {
      console.log("inside create clear");
      attributeTemp = { ...dynamicContent.FIELD_STRUCTURE };
      setAttribute(attributeTemp);
    }
  };

  const onInputChangeHandler = (event: any, inputIdentifier: string) => {
    let updateElementConfig = [];
    let updateElementConfigsTemp;
    const value =
      "checked" in event.target
        ? event.target.checked
        : event.target.value.trim();

    if (attributeTemp?.elementConfigs!.length > 0) {
      updateElementConfig = [...attributeTemp!.elementConfigs];
      upsert(updateElementConfig, {
        fieldName: inputIdentifier,
        fieldValue: value,
      });
    } else {
      updateElementConfig.push({
        fieldName: inputIdentifier,
        fieldValue: value,
      });
    }

    updateElementConfigsTemp = { ...attributeTemp!.elementConfigsTemp };
    const filterAtt = Object.entries(updateElementConfigsTemp).filter(
      (inputKey) => inputKey[0] === inputIdentifier
    );
    let [filterKey, filterObject] = filterAtt[0];
    const updateFilterObject = Object.assign({}, filterObject);
    const updatedFilterObject = updateObject(updateFilterObject, {
      value: value,
    });
    const updatedObject = {
      [inputIdentifier]: updatedFilterObject,
    };
    const updatedElementConfigsTemp = updateObject(
      updateElementConfigsTemp,
      updatedObject
    );

    const updatedElementConfig = {
      elementConfigs: updateElementConfig,
      elementConfigsTemp: updatedElementConfigsTemp,
    };
    attributeTemp = updateObject(attributeTemp, updatedElementConfig);
  };

  const onInputChangeHandler2 = (event: any, inputIdentifier: string) => {
    attributeTemp = updateObject(attributeTemp, {
      [inputIdentifier]: event.target.value,
    });
  };

  const getBusinessObjects = () => {
    const inputElement = (
      <IonSelect
        interface="alert"
        multiple
        disabled={display && !props.addAttribute}
        onIonChange={(event: any) => _getValues(event, "businessObjects")}
        value={attributeTemp?.businessObjects}
      >
        {Object.entries(dynamicContent.DYNAMIC_BO).map((inputKey, id) => {
          const [name] = inputKey;
          return (
            <IonSelectOption key={id} value={name}>
              {name}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    );
    return inputElement;
  };

  const _getValues = (event: any, inputIdentifier: string) => {
    attributeTemp = updateObject(attributeTemp, {
      [inputIdentifier]: event.target.value,
    });
  };

  const getOptions = () => {
    const fieldOptions = { ...attributeFrom.DYNAMIC_FIELDS };
    const inputElement = (
      <IonSelect
        interface="popover"
        disabled={!props.addAttribute}
        onIonChange={(event: any) => _getFields(event)}
        value={attributeTemp?.elementType}
      >
        {Object.entries(fieldOptions).map((inputKey, id) => {
          const [name] = inputKey;
          return (
            <IonSelectOption key={id} value={name}>
              {name}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    );
    return inputElement;
  };

  const _setAttributeTemp = (value: string) => {
    attributeTemp.elementConfigsTemp = {};
    attributeTemp.elementConfigs = [];
    const fieldObject: any = { ...attributeFrom.DYNAMIC_FIELDS };
    let fieldValue = value;
    let selectedValues = { ...fieldObject[fieldValue] };
    attributeTemp = updateObject(attributeTemp, {
      elementType: value,
      elementConfigsTemp: selectedValues,
    });
    setAttribute(attributeTemp);
  };

  const _getFields = (event: any) => {
    console.log("inside edit update attribute value");
    if (!attributeValue) {
      _setAttributeTemp(event.target.value);
    }
  };

  useEffect(() => {
    console.log("Component Load - Inside AddAttributes");
    if (editFlag) {
      setEditAttribute();
    }
  }, []);

  useEffect(() => {
    console.log("Component Update - Inside AddAttributes");
    //console.log(attributeTemp);
  });

  let linkDirectAccess = null;
  /*   if (
    history.location.state == undefined ||
    history.location.state == null ||
    history.location.state == ""
  ) {
    linkDirectAccess = <Redirect to="/pim/attributes" />;
  } */
  return (
    <React.Fragment>
      {linkDirectAccess}
      <IonToast isOpen={!!submitted} message={submitted} duration={2000} />
      <form ref={FormRef} onSubmit={onSaveHanler}>
        <fieldset disabled={display && !props.addAttribute}>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
                <IonTitle>
                  {!props.addAttribute ? "Edit" : "Add"} Attributes
                </IonTitle>
                <IonButtons slot="end">
                  {props.addAttribute ? (
                    <IonButton
                      fill="clear"
                      color="warning"
                      onClick={() => props.updateAttributeScreen(false)}
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
              {check && (
                <IonRow className="ion-text-center">
                  <IonCol>
                    <IonText color="danger">
                      <p>{check}</p>
                    </IonText>
                  </IonCol>
                </IonRow>
              )}
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
                                Attribute Name
                              </IonLabel>
                              <IonInput
                                key="attributeName"
                                type="text"
                                required
                                disabled={!props.addAttribute}
                                placeholder="Enter Field Name"
                                onIonChange={(event) =>
                                  onInputChangeHandler2(event, "attName")
                                }
                                value={attributeTemp?.attName}
                              />
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonLabel
                                position="floating"
                                className="required"
                              >
                                Business Object
                              </IonLabel>
                              {getBusinessObjects()}
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonItem>
                              <IonLabel
                                position="floating"
                                className="required"
                              >
                                Attribute Group
                              </IonLabel>
                              <IonInput
                                key="attributeGroup"
                                required
                                //disabled={!props.addAttribute}
                                onIonChange={(event) =>
                                  onInputChangeHandler2(event, "groupName")
                                }
                                value={attributeTemp?.groupName}
                              />
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonLabel
                                position="floating"
                                className="required"
                              >
                                Group Level
                              </IonLabel>
                              <IonSelect
                                value={attributeTemp?.groupLevel}
                                interface="popover"
                                disabled={!props.addAttribute}
                                onIonChange={(event: any) =>
                                  onInputChangeHandler2(event, "groupLevel")
                                }
                              >
                                <IonSelectOption value="Header">
                                  Header
                                </IonSelectOption>
                                <IonSelectOption value="Item">
                                  Item
                                </IonSelectOption>
                              </IonSelect>
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonLabel
                                position="floating"
                                className="required"
                              >
                                Type
                              </IonLabel>
                              {getOptions()}
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonCard>
                      {attributeTemp.elementConfigsTemp && (
                        <IonCard>
                          <IonRow>
                            {getInput(
                              attributeTemp.elementConfigsTemp,
                              onInputChangeHandler,
                              display && !props.addAttribute
                            )}
                          </IonRow>
                        </IonCard>
                      )}
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
                    hidden={props.addAttribute}
                  >
                    {display ? "Edit" : "Display"}
                  </IonButton>
                  <IonButton
                    color="warning"
                    fill="clear"
                    onClick={onClearHandler}
                    hidden={display && !props.addAttribute}
                  >
                    Clear
                  </IonButton>
                  <IonButton
                    color="success"
                    fill="solid"
                    type="submit"
                    hidden={display && !props.addAttribute}
                  >
                    {!props.addAttribute ? "Update" : "Save"}
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
    attributes: state.attribute?.attributes,
    submitted: state.attribute?.submitted,
    error: state.attribute?.submitError,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddAttribute: (attDetails: any) =>
      dispatch(actions.addAttribute(attDetails, "token")),
    onEditAttribute: (attDetails: any) =>
      dispatch(actions.editAttribute(attDetails, "token")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAttributes);
