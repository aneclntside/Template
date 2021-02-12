import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonReorder,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  attachOutline,
  camera,
  closeOutline,
  saveOutline,
} from "ionicons/icons";

import {
  Plugins,
  CameraResultType,
  CameraSource,
  FilesystemDirectory,
  Capacitor,
} from "@capacitor/core";
import "./FormAttachments.css";
import _ from "lodash";
import { isPlatform } from "@ionic/react";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { readFile } from "fs";
import { useDropzone } from "react-dropzone";
import ImageEditorComp from "./ImageEditor/ImageEditorComp";
import FilerobotImageEditor from "filerobot-image-editor";
import FormAccordion from "../FormAccordion/FormAccordion";
import { v4 as uuidv4 } from "uuid";

interface Photo {
  path: string | undefined;
  preview: string;
  name?: string;
}

type AttType = "Photo" | "File";

export interface Attachment {
  id?: string;
  fileName: string;
  fileSize?: string;
  imageBlob?: Blob; // incase of image
  file?: File; // incase of file
  attType?: AttType;
  preview: string;
  sortInd: number; // 1 - image, 2 - file
  showPreview: boolean;
  status?: "Create" | "Update" | "Delete";
}

interface FormAttachments {
  //  onImagePicker: (photo: Photo) => void;
}

const { Camera, Filesystem, Browser } = Plugins;

// IOS support to the project(check add capacitor and device camera)
// test this feature in andriod and ios and also URL.createObjectURL
// CRUD status on image for backend
// drag images in the panel to front

