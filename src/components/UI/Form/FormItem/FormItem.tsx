import React, { useEffect, useRef, useState } from "react";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonList,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonAlert,
  IonText,
  IonInput,
} from "@ionic/react";
import * as globalStructre from "../../Components/Content";
import "./FormItem.css";
import { trash } from "ionicons/icons";
import Modal from "../../Modal/Modal";
import { UtilValidateForm } from "../FormUtil";
import _ from "lodash";
import FormAccordion from "../FormAccordion/FormAccordion";

// every lineitem should have a itemNo field

interface FormHeaderProps {
  items: globalStructre.Group[];
  itemList: globalStructre.ItemList;
  uniqueName: string;
  operation: string;
  defaultValues: {}[];
  updateFlag?: boolean;
  onSendItem?: (itemDetails: any) => void;
  onSendError?: (flag: any) => void;
}

const FormItem: React.FC<FormHeaderProps> = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [startDelete, setStartDelete] = useState(false);
  const [deleteKey, setDeleteKey] = useState() as any;
  const [initlaValue, setInitialValue] = useState() as any;
  const [listItems, setlistItems] = useState() as any;
  const {
    items, // fields
    itemList, // row fields in list
    uniqueName,
    operation,
    defaultValues, // values
    updateFlag,
    onSendItem,
    onSendError,
  } = props;
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  const onStartDeleteHandler = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    slidingOptionsRef.current?.closeOpened();
    setStartDelete(true);
    setDeleteKey(id);
  };

  const onDeleteHandler = (event: React.MouseEvent) => {
    let itemsTemp = _.filter(listItems, (item: any) => item.id !== deleteKey);
    setlistItems(itemsTemp);
    setStartDelete(false);
    // onDeleteBusinessObject(deleteKey,"test");
  };

  const onEditHandler = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    let setValue: any = _.find(listItems, (item: any) => item.id === id);
    setInitialValue(setValue);
    setOpenDialog(true);
  };

  const setItem = (data: any) => {
    console.log("Inside form item SetItem");
    let itemsTemp = [...listItems];
    itemsTemp[initlaValue.id] = data;
    setlistItems(itemsTemp);
    setOpenDialog(false);
    if (onSendItem) onSendItem(itemsTemp);
  };

  const changeInput = (event: any) => {
    event.stopPropagation();
  };

  const setElement = (item: any, field: any, index: any) => {
    let element = null;
    if (field.type === "Field") {
      let name = field.name;
      let group = field.groupName;
      switch (index) {
        case 0: {
          if (!!field.groupName) {
            element = (
              <h5 key={index}>
                {field.label && field.label + ": "}
                {field.labelValue
                  ? field.labelValue
                  : _.get(item, [`${group}`, 0, `${field.name}`], "")}
              </h5>
            );
          } else {
            element = (
              <h5 key={index}>
                {field.label && field.label + ": "}
                {field.labelValue ? field.labelValue : item[name]}
              </h5>
            );
          }
          break;
        } // case 1
        case 1: {
          if (!!field.groupName) {
            element = (
              <h6 key={index}>
                {field.label && field.label + ": "}
                {field.labelValue
                  ? field.labelValue
                  : _.get(item, [`${group}`, 0, `${field.name}`], "")}
              </h6>
              //    <IonInput value={_.get(item, [`${group}`, 0, `${field.name}`], "")} onChange={e=>changeInput(e)}></IonInput>
            );
            /*             let fieldElement = _.find(items,{groupAttributes:[{name:`${field.name}`}]});
            console.log(
              _.find(fieldElement?.groupAttributes,{name:`${field.name}`})
            ); */
          } else {
            element = (
              <h6 key={index}>
                {field.label && field.label + ": "}
                {field.labelValue ? field.labelValue : item[name]}
              </h6>
            );
          }
          break;
        } // case 2

        default: {
          if (!!field.groupName) {
            element = (
              <p key={index}>
                {field.label && field.label + ": "}
                {field.labelValue
                  ? field.labelValue
                  : _.get(item, [`${group}`, 0, `${field.name}`], "")}
              </p>
            );
          } else {
            element = (
              <p key={index}>
                {field.label && field.label + ": "}
                {field.labelValue ? field.labelValue : item[name]}
              </p>
            );
          }
          break;
        } // default
      } // switch
    } // if
    else if (field.type === "Image") {
      element = (
        <IonAvatar slot="start" key={index}>
          <img src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" />
        </IonAvatar>
      );
    }

    return element;
  };

  const setColumn = (item: any) => {
    let elements: any = [];
    let elementsTemp: any = [];
    // first column
    itemList.firstColumn.map((field, index) => {
      if (field.type === "Image") {
        elements.push(setElement(item, field, index));
      } else if (field.type === "Field") {
        elementsTemp.push(setElement(item, field, index));
      }
    });
    if (elementsTemp.length > 0) {
      elements.push(<IonLabel key={1}>{[...elementsTemp]}</IonLabel>);
      elementsTemp = [];
    }

    itemList.secondColumn.map((field, index) => {
      if (field.type === "Field") {
        elementsTemp.push(setElement(item, field, index));
      }
    });
    if (elementsTemp.length > 0) {
      elements.push(<IonLabel key={2}>{[...elementsTemp]}</IonLabel>);
      elementsTemp = [];
    }

    itemList.thirdColumn.map((field, index) => {
      if (field.type === "Field") {
        elementsTemp.push(setElement(item, field, index));
      }
    });
    if (elementsTemp.length > 0) {
      elements.push(<IonLabel key={3}>{[...elementsTemp]}</IonLabel>);
      elementsTemp = [];
    }

    itemList.fourthColumn.map((field, index) => {
      if (field.type === "Field") {
        elementsTemp.push(setElement(item, field, index));
      }
    });
    if (elementsTemp.length > 0) {
      elements.push(<IonLabel key={4}>{[...elementsTemp]}</IonLabel>);
      // elements.push(<IonItem key={4}>{[...elementsTemp]}</IonItem>);
      elementsTemp = [];
    }

    return elements;
  };

  const listDisplay = () => {
    let listValues: any = [];
    let errorFlag = false;
    listItems?.map((item: any, itemIndex: any) => {
      // let itemId = _.get(item,'id','');
      let errorClass = UtilValidateForm(items, item) ? "" : "ItemError";
      if (errorClass) errorFlag = true;
      item.id = itemIndex;
      listValues.push(
        <IonItemSliding key={"item" + itemIndex} ref={slidingOptionsRef}>
          <IonItemOptions side="end">
            <IonItemOption
              onClick={onStartDeleteHandler.bind(null, item.id)}
              color="danger"
            >
              <IonIcon slot="icon-only" icon={trash} />
            </IonItemOption>
          </IonItemOptions>
          <IonItem
            button
            onClick={onEditHandler.bind(null, item.id)}
            className={errorClass}
          >
            {setColumn(item)}
          </IonItem>
        </IonItemSliding>
      );
    });
    return [listValues, errorFlag];
  };

  const [listValues, errorFlag] = listDisplay();
  let errorMessage:any = null;
  if (errorFlag && onSendError) {
    errorMessage = (
      <IonText color="danger" className="ion-padding-start" id="errorMessage">
        <small>
          <span role="alert" id="itemError">
            {"Please Correct the Errors in Items"}
          </span>
        </small>
      </IonText>
    );
    onSendError(true);
  }

  useEffect(() => {
    setlistItems(defaultValues);
  }, [setlistItems, updateFlag]);
  console.log("rendering...formItem component");
  return (
    <React.Fragment>
      <Modal
        open={openDialog}
        uniqueName={uniqueName}
        defaultFieldValues={initlaValue}
        operation={operation}
        header={items}
        callingComp={"item"}
        title="Product"
        onSubmit={(data: any) => setItem(data)}
        onSetCallingState={(closeFlag: boolean) => setOpenDialog(closeFlag)}
      />
      <IonAlert
        isOpen={startDelete}
        message="Do you want to Delete the Item ?"
        buttons={[
          { text: "No", role: "cancel", handler: () => setStartDelete(false) },
          { text: "Yes", handler: onDeleteHandler },
        ]}
      />
      <IonCard className="IonCard" key="Items">
      <FormAccordion
        openPanel={itemList.itemExpand}
        renderHeader={() => {
          return (
            <span id='Items' style={{ fontWeight: "bold" }}>
              Items
            </span>
          );
        }}
        renderPanel={() => {
          return (
            // <IonCardContent className="horizontalScroll">
            <>
            {errorMessage}
            <IonList className="ion-nowrap">{listValues}</IonList>
            </>
          /* </IonCardContent> */
          );
        }}
      />
      </IonCard>
    </React.Fragment>
  );
};

