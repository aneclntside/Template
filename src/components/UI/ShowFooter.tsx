import React from 'react';
import { IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ShowFooterProps {
    addBO:boolean,
    display:boolean,
    onEditHandler:() =>void;
  }

const ShowFooter: React.FC<ShowFooterProps> = (props) => {

return (
    <IonFooter>
    <IonToolbar>
      <IonButtons slot="end">
        <IonButton
          color="success"
          fill="solid"
          onClick={props.onEditHandler}
          hidden={props.addBO}
        >
          {props.display ? "Edit" : "Display"}
        </IonButton>
        <IonButton
          color="success"
          fill="solid"
          type="submit"
          hidden={props.display && !props.addBO}
        >
          {!props.addBO ? "Update" : "Save"}
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonFooter>
);

};

export default ShowFooter;