const FormAttachments: React.FC<FormAttachments> = (props) => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [fileError, setFileError] = useState(null) as any;
  const [imgEditor, setImageEditor] = useState("") as any;
  const [imgPreview, setImgPreview] = useState("");

  const filePickerRef = useRef<HTMLInputElement>(null);
  const fileNameRef = useRef<HTMLInputElement>(null) as any;
  const fileTypes = ["image/jpeg", "image/png", "image/tif"];
  const allowedFileTypes = ['image/png','image/jpeg','image/tif','application/pdf','.pdf'];
  const allowedFileSize = 20000;
  const maxFilesAllowed = 2; // drop zone

  useEffect(() => {
    let attribute: Attachment = {
      id: uuidv4(),
      fileName: "test1",
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlLBNi6VYGWKzcWCweg0B8eIZjvOO0_vV1-eqAntJX3CRi6311",
      sortInd: 0,
      showPreview: true,
    };
    let attribute1: Attachment = {
      id: uuidv4(),
      fileName: "test2",
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlLBNi6VYGWKzcWCweg0B8eIZjvOO0_vV1-eqAntJX3CRi6311",
      sortInd: 0,
      showPreview: true,
    };
    let attributes: any = [];
    attributes.push(attribute);
    attributes.push(attribute1);

    setAttachments(attributes);
  }, []);

  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const setPanel = () => {
    const panelHeight = 130;
    let panel: any = document.getElementById("AttachmentsButton")
      ?.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + panelHeight + "px";
  };

  const fileValidator = (file:any) => {
    console.log(file.size);
    if (file.size > allowedFileSize) {
      return {
        code: "file-too-large",
        message: `File is larger than ${allowedFileSize} bytes`
      };
    }

    if (allowedFileTypes.indexOf(file.type) === -1) {
      return {
        code: "file-invalid-type",
        message: `File type ${allowedFileTypes.join(' ')} allowed`
      };
    }    
  
    return null
  };

  const fileRejectionItems = () => {
    return fileRejections.map(({ file, errors }) => {
      console.log(file.type);
      console.log(errors);
      return (
        <li key={file.name}>
          <small key={file.name}>
            <span role="alert" id="fileRejError">
              {file.name} - {file.size} bytes
            </span>
          </small>
          <ul>
            {errors.map((e) => (
              <small key={file.name}>
                <span role="alert" id="fileRejError">
                  <li key={e.code}>{e.message}</li>
                </span>
              </small>
            ))}
          </ul>
        </li>
      );
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.map((file: any) => {
      let showPreview = false;
      let sortInd = 2;
      if (fileTypes.indexOf(file.type) !== -1) {
        showPreview = true;
        sortInd = 1;
      }
      let attribute: Attachment = {
        fileName: file.name,
        fileSize: formatBytes(file.size),
        file: file,
        attType: "File",
        preview: URL.createObjectURL(file),
        sortInd: sortInd,
        showPreview: showPreview,
        status: "Create",
      };
      updateAttachment(attribute);
      setPanel();
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({ onDrop, maxFiles: maxFilesAllowed, validator: fileValidator });

  const updateAttachment = (incomingProps: Attachment) => {
    let id = uuidv4();
    const newAttachment = {
      id: id,
      fileName: incomingProps.fileName,
      fileSize: incomingProps.fileSize,
      imageBlob: incomingProps.imageBlob,
      file: incomingProps.file,
      attType: incomingProps.attType,
      preview: incomingProps.preview,
      sortInd: incomingProps.sortInd,
      showPreview: incomingProps.showPreview,
      status: incomingProps.status,
    };

    setAttachments((curAttachments) => {
      return [...curAttachments, newAttachment];
    });
  };

  const openFilePicker = () => {
    filePickerRef.current?.click();
  };

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    if (file !== undefined) {

      let myValidator:any = fileValidator(file);
      let myValidators = [];
      myValidators.push(myValidator);
      if(myValidator !== null){
        fileRejections.push({  file: file,
          errors: myValidators })
      }else{

      const fr = new FileReader();
      // let preview: any = null;
      let sortInd: number = 2;
      let showPreview = false;
      let preview = URL.createObjectURL(file);
      fr.onload = () => {
        if (fileTypes.indexOf(file.type) !== -1) {
          showPreview = true;
          //   preview = fr.result!.toString();
          sortInd = 1;
          /*         setTakenPhoto({
          path: undefined,
          preview: preview,
          name: file.name,
        }); */
        }
        //  if (preview === undefined) preview = URL.createObjectURL(file);
        let attribute: Attachment = {
          fileName: file.name,
          fileSize: formatBytes(file.size),
          file: file,
          attType: "File",
          preview: preview,
          sortInd: sortInd,
          showPreview: showPreview,
          status: "Create",
        };
        updateAttachment(attribute);
        setPanel();
      };
      fr.readAsDataURL(file);
    }
  }
  };

  const attachHandler = (e: any) => {
    e.stopPropagation();
    openFilePicker();
  };

  const takePhotoHandler = async (e: any) => {
    if (!Capacitor.isPluginAvailable("Camera")) {
      openFilePicker();
      return;
    }

    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        allowEditing: true,
        quality: 80,
        width: 500,
      });

      if (!photo || !photo.webPath) {
        return;
      }

      setTakenPhoto({
        path: photo.path,
        preview: photo.webPath,
      });
      setPanel();
    } catch (error) {
      openFilePicker();
    }
  };

  const addImageHandler = async () => {
    const enteredFileName = fileNameRef.current?.value;
    if (
      !enteredFileName ||
      enteredFileName.toString().trim().length === 0 ||
      !takenPhoto
    ) {
      setFileError("Please Provide the File Name");
      return;
    }
    const fileName = enteredFileName + ".jpeg";

    //   const base64 = await base64FromPath(takenPhoto!.preview);

    /*     Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: FilesystemDirectory.Data,
    }); */
    //  let photoAtt: AttType = 'Photo' as const;
    let blob = await fetch(takenPhoto!.preview).then((r) => r.blob());
    if(blob.size > allowedFileSize){
      setFileError(`File Size ${blob.size} Greater than allowed File Size ${allowedFileSize} Bytes`);
      return;
    }

    let attribute: Attachment = {
      fileName: fileName,
      fileSize: formatBytes(blob.size),
      imageBlob: blob,
      attType: "Photo",
      preview: takenPhoto.preview,
      sortInd: 1,
      showPreview: true,
      status: "Create",
    };
    updateAttachment(attribute);
    setTakenPhoto(undefined);
    setPanel();
    console.log(attachments);
  };
  const openAttachment = async (attach: Attachment) => {
    console.log("open" + attach.id);
    console.log(_.find(attachments, ["id", attach.id]));
    if (attach.showPreview && isPlatform("desktop")) {
      setImgPreview(attach.preview);
      setImageEditor(attach);
    } else {
      await Browser.open({ url: attach.preview });
    }
  };

  const remove = (id: any) => {
    const updateAttachments = attachments.filter((att) => att.id !== id);
    setAttachments(updateAttachments);
  };

  const buildList = () => {
    let attachmentList: any = _.orderBy([...attachments], ["sortInd"], ["asc"]);
    console.log(attachmentList);
    return attachmentList.map((attachment: any, index: any) => {
      return (
        <IonCol key={"preview" + index} className="ion-text-center">
          <div id="wrapper" className='imgDiv' key={"div1" + index}>
            {attachment.showPreview && (
              <>
              <IonButton
                id="imageDelete"
                fill="clear"
                color="danger"
                className="deleteButton"
                onClick={() => remove(attachment.id)}
              >
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
              <img
                id="inner1"
                className="image-preview"
                src={attachment.preview}
                alt="preview"
              />
              </>
            )}
            <IonButton
              id="inner2"
              className="ion-text-center"
              fill="clear"
              onClick={() => openAttachment(attachment)}
            >
              {attachment.fileName}
            </IonButton>
          </div>
          <div key={"div2" + index}>
            {attachment.fileSize && (
              <IonLabel id="inner2" className="ion-text-center">
                Size : {attachment.fileSize}
              </IonLabel>
            )}
            {!attachment.showPreview && (
              <IonButton
                id="attButton"
                fill="clear"
                color="danger"
                className="deleteButton"
                onClick={() => remove(attachment.id)}
              >
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            )}
          </div>
        </IonCol>
      );
    });
  };

  const testUpload = () => {
    // call backend
    attachments.map(async (attachment) => {
      let formData = new FormData();
      if (attachment.file) {
        formData.append("picture", attachment.file, attachment.fileName);
      } else if (attachment.imageBlob) {
        formData.append("picture", attachment.imageBlob, attachment.fileName);
      }
      try {
        const response = await fetch("http://localhost:4000/picture", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <React.Fragment>
      {/*       <ImageEditorComp
        imgSrc={imgPreview}
        imgName={imgFileName}
        open={imgEditor}
        onSetModalState={() => setImageEditor(false)}
      /> */}
      <FilerobotImageEditor
        key="ImgEditor"
        show={!!imgEditor.id}
        src={imgPreview}
        onClose={() => setImageEditor(false)}
        onComplete={(props: any) => {
          props.canvas.toBlob((blob: any) => {
            const url = URL.createObjectURL(blob);
            let Imageattachments = [...attachments];
            let attchIndex = _.findIndex(Imageattachments, [
              "id",
              imgEditor.id,
            ]);
            let attachItem = { ...imgEditor };
            attachItem.file = undefined;
            attachItem.fileSize = formatBytes(blob.size);
            attachItem.attType = "EnrichImage";
            attachItem.imageBlob = blob;
            attachItem.preview = url;
            Imageattachments[attchIndex] = attachItem;
            setAttachments(Imageattachments);
          });
        }}
        onBeforeComplete={(props: any) => {
          return false;
        }}
      />
      <IonCard key="Attachments">
        <FormAccordion
          openPanel={false}
          accIndex="Attachments"
          expand={true}
          renderHeader={() => {
            return (
              <IonItem className="item-content" lines="none">
                <IonButton fill="clear" onClick={(e) => takePhotoHandler(e)}>
                  <IonIcon icon={camera} slot="start" />
                </IonButton>
                {!isPlatform("desktop") && (
                  <IonButton fill="clear" onClick={(e) => attachHandler(e)}>
                    <IonIcon icon={attachOutline} slot="start" />
                  </IonButton>
                )}
                {isPlatform("desktop") && (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <>
                        <p id='dragNdrop'>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                        {maxFilesAllowed && (
                          <small>
                          <em>
                            ({maxFilesAllowed} files are the maximum number of
                            files you can drop here)
                          </em>
                          </small>
                        )}
                      </>
                    )}
                  </div>
                )}
                <span
                  id="Attachments"
                  slot="end"
                  style={{ fontWeight: "bold" }}
                >
                  {" "}
                  {"Attachments "}{" "}
                </span>
              </IonItem>
            );
          }}
          renderPanel={() => {
            return (
              <IonCardContent>
                {fileError && (
                  <IonText color="danger" className="ion-padding-start">
                    <small>
                      <span role="alert" id="fileError">
                        {fileError}
                      </span>
                    </small>
                  </IonText>
                )}
                {fileRejections.length > 0 && (
                  <>
                    <h6>Rejected files</h6>
                    <ul>{fileRejectionItems()}</ul>
                  </>
                )}
                <IonGrid className="ion-no-padding">
                  <IonRow hidden={!!!takenPhoto}>
                    <IonCol className="ion-text-cener attachments">
                      <IonRow>
                        <IonCol className="ion-text-center ion-no-padding">
                          <div className="image-preview">
                            {!takenPhoto && <h3>no photo yet!</h3>}
                            {takenPhoto && (
                              <img src={takenPhoto.preview} alt="Preview" />
                            )}
                          </div>
                          <input
                            type="file"
                            hidden
                            ref={filePickerRef}
                            onChange={pickFileHandler}
                          />
                        </IonCol>
                        <IonCol className="ion-text-center">
                          <IonInput
                            name="fileName"
                            disabled={!!!takenPhoto?.preview}
                            type="text"
                            placeholder="Enter FileName"
                            value={takenPhoto?.name}
                            ref={fileNameRef}
                          />
                          <IonButton
                            fill="clear"
                            disabled={!!!takenPhoto?.preview}
                            onClick={addImageHandler}
                          >
                            <IonIcon icon={saveOutline} slot="start" />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                  <IonRow>{buildList()}</IonRow>
                </IonGrid>
                <IonButton onClick={testUpload}>Save</IonButton>
              </IonCardContent>
            );
          }}
        />
      </IonCard>
    </React.Fragment>
  );
};

export default FormAttachments;

/***
 * 
 * 
 * 
 
      <IonCard key="Attachments">
        <IonCardHeader className="ion-no-padding">
          <IonItem lines="none">
            <IonButton fill="clear" onClick={takePhotoHandler}>
              <IonIcon icon={camera} slot="start" />
            </IonButton>
            {!isPlatform("desktop") && (
              <IonButton fill="clear" onClick={attachHandler}>
                <IonIcon icon={attachOutline} slot="start" />
              </IonButton>
            )}
            <IonLabel slot="end" className="ion-text-end" id="Attachments">
              Attachments
            </IonLabel>
            {isPlatform("desktop") && (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            )}
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          {fileError && (
            <IonText color="danger" className="ion-padding-start">
              <small>
                <span role="alert" id="fileError">
                  {fileError}
                </span>
              </small>
            </IonText>
          )}
          <IonGrid className="ion-no-padding">
            <IonRow hidden={!!!takenPhoto}>
              <IonCol className="ion-text-cener attachments">
                <IonRow>
                  <IonCol className="ion-text-center ion-no-padding">
                    <div className="image-preview">
                      {!takenPhoto && <h3>no photo yet!</h3>}
                      {takenPhoto && (
                        <img src={takenPhoto.preview} alt="Preview" />
                      )}
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={pickFileHandler}
                    />
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonInput
                      name="fileName"
                      disabled={!!!takenPhoto?.preview}
                      type="text"
                      placeholder="Enter FileName"
                      value={takenPhoto?.name}
                      ref={fileNameRef}
                    />
                    <IonButton
                      fill="clear"
                      disabled={!!!takenPhoto?.preview}
                      onClick={addImageHandler}
                    >
                      <IonIcon icon={saveOutline} slot="start" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonRow>{buildList()}</IonRow>
          </IonGrid>
          <IonButton onClick={testUpload}>Save</IonButton>
        </IonCardContent>
      </IonCard>



 */
