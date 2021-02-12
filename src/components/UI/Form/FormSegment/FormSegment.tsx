import React  from "react";
import { IonLabel, IonRow, IonSegment, IonSegmentButton } from "@ionic/react";
import './FormSegment.css';
interface FormSegmentProps {
/*   formFields: globalStructre.Group[];
  fieldArrayName: boolean;
  errors:any; */
  segmentArray: string[];
}

const FormSegment: React.FC<FormSegmentProps> = (props) => {
  const {segmentArray} = props;

  const scrollSegment = (e: any) => {
    let myElement = document.getElementById(e.detail.value);
    myElement?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  };
  
  const buildSegments = () => {
    let segmentElement = null;
    let segmentElements: any = [];
    segmentArray.map((field: any, index: any) => {
      if(field !== 'Items'){
        segmentElement = (
          <IonSegmentButton value={field} key={field}>
            <IonLabel id={field + 'seg'} className='ion-text-capitalize'>
              {field}
            </IonLabel>
          </IonSegmentButton>
        );
        segmentElements.push(segmentElement);
      }
      else{
        var elementExists = document?.querySelector('[id^="errorMessage"]')?.id;   //document.getElementById("errorMessage");
        let requiredClasses1= ['ion-text-capitalize'];
        if(!!elementExists) {requiredClasses1.push('Invalid');}
        segmentElements.push(
          <IonSegmentButton value="Items" key="Items">
          <IonLabel className={requiredClasses1.join(' ')}>
            {field}
          </IonLabel>
        </IonSegmentButton>
        );
      }
      
    });

    return segmentElements;
  };

  let defaultValue = null;
  let segmentGroup = buildSegments();
  console.log("Segment rendering...")
  return (
    <IonRow className="ion-justify-content-center">
      <IonSegment
        color="primary"
        scrollable
        value={defaultValue}
        className="ion-text-center"
        onIonChange={(e) => scrollSegment(e)}
      >
        {segmentGroup}
      </IonSegment>
    </IonRow>
  );
};

export default FormSegment;


/**
 * 
 
  const errorSegments = () => {
    let groupObject:any = null;
    let errorSegments:any = [];
    _.forIn(errors, function(value, key) {
      if(Array.isArray(value)){
        errorSegments.push(key);
      }
      else{
      groupObject = _.filter(formFields, {groupAttributes:[{name:key}]});
      const [groupFirstObject] = groupObject;
      errorSegments.push(groupFirstObject.groupName);
        }
      
    } )
    return errorSegments;
  };


  const buildSegments = (formFields: any, itemArray: boolean) => {
    let segmentArray = [...formFields];
    let segmentElement = null;
    let segmentElements: any = [];
//    let errorsSet = errorSegments();
    segmentArray.map((field: any, index: any) => {
      if (field.groupName) {
        // if(index == 0) {defaultValue = field.groupName}
        let requiredClasses= ['ion-text-capitalize'];
/*         if(_.includes(errorsSet, field.groupName)){
          requiredClasses.push('Invalid');
        } */
/*         let errorId = `${field.groupName}Error`;
        if(document?.querySelector('[id^="'+errorId+'"]')?.id){
          requiredClasses.push('Invalid');
        } */
/*         segmentElement = (
          <IonSegmentButton value={field.groupName} key={field.groupName}>
            <IonLabel id={field.groupName + 'seg'} className={requiredClasses.join(' ')}>
              {field.groupName}
            </IonLabel>
          </IonSegmentButton>
        );
        segmentElements.push(segmentElement);
      }
    }); */

/*     if(itemArray){
      var elementExists = document?.querySelector('[id^="errorMessage"]')?.id;   //document.getElementById("errorMessage");
      let requiredClasses1= ['ion-text-capitalize'];
      if(!!elementExists) {requiredClasses1.push('Invalid');}
      segmentElements.push(
        <IonSegmentButton value="Items" key="Items">
        <IonLabel className={requiredClasses1.join(' ')}>
          Items
        </IonLabel>
      </IonSegmentButton>
      );
    }

    return segmentElements;
  };

 */