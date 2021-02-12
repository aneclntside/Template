import * as actionType from "./actionTypes";

export const attributesInit = () => {
    return {
      type: actionType.ATTRIBUTE_INIT
    };
  };

  export const addAttribute = (payload:any, token:any) => {
      return {
        type: actionType.ADD_ATTRIBUTE,
        payload: payload,
        token: token
      };
    };

    export const addAttributeSuccess = (payload:any) => {
        return {
          type: actionType.ADD_ATTRIBUTE_SUCESS,
          payload: payload,
        };
      };

      export const addAttributeFail = (error:any) => {
        return {
          type: actionType.ADD_ATTRIBUTE_FAIL,
          payload: error,
        };
      };  
    
      
      export const editAttribute = (payload:any, token:any) => {
          return {
            type: actionType.EDIT_ATTRIBUTE,
            payload: payload,
            token: token
          };
        };
    
        export const editAttributeSuccess = (payload:any) => {
            return {
              type: actionType.EDIT_ATTRIBUTE_SUCESS,
              payload: payload,
            };
          };
    
          export const editAttributeFail = (error:any) => {
            return {
              type: actionType.EDIT_ATTRIBUTE_FAIL,
              payload: error,
            };
          };      
          
          
          export const deleteAttribute = (id:any, token:any) => {
            return {
              type: actionType.DELETE_ATTRIBUTE,
              id: id,
              token: token
            };
          };
      
          export const deleteAttributeSuccess = (id:any) => {
              return {
                type: actionType.DELETE_ATTRIBUTE_SUCESS,
                id: id,
              };
            };
      
            export const deleteAttributeFail = (error:any) => {
              return {
                type: actionType.DELETE_ATTRIBUTE_FAIL,
                payload: error,
              };
            }; 

          export const getAttribute = (token:any) => {
            return {
              type: actionType.GET_ATTRIBUTE,
              token: token
            };
          };

          export const getAttributeStart = () => {
            return {
              type: actionType.GET_ATTRIBUTE_START
            };
          };            
      
          export const getAttributeSuccess = (attributes:any) => {
              return {
                type: actionType.GET_ATTRIBUTE_SUCESS,
                payload: attributes,
              };
            };
      
            export const getAttributeFail = (error:any) => {
              return {
                type: actionType.GET_ATTRIBUTE_FAIL,
                payload: error,
              };
            };            





