export interface OPTIONS {
  value: String;
  displayValue: String;
};

export interface Props {
  attributes:[],
  addAttribute:boolean,
  history:any | null,
  updateAttributeScreen: (reset:boolean) => void;
  onAddAttribute: (attDetails:any) => void;
  onEditAttribute: (attDetails:any) => void;
  error:boolean,
  submitted:string,

}

export interface BOAddProps {
  businessObjects:[],
  addBO:boolean,
  history:any | null,
  updateBOScreen: (reset:boolean) => void;
  onAddBO: (boDetails:any) => void;
  onEditBO: (boDetails:any) => void;
  error:boolean,
  submitted:string,

}

export interface AttributeProps {
  attributes:any,
  loading:boolean,
  error:boolean,
  submitted:string,
  onGetAttributes: (token:any) => void;
  onDeleteAttribute: (id:string,token:any) => void;
  onInitAttribute:() =>void;
}

export interface BOProps {
  businessObjects:any,
  loading:boolean,
  error:boolean,
  submitted:string,
  onGetBusinessObjects: (token:any) => void;
  onDeleteBusinessObject: (id:string,token:any) => void;
  onInitBusinessObject:() =>void;
}

export interface elementConfig {
  string: { type: string, value: string }
}

export interface intialState {
  attributes: [
    
/*       'businessObject': {
      groupName: [
        {
          attName: string,
          attValue: string,
          touched: string,
          elementType: string,
          elementConfig: {},
          validation: {
            unique: string
          }
  
        }
      ]
  } */
]
};

export interface BO_STRUCTURES {
    [boName: string]: any,
    headerGroups: string[],
    itemGroups:string[]
}

export const BO_STRUCTURE = {
  boName: '',
  headerGroups: [],
  itemGroups:[]
}

export interface FIELD_STRUCTURES {
  [attName: string]: any,
  businessObjects: string[],
  groupName: string,
  groupLevel:string,
  attValue: string,
  touched: boolean,
  elementType: string,
  elementConfigsTemp:{},
  elementConfigs: {fieldName:any, fieldValue:any}[],
  validations: {}[]

}

export const FIELD_STRUCTURE = {
  attName: '',
  businessObjects: [],
  groupName: '',
  groupLevel: '',
  attValue: '',
  touched: false,
  elementType: '',
  elementConfigsTemp:{},
  elementConfigs: [],
  validations: []

};

export const DYNAMIC_BO = {
  Item: "Items",
  Article:"Artilce"
}

export const DYNAMIC_FIELDS = {
  Input: {
    name: { type: "input", value: "" },
    placeholder: { type: "input", value: "" },
    pattern: { type: "input", value: "" },
    max: { type: "input", value: "" },
    maxlength: { type: "input", value: "" },
    min: { type: "input", value: "" },
    minlength: { type: "input", value: "" },
    type: {
      type: "select",
      values: [
        { value: "date", displayValue: "date" },
        { value: "datetime-local", displayValue: "datetime-local" },
        { value: "email", displayValue: "email" },
        { value: "month", displayValue: "month" },
        { value: "number", displayValue: "number" },
        { value: "password", displayValue: "password" },
        { value: "search", displayValue: "search" },
        { value: "tel", displayValue: "tel" },
        { value: "text", displayValue: "text" },
        { value: "time", displayValue: "time" },
        { value: "url", displayValue: "url" },
        { value: "week", displayValue: "week" },
      ],
    },
    autocapitalize: { type: "checkbox", value: "false" },
    autocomplete: { type: "checkbox", value: "false" },
    autocorrect: { type: "checkbox", value: "false" },
    autofocus: { type: "checkbox", value: "false" },
    clearInput: { type: "checkbox", value: "false" },
    disabled: { type: "checkbox", value: "false" },
    readonly: { type: "checkbox", value: "false" },
    required: { type: "checkbox", value: "false" },
  },
  TextArea: {
    name: { type: "input", value: "" },
    placeholder: { type: "input", value: "" },
    cols: { type: "input", value: "" },
    rows: { type: "input", value: "" },
    maxlength: { type: "input", value: "" },
    minlength: { type: "input", value: "" },
    inputmode: {
      type: "select",
      values: [
        { value: "decimal", displayValue: "decimal" },
        { value: "email", displayValue: "email" },
        { value: "none", displayValue: "none" },
        { value: "numeric", displayValue: "numeric" },
        { value: "search", displayValue: "search" },
        { value: "tel", displayValue: "tel" },
        { value: "text", displayValue: "text" },
        { value: "url", displayValue: "url" },
        { value: "undefined", displayValue: "undefined" },
      ],
    },
    wrap: {
      type: "select",
      values: [
        { value: "hard", displayValue: "hard" },
        { value: "off", displayValue: "off" },
        { value: "soft", displayValue: "soft" },
        { value: "undefined", displayValue: "undefined" },
      ],
    },
    required: { type: "checkbox", value: "false" },
    readonly: { type: "checkbox", value: "false" },
    spellcheck: { type: "checkbox", value: "false" },
    autoGrow: { type: "checkbox", value: "false" },
    autocapitalize: { type: "checkbox", value: "false" },
    autofocus: { type: "checkbox", value: "false" },
    disabled: { type: "checkbox", value: "false" },
  },
  Radiobutton: {
    disabled: { type: "checkbox", value: "false" },
    radioGroup: { type: "input", value: "" },
  },
  Select: {
    placeholder: { type: "input", value: "" },
    values: { type: "input", value: "" },
    multiple: { type: "checkbox", value: "false" },
    disabled: { type: "checkbox", value: "false" },
  },
  DateTime: {
    displayFormat:{type: "input", value:""},
    pickerFormat:{type: "input", value:""}
  }
};


/* 


export interface objectType {
  type: String;
  value: String; 
}*/