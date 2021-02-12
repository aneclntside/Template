import { Control } from "react-hook-form";

export interface FieldProps {
  ind?:any;
  type?:string;
  name: string;
  label?: string;
  defaultValue?:any;
  attributes?: {};
  rules?: {};
  options?:any;
  rangeMin?:number;
  rangeMax?:number;
  watchAttributeName?:string;
}

export interface IngressProps {
    ind?:any;
    type?:string;
    name: string;
    control?: Control;
    label?: string;
    defaultValue?:any;
    attributes?: {};
    rules?: {};
    errors?: any;
    options?:any;
    rangeMin?:number;
    rangeMax?:number;
    groupName?: string;
    item?: any;
    index?:any;
    group?:string;
    watchAttributeName?:string;
   // onInput?: (event:any) => void;
  }

  export type  Group = {
    groupName: string;
    groupMultiple: boolean;       // field Array
    groupExpand?:boolean;          // expand the panel by default - true
    groupWatch?:{                  // watch and remove the group based on attribute value
      attName: string;  
      attVal: string;
    }
    groupAttributes:IngressProps[]
  };

  export type Item = {
/*     type: string,
    groupName: string,
    name: string,
    label: boolean,
    labelName?:string,
    labelValue?:string,
    editable?:boolean,
    mobileHide: boolean */
    type: string,
    groupName: string, // for array objects
    name: string,
    label: string,
    labelValue: string,
    editable:boolean
  }

  export type ItemList = {
    itemExpand: boolean,
    firstColumn:  Item[],
    secondColumn: Item[],
    thirdColumn:  Item[],
    fourthColumn: Item[],
  } 

  export interface FormProps {
    Header:Group[],
    Item?:Group[],
    ItemList?: ItemList,
    watchList?:string[]
  }

  export interface DefaultValues {
    uniqueName:string;
    Header:{},
    Item:{}
  }