import React, { useState } from "react";
import {
  IonHeader,
  IonContent,
  IonText,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import * as globalStructre from "../../components/UI/Components/Content";
import Modal from "../../components/UI/Modal/Modal";
import DynamicForm from "../../components/UI/Form/DynamicForm";
import DynTest from "../../components/UI/Form/DynTest";

const myFormFields: globalStructre.FormProps = {
  Header: [
    {
      groupName: "Purchasing",
      groupMultiple: false,
      groupExpand: true,
      groupAttributes: [
        {
          type: "Input",
          name: "email",
          attributes: { type: "email", maxlength: 16 },
          label: "Email",
        },
        {
          type: "Input",
          name: "fullName",
          attributes: { type: "text", maxlength: 26 }, //properties
          label: "Full Name",
          rules: {
            minLength: {
              value: 6,
              message: "Minimum Length is 6 characters",
            },
            required: true,
          },
        },
        {
          type: "Input",
          name: "password",
          attributes: { type: "password", maxlength: 6 },
          label: "Password",
          rules: { required: true },
        },
        {
          type: "Select",
          name: "gender",
          attributes: {},
          label: "Gender",
          rules: { required: true },
          options: {
            default: ["Male", "Female"],
          },
        },
        {
          type: "Select",
          name: "country",
          attributes: {},
          label: "Country",
          rules: { required: true },
          options: {
            default: ["US", "India"],
            Male: ["UK", "US", "India"],
            Female: ["CA", "SA"],
          },
          watchAttributeName: "gender",
        },
        {
          type: "Textarea",
          name: "description",
          attributes: { type: "text", maxlength: 26 }, //properties
          label: "Description",
          rules: { required: true },
        },
        {
          type: "Toggle",
          name: "agree",
          attributes: { required: true }, //properties
          label: "Agree",
          rules: { required: true },
        },
        {
          type: "Date",
          name: "mydate",
          attributes: {}, //properties
          label: "Date",
          rules: {},
        },
        {
          type: "Radio",
          name: "radio",
          attributes: {},
          label: "Manufacturers",
          rules: { required: true },
          options: {
            default: ["Apple", "Microsoft"],
          },
        },
        {
          type: "Range",
          name: "range",
          attributes: {}, //properties
          label: "Range",
          rules: {},
          rangeMin: -200,
          rangeMax: 200,
        },
        {
          type: "Checkbox",
          name: "check",
          attributes: { required: true }, //properties
          label: "Check",
          rules: { required: true },
        },
      ],
    },
    {
      groupName: "Pricing",
      groupMultiple: true,
      groupAttributes: [
        {
          type: "Date",
          name: "priceStartDate",
          attributes: { required: true }, //properties
          label: "Start Date",
          rules: { required: true },
        },
        {
          type: "Date",
          name: "priceEndDate",
          attributes: {}, //properties
          label: "End Date",
          rules: { required: true },
        },
        {
          type: "Input",
          name: "price",
          attributes: { type: "number", maxlength: 6 },
          label: "Price",
          rules: { required: true },
        },
      ],
    },
    {
      groupName: "Testing",
      groupMultiple: true,
      groupAttributes: [
        {
          type: "Input",
          name: "Test1",
          attributes: { required: true }, //properties
          label: "Start Date",
          rules: { required: true },
        },
        {
          type: "Input",
          name: "Test2",
          attributes: {}, //properties
          label: "End Date",
          rules: { required: true },
        },
        {
          type: "Input",
          name: "price",
          attributes: { type: "number", maxlength: 6 },
          label: "Price",
          rules: { required: true },
        },
      ],
    },
    {
      groupName: "Testing2",
      groupMultiple: false,
      groupWatch: {
        attName: "country",
        attVal: "SA"
      },
      groupAttributes: [
        {
          type: "Input",
          name: "Testing2fullName",
          attributes: { type: "text", maxlength: 26, required: true }, //properties
          label: "Full Name",
          rules: {},
        },
        {
          type: "Input",
          name: "Testing2password",
          attributes: { type: "password", maxlength: 6 },
          label: "Password",
          rules: { required: true },
        },
        {
          type: "Select",
          name: "Testing2gender",
          attributes: {},
          label: "Gender",
          rules: { required: true },
          options: {
            default: ["Male", "Female"],
          },
        },
        {
          type: "Textarea",
          name: "Testing2description",
          attributes: { type: "text", maxlength: 26, required: true }, //properties
          label: "Description",
          rules: { required: true },
        },
      ],
    },
    {
      groupName: "Attachments",
      groupMultiple: false,
      groupAttributes: [],
    },
  ],
  Item: [
    {
      groupName: "General",
      groupMultiple: false,
      groupExpand: true,
      groupAttributes: [
        {
          type: "Input",
          name: "itemEmail",
          attributes: { type: "email", maxlength: 16 },
          label: "Email",
        },
        {
          type: "Input",
          name: "itemFullName",
          attributes: { type: "text", maxlength: 26, required: true }, //properties
          label: "Full Name",
          rules: {},
        },
        {
          type: "Input",
          name: "itemLastName",
          attributes: { type: "text", maxlength: 26, required: true }, //properties
          label: "Last Name",
          rules: {},
        },
        {
          type: "Input",
          name: "itemPassword",
          attributes: { type: "password", maxlength: 6 },
          label: "Password",
          rules: { required: true },
        },
        {
          type: "Select",
          name: "itemGender",
          attributes: {},
          label: "Gender",
          rules: { required: true },
          options: {
            default: ["Male", "Female"],
          },
        },
        {
          type: "Textarea",
          name: "itemDescription",
          attributes: { type: "text", maxlength: 26, required: true }, //properties
          label: "Description",
          rules: { required: true },
        },
        {
          type: "Toggle",
          name: "itemAgree",
          attributes: {}, //properties
          label: "Agree",
          rules: {},
        },
        {
          type: "Date",
          name: "itemdate",
          attributes: {}, //properties
          label: "Date",
          rules: {},
        },
        {
          type: "Radio",
          name: "itemRadio",
          attributes: {},
          label: "Manufacturers",
          rules: { required: true },
          options: {
            default: ["Apple", "Microsoft"],
          },
        },
        {
          type: "Range",
          name: "itemRange",
          attributes: {}, //properties
          label: "Range",
          rules: {},
          rangeMin: -200,
          rangeMax: 200,
        },
        {
          type: "Checkbox",
          name: "itemCheck",
          attributes: {}, //properties
          label: "Check",
          rules: {},
        },
      ],
    },
    {
      groupName: "Cost",
      groupMultiple: true,
      groupAttributes: [
        {
          type: "Date",
          name: "costStartDate",
          attributes: { required: true }, //properties
          label: "Start Date",
          rules: { required: true },
        },
        {
          type: "Date",
          name: "costEndDate",
          attributes: {}, //properties
          label: "End Date",
          rules: { required: true },
        },
        {
          type: "Input",
          name: "costPrice",
          attributes: { type: "number", maxlength: 6 },
          label: "Price",
          rules: { required: true },
        },
      ],
    },
  ],
  ItemList: {
    itemExpand: true,
    firstColumn: [
      {
        type: "Image",
        groupName: "",
        name: "productImage",
        label: "",
        labelValue: "",
        editable: false,
      },
    ],
    secondColumn: [
      {
        type: "Field",
        groupName: "",
        name: "itemDescription",
        label: "",
        labelValue: "",
        editable: false,
      },
      {
        type: "Field",
        groupName: "",
        name: "itemFullName",
        label: "",
        labelValue: "",
        editable: false,
      },
      {
        type: "Field",
        groupName: "",
        name: "itemLastName",
        label: "",
        labelValue: "",
        editable: false,
      },
    ],
    thirdColumn: [
      {
        type: "Field",
        groupName: "",
        name: "itemGender",
        label: "Gender",
        labelValue: "",
        editable: false,
      },
      {
        type: "Field",
        groupName: "",
        name: "itemPassword",
        label: "",
        labelValue: "",
        editable: false,
      },
    ],
    fourthColumn: [
      {
        type: "Field",
        groupName: "",
        name: "productImage",
        label: "",
        labelValue: "",
        editable: false,
      },
      {
        type: "Field",
        groupName: "Cost",
        name: "costPrice",
        label: "Price",
        labelValue: "",
        editable: true,
      },
      /*       {
        type: "Field",
        groupName:"", // for array objects
        name: "productImage",
        label: "",
        labelValue: "20 USD",
        editable:false
      } */
    ],
  },
  watchList: ["country"],
};

//radiobuttons, toggle, checkbox, range should have a default value set. always set some default value for all the input fields
const initialValues = {
  uniqueName: "PR123456",
  Header: {
    email: "test@gmail.com",
    fullName: "",
    password: "123456",
    range: "50",
    mydate: "2021-01-05",
    agree: false,
    gender: "Female",
    country: "SA",
    Pricing: [
      {
        priceStartDate: "2021-01-05T12:09:01.471-06:00",
        priceEndDate: "2021-01-05T12:09:01.472-06:00",
        price: "10",
      },
      {
        priceStartDate: "2021-01-05T12:09:01.471-06:00",
        priceEndDate: "2021-01-05T12:09:01.472-06:00",
        price: "20",
      },
    ],
    Testing2fullName: "Testing2fullName",
    Testing2password: "Testing2password",
    Testing2description: "Testing2password",
  },
  Item: [
    {
      id: 1,
      itemDescription: "Item Descriptoin",
      itemFullName: "Item Test 1",
      itemLastName: "item last anme",
      itemGender: "Male",
      itemPassword: "123456",
      itemAgree: false,
      itemRadio: "Apple",
      Cost: [
        {
          costStartDate: "2021-01-05T12:09:01.471-06:00",
          costEndDate: "2021-01-05T12:09:01.472-06:00",
          //costPrice: "10",
        },
      ],
    },
    {
      id: 2,
      itemDescription: "Item Descriptoin",
      itemFullName: "Item Test 2",
      itemLastName: "item last anme",
      itemGender: "Male",
      itemPassword: "123456",
    },
    {
      itemDescription: "Item Descriptoin",
      itemFullName: "Item Test 2",
      itemLastName: "item last anme",
      itemGender: "Male",
      itemPassword: "123456",
    },
  ],
};

const setData = (data: any) => {
  console.log("inside Product Data");
  console.log(data);
};

const Products: React.FC = () => {
  const [closeModal, setCloseModal] = useState(false);
  const setMyState = (data: any) => {
    console.log(data);
    setCloseModal(false);
  };

  return (
    <DynamicForm
      header={myFormFields.Header}
      items={myFormFields.Item}
      itemList={myFormFields.ItemList}
      watchList={myFormFields.watchList}
      uniqueName={initialValues.uniqueName}
      defaultValues={initialValues.Header}
      defaultValuesItem={initialValues.Item}
      operation="edit"
      menu={true}
      validate={true}
      title="Product"
      onSubmit={(data: any) => setData(data)}
    />
  );
};
export default Products;

{
  /* 
    <React.Fragment>
    <Modal
      open={closeModal}
      formFields={myFormFields}
      defaultFieldValues={initialValues}
      operation="edit"
      title="Product"
      onSubmit={(data: any) => setData(data)}
      onSetCallingState={(data:any) => setMyState(data)}
    />
    <IonButton onClick={() => setCloseModal(true)} />
    </React.Fragment> 
*/
}
/**
 * 
 * 
 *     <Form
      formFields={myFormFields}
      defaultFieldValues={initialValues}
      edit
      operation="edit"
      menu={true}
      title="Product"
      onSubmit={(data: any) => setData(data)}
    />
 */
