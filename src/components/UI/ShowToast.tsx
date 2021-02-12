import React from 'react';
import { IonToast } from '@ionic/react';

const ShowToast: React.FC<{
    message: string
  }> = (props) => { 

let message = props.message;    

return (
    <IonToast
    isOpen={!!message}
    message={message}
    duration={2000}
    onDidDismiss={() => message = ""}
  />
);

  }

export default ShowToast;  