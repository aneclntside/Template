import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import "./ImageEditorComp.css";
import FilerobotImageEditor from 'filerobot-image-editor';

interface ImageEditor {
  imgSrc: string;
  imgName: string;
  open: boolean;
  onSetModalState: () => void;
}
const myTheme = {};
const ImageEditorComp: React.FC<ImageEditor> = (props) => {
  const { imgSrc, imgName, open, onSetModalState } = props;

  const imageEditor = React.createRef();
  const saveImageToForm = () => {
    console.log("inside save");
    onSetModalState();
  };
  console.log("imgName " + imgName + "imgSrc" + imgSrc);
  return (
    <FilerobotImageEditor
    show={open}
    src={imgSrc}
    onClose={onSetModalState()}
    onComplete={(props:any) => {
      console.log(props);
      props.canvas.toBlob((blob:any)=>{
      const   url = URL.createObjectURL(blob);
      console.log(url);
      });
    
    }}
    onBeforeComplete={(props:any) => {
      console.log(props);
      return false;
    }}
  />
  );
};

export default ImageEditorComp;

/**
 * 
 * 
 * 
 

    <IonModal
      id="addModal"
      isOpen={open}
      animated={true}
      //  onDidDismiss={() => onSetModalState()}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Image</IonTitle>
          <IonButtons slot="end">
            <IonButton color="success" fill="solid" onClick={saveImageToForm}>
              Save
            </IonButton>
            <IonButton
              fill="clear"
              color="warning"
              onClick={() => onSetModalState()}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
<ImageEditor
        includeUI={{
          loadImage: {
            path: imgSrc,
            name: imgName,
          },
          theme: myTheme,
          menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
          //  initMenu: "filter",
          uiSize: {

          },
          menuBarPosition: "bottom",
        }}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      /> 
    </IonModal>


 * 
 * 
 * 
             // width: "1200px",
          //  height: `calc(100vh - 40px)`,
       // cssMaxHeight={window.innerHeight}
      //  cssMaxWidth={window.innerWidth}



  // Theme object to extends default dark theme.
  "common.bi.image": "none",
  "common.bisize.width": "none",
  "common.bisize.height": "none",
  "common.backgroundImage": "none",
  //'common.backgroundColor': 'none',
  "common.border": "none",

  // header
  //"header.display": "none",
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",

 

  // load button
  "loadButton.backgroundColor": "#fff",
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": "#222",
  "loadButton.fontFamily": "NotoSans, sans-serif",
  "loadButton.fontSize": "12px",

  // download button
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.fontFamily": "NotoSans, sans-serif",
  "downloadButton.fontSize": "12px",
  "downloadButton.display": "none",

  // icons default
  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#434343",
  "menu.hoverIcon.color": "#e9e9e9",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",

  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "#858585",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "lighter",
  "submenu.activeLabel.color": "#fff",
  "submenu.activeLabel.fontWeight": "lighter",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.display": "none", 
/*   "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "range.disabledPointer.color": "#414141",
  "range.disabledBar.color": "#282828",
  "range.disabledSubbar.color": "#414141",

  "range.value.color": "#fff",
  "range.value.fontWeight": "lighter",
  "range.value.fontSize": "11px",
  "range.value.border": "1px solid #353535",
  "range.value.backgroundColor": "#151515",
  "range.title.color": "#fff",
  "range.title.fontWeight": "lighter", */

// colorpicker style
/*   "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",

  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black" */