export default FormItem;

/*             {listItems?.map((item: any, itemIndex: any) => {
              let errorClass = UtilValidateForm(items,item) ? '' : 'ItemError';
              item.id = itemIndex;
                return (
                  <IonItemSliding
                    key={"item" + itemIndex}
                    ref={slidingOptionsRef}
                  >
                    <IonItemOptions side="end">
                      <IonItemOption
                        onClick={onStartDeleteHandler.bind(null, item.id)}
                        color="danger"
                      >
                        <IonIcon slot="icon-only" icon={trash} />
                      </IonItemOption>
                    </IonItemOptions>
                    <IonItem button onClick={onEditHandler.bind(null, item.id)} className={errorClass}>
                      {setColumn(item)}
                    </IonItem>
                  </IonItemSliding>
                );
            })} */

/**
 * 
 * 
     <IonGrid >
      <IonRow>
        <IonCol size-sm="8" offset-sm="2" size-md="10" offset-md="1">
          <IonGrid>
            <IonCard className="IonCard" key="Items">
              <IonCardHeader className="ion-no-padding">
                <IonToolbar className="ion-no-padding">
                  <IonItem lines="none" className="ion-float-right" id="Items">
                    Items
                  </IonItem>
                </IonToolbar>
              </IonCardHeader>
              <IonCardContent>
                <IonRow></IonRow>
              </IonCardContent>
            </IonCard>
          </IonGrid>
        </IonCol>
      </IonRow>
    </IonGrid>


 */

