import React, {forwardRef} from 'react';
import { IonToolbar, IonButtons, IonButton, IonCard, IonCardHeader, IonTitle, IonIcon, IonRow, IonInput, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { addOutline, trash } from 'ionicons/icons';

interface AddGroupsProps {
    title:string,
    addBO:boolean,
    display:boolean,
    groups:string[],
    onAddGroupsHandler:() =>void;
    onDeleteHandler:(group:string) =>void;
  }

const AddGroups = forwardRef<HTMLIonInputElement, AddGroupsProps>((props:AddGroupsProps,ref) => {

return (
    <IonCard>
    <IonCardHeader>
      <IonToolbar>
        <IonTitle>{props.title}</IonTitle>
        <IonButtons slot="end">
          <IonButton
            onClick={props.onAddGroupsHandler}
            disabled={!props.addBO && props.display}
          >
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonRow>
        <IonInput
          key="groupName"
          ref={ref}
          type="text"
          placeholder="Enter Group Name"
        />
      </IonRow>
    </IonCardHeader>
    <IonCardContent>
      {props.groups.length === 0 && (
        <h2 className="ion-text-center">
          No Groups Found!
        </h2>
      )}
      {props.groups.length > 0 && (
        <IonList inset={true}>
          {props.groups.map((group: any) => (
            <IonItem key={group}>
              <IonLabel>
                <h6>{group}</h6>
              </IonLabel>
              <IonButton
                onClick={() => props.onDeleteHandler(group)}
                hidden={!props.addBO && props.display}
              >
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      )}
    </IonCardContent>
  </IonCard>
);

});

export default AddGroups;