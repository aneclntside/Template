import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import {
  IonHeader,
  IonContent,
  IonButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonPage,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonAlert,
  IonToast,
  IonModal,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { addOutline, trash } from "ionicons/icons";
import * as actions from "../../store/actions/index";
import * as dynamicContent from "../../components/AddAttributes/DynamicContent";
import BusinessObjectAdd from "./BusinessObjectAdd";
import './BusinessObject.css';
import AddBO from "../../components/AddBO/AddBO";

const BusinessObject: React.FC<dynamicContent.BOProps> = (props) => {
  const [startDelete, setStartDelete] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [addBO, setAddBO] = useState(false);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const history = useHistory();
  const {businessObjects,loading,error,submitted,onGetBusinessObjects,onDeleteBusinessObject, onInitBusinessObject} = props;

  console.log("BusinessObject - rendering");

  const onEditHandler = useCallback((boId: string, event: React.MouseEvent) => {
    onInitBusinessObject();
    history.push({
      pathname: "/pim/businessobjects/addbusinessobject",
      state: {
        data: boId,
        editBusinessObject: true,
      },
    });
  },[history]);

  const onStartDeleteHandler = useCallback((id:string, event: React.MouseEvent) => {
    event.stopPropagation();
    slidingOptionsRef.current?.closeOpened();
    setStartDelete(true);
    setDeleteKey(id);
  },[]);

  const onDeleteHandler = useCallback((event: React.MouseEvent) => {
    setStartDelete(false);
    onDeleteBusinessObject(deleteKey,"test");
  },[deleteKey,onDeleteBusinessObject]);

  const onAddBusinessObjectHandler = useCallback(() => {
    onInitBusinessObject();
    history.location.state={addBusinessObject: true};
    setAddBO(true);
  },[]);

  const onCancelBOHandler = useCallback((reset:boolean) => {
    console.log("onCancelBOHandler");
    setAddBO(false);
  },[]);

  useEffect(() => {
    console.log("Component Load - Inside BO");
    onGetBusinessObjects("test");
  }, [onGetBusinessObjects]);

  useEffect(() => {
    console.log("inside - BO component update");  
  });

  console.log("Toast Message : " + submitted);

  return (
    <React.Fragment>
      <IonModal
        id="addModal"
        isOpen={addBO}
        animated={true}
        onDidDismiss={() => setAddBO(false)}
      >
      <AddBO 
              updateBOScreen={(reset:boolean) => onCancelBOHandler(reset)}
              addBO={addBO}
      />  
      </IonModal>
      <IonToast
        isOpen={!!submitted}
        message={submitted}
        duration={2000}
      />
      <IonAlert
        isOpen={startDelete}
        message="Do you want to Delete the Business Object ?"
        buttons={[
          { text: "No", role: "cancel", handler: () => setStartDelete(false) },
          { text: "Yes", handler: onDeleteHandler },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Business Objects</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onAddBusinessObjectHandler}>
                <IonIcon slot="icon-only" icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {props.loading && (
            <div className="ion-text-center ion-padding">
              <IonSpinner name="crescent" />
            </div>
          )}
          {businessObjects?.length === 0 && (
            <h2 className="ion-text-center">No Business Objects Found!</h2>
          )}
          {businessObjects?.length > 0 && (
            <IonList inset={true}>
              {businessObjects.map((businessObject: any) => (
                <IonItemSliding key={businessObject.id} ref={slidingOptionsRef}>
                  <IonItemOptions side="end">
                    <IonItemOption
                      onClick={onStartDeleteHandler.bind(null, businessObject.id)}
                      color="danger"
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem
                    button
                    onClick={onEditHandler.bind(null, businessObject.id)}
                  >
                    <IonLabel>
                      <h3>{businessObject.boName}</h3>
                    </IonLabel>
                  </IonItem>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    businessObjects: state.bo?.businessObjects,
    loading: state.bo?.loading,
    error: state.bo?.error,
    submitted:state.bo?.submitted
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetBusinessObjects: (token: any) => dispatch(actions.getBusinessObject(token)),
    onDeleteBusinessObject: (id:string, token: any) => dispatch(actions.deleteBusinessObject(id, token)),
    onInitBusinessObject: () => dispatch(actions.businessObjectsInit())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(BusinessObject));










/* 
import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import {
  IonHeader,
  IonContent,
  IonButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonPage,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonAlert,
  IonToast,
  IonModal,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { addOutline, trash } from "ionicons/icons";
import * as actions from "../../store/actions/index";
import * as dynamicContent from "../../components/AddAttributes/DynamicContent";
import BusinessObjectAdd from "./BusinessObjectAdd";
import './BusinessObject.css';

const BusinessObject: React.FC<dynamicContent.BOProps> = (props) => {
  const [startDelete, setStartDelete] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [addBO, setAddBO] = useState(false);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const history = useHistory();
  const {businessObjects,loading,error,submitted,onGetBusinessObjects,onDeleteBusinessObject, onInitBusinessObject} = props;

  console.log("BusinessObject - rendering");

  const onEditHandler = useCallback((boId: string, event: React.MouseEvent) => {
    onInitBusinessObject();
    history.push({
      pathname: "/pim/businessobjects/addbusinessobject",
      state: {
        data: boId,
        editBusinessObject: true,
      },
    });
  },[history]);

  const onStartDeleteHandler = useCallback((id:string, event: React.MouseEvent) => {
    event.stopPropagation();
    slidingOptionsRef.current?.closeOpened();
    setStartDelete(true);
    setDeleteKey(id);
  },[]);

  const onDeleteHandler = useCallback((event: React.MouseEvent) => {
    setStartDelete(false);
    onDeleteBusinessObject(deleteKey,"test");
  },[deleteKey,onDeleteBusinessObject]);

  const onAddBusinessObjectHandler = useCallback(() => {
    onInitBusinessObject();
    history.location.state={addBusinessObject: true};
    setAddBO(true);
  },[]);

  const onCancelAttributeHandler = useCallback((reset:boolean) => {
    setAddBO(false);
  },[]);

  useEffect(() => {
    console.log("Component Load - Inside BO");
    onGetBusinessObjects("test");
  }, [onGetBusinessObjects]);

  useEffect(() => {
    console.log("inside - BO component update");  
  });

  console.log("Toast Message : " + submitted);

  return (
    <React.Fragment>
      <IonModal
        id="addModal"
        isOpen={addBO}
        animated={true}
        onDidDismiss={() => setAddBO(false)}
      >
        <BusinessObjectAdd 
        updateBOScreen={(reset:boolean) => onCancelAttributeHandler(reset)}
        addBO={addBO}
        history={history}
        />
      </IonModal>
      <IonToast
        isOpen={!!submitted}
        message={submitted}
        duration={2000}
      />
      <IonAlert
        isOpen={startDelete}
        message="Do you want to Delete the Business Object ?"
        buttons={[
          { text: "No", role: "cancel", handler: () => setStartDelete(false) },
          { text: "Yes", handler: onDeleteHandler },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Business Objects</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onAddBusinessObjectHandler}>
                <IonIcon slot="icon-only" icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {props.loading && (
            <div className="ion-text-center ion-padding">
              <IonSpinner name="crescent" />
            </div>
          )}
          {businessObjects?.length === 0 && (
            <h2 className="ion-text-center">No Business Objects Found!</h2>
          )}
          {businessObjects?.length > 0 && (
            <IonList inset={true}>
              {businessObjects.map((businessObject: any) => (
                <IonItemSliding key={businessObject.id} ref={slidingOptionsRef}>
                  <IonItemOptions side="end">
                    <IonItemOption
                      onClick={onStartDeleteHandler.bind(null, businessObject.id)}
                      color="danger"
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem
                    button
                    onClick={onEditHandler.bind(null, businessObject.id)}
                  >
                    <IonLabel>
                      <h3>{businessObject.boName}</h3>
                    </IonLabel>
                  </IonItem>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    businessObjects: state.bo?.businessObjects,
    loading: state.bo?.loading,
    error: state.bo?.error,
    submitted:state.bo?.submitted
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetBusinessObjects: (token: any) => dispatch(actions.getBusinessObject(token)),
    onDeleteBusinessObject: (id:string, token: any) => dispatch(actions.deleteBusinessObject(id, token)),
    onInitBusinessObject: () => dispatch(actions.businessObjectsInit())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(BusinessObject));
 */