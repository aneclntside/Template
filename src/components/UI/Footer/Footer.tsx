import React from "react";
import { IonFooter, IonToolbar, IonButtons, IonButton } from "@ionic/react";

interface FooterProps {
  edit: boolean;
  dirty: boolean;
  validate: boolean;
  onResetHandler: () => void;
  onSubmitHandler?: () => void;
  onValidateHandler?: () => void;
}

const Footer: React.FC<FooterProps> = (props) => {
  const {
    edit,
    dirty,
    validate,
    onSubmitHandler,
    onValidateHandler,
    onResetHandler,
  } = props;
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton color="warning" fill="clear" onClick={onResetHandler}>
            Reset
          </IonButton>
          {validate && (
            <IonButton
              id="validate"
              color="success"
              fill="solid"
             // type="submit"
              disabled={!dirty}
              onClick={onValidateHandler}
            >
              VALIDATE
            </IonButton>
          )}
          <IonButton
            id="save"
            color="success"
            fill="solid"
            disabled={!dirty}
            onClick={onSubmitHandler}
          >
            {edit ? "UPDATE" : "SAVE"}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