/**
  * 
  * 
  
            <IonItemSliding key="Item1" ref={slidingOptionsRef}>
              <IonItemOptions side="end">
                <IonItemOption
                  onClick={onStartDeleteHandler.bind(null, "0")}
                  color="danger"
                >
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
              <IonItem button onClick={onEditHandler.bind(null, "0")}>
                {/*             <IonSlides pager={true} options={slideOptsOne}>
              <IonSlide>
              <IonThumbnail slot="start">
                  <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" className="divSlide"/>
                  </IonThumbnail>
              </IonSlide>
              <IonSlide>
              <IonThumbnail slot="start">
                  <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" className="divSlide" />
                  </IonThumbnail>
              </IonSlide>
            </IonSlides> */
/*       <IonAvatar slot="start">
            <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" />
          </IonAvatar>
          <IonLabel>
            <h5>Finn</h5>
            <h6>I'm a big deal</h6>
            <p>Listen, I've had a pretty messed up day...</p>
          </IonLabel>
          <IonLabel>
            <p>Finn</p>
            <p>I'm a big deal</p>
          </IonLabel>
        </IonItem>
      </IonItemSliding>
      <IonItemSliding key="Item2" ref={slidingOptionsRef}>
        <IonItemOptions side="end">
          <IonItemOption
            onClick={onStartDeleteHandler.bind(null, "Item2")}
            color="danger"
          >
            <IonIcon slot="icon-only" icon={trash} />
          </IonItemOption>
        </IonItemOptions>
        <IonItem button onClick={onEditHandler.bind(null, "1")}>
          <IonAvatar slot="start">
            <img src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" />
          </IonAvatar>
          <IonLabel>
            <h5>Han</h5>
            <h6>Look, kid...</h6>
            <p>I've got enough on my plate as it is, and I...</p>
          </IonLabel>
          <IonLabel>
            <p>Finn</p>
            <p>I'm a big deal</p>
          </IonLabel>
          <IonLabel>
            <h5>Han</h5>
            <h6>Look, kid...</h6>
            <p>I've got enough on my plate as it is, and I...</p>
          </IonLabel>
        </IonItem>
      </IonItemSliding>


  */
