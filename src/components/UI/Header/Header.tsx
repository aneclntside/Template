import React from "react";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

interface HeaderProps {
  title: string;
  operation: string;
  menu: boolean; // show menu
  onResetModal?: (close: boolean) => void; //close the modal
  onEntityHandler?: () => void; //create button
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title, operation, menu, onResetModal, onEntityHandler } = props;
  let buttons = null;
  switch (operation) {
    case "add":
      buttons = (
        <IonButton
          fill="clear"
          color="warning"
          onClick={() => {
            if (onResetModal) onResetModal(false);
          }}
        >
          Close
        </IonButton>
      );
      break;

    case "edit":
      buttons = <IonBackButton />;
      break;

    default:
      buttons = (
        <IonButton onClick={onEntityHandler}>
          <IonIcon slot="icon-only" icon={addOutline} />
        </IonButton>
      );
      break;
  }
  return (
    <IonHeader>
      <IonToolbar>
        {menu && (
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">{buttons}</IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
