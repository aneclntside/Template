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
import AddAttributes from "./AddAttributes";
import Toast from "../../components/UI/ShowToast";
import './Attributes.css';

const Attributes: React.FC<dynamicContent.AttributeProps> = (props) => {
  const [startDelete, setStartDelete] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [addAttribute, setAddAttribute] = useState(false);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const history = useHistory();
  const {attributes,loading,error,submitted,onGetAttributes,onDeleteAttribute, onInitAttribute} = props;

  console.log("Attribute - rendering");

  const onEditHandler = useCallback((attId: string, event: React.MouseEvent) => {
    onInitAttribute();
    history.push({
      pathname: "/pim/attributes/addattributes",
      state: {
        data: attId,
        editAttribute: true,
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
    onDeleteAttribute(deleteKey,"test");
  },[deleteKey,onDeleteAttribute]);

  const onAddAttributeHandler = useCallback(() => {
    onInitAttribute();
    history.location.state={addAttribute: true};
    setAddAttribute(true);
  },[]);

  const onCancelAttributeHandler = useCallback((reset:boolean) => {
    setAddAttribute(false);
    // if(submitted)
    // onGetAttributes("test");
  },[]);

  useEffect(() => {
    console.log("Component Load - Inside Attributes");
    onGetAttributes("test");
  }, [onGetAttributes]);

  useEffect(() => {
    console.log("inside - Attribute component update");  
  });

  console.log("Toast Message : " + submitted);

  return (
    <React.Fragment>
      <IonModal
        id="addModal"
        isOpen={addAttribute}
        animated={true}
        onDidDismiss={() => setAddAttribute(false)}
      >
        <AddAttributes
          updateAttributeScreen={(reset:boolean) => onCancelAttributeHandler(reset)}
          addAttribute={addAttribute}
          history={null}
        />
      </IonModal>
      <IonToast
        isOpen={!!submitted}
        message={submitted}
        duration={2000}
      />
      <IonAlert
        isOpen={startDelete}
        message="Do you want to Delete the Attribute ?"
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
            <IonTitle>Attributes</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onAddAttributeHandler}>
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
          {props?.attributes?.length === 0 && (
            <h2 className="ion-text-center">No Attributes Found!</h2>
          )}
          {props?.attributes?.length > 0 && (
            <IonList inset={true}>
              {props.attributes.map((attribute: any) => (
                <IonItemSliding key={attribute.id} ref={slidingOptionsRef}>
                  <IonItemOptions side="end">
                    <IonItemOption
                      onClick={onStartDeleteHandler.bind(null, attribute.id)}
                      color="danger"
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem
                    button
                    onClick={onEditHandler.bind(null, attribute.id)}
                  >
                    <IonLabel>
                      <h3>{attribute.attName}</h3>
                    </IonLabel>
                    <IonLabel>
                      <p>{"Group : " + attribute.groupName}</p>
                      <p>{"Element Type : " + attribute.elementType}</p>
                    </IonLabel>
                    <IonNote>
                      <h6>{attribute.businessObjects.join()}</h6>
                    </IonNote>
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
    attributes: state.attribute?.attributes,
    loading: state.attribute?.loading,
    error: state.attribute?.error,
    submitted:state.attribute?.submitted
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetAttributes: (token: any) => dispatch(actions.getAttribute(token)),
    onDeleteAttribute: (id:string, token: any) => dispatch(actions.deleteAttribute(id, token)),
    onInitAttribute: () => dispatch(actions.attributesInit())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Attributes));
