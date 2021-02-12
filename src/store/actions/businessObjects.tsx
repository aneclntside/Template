import * as actionType from "./actionTypes";

export const businessObjectsInit = () => {
    return {
      type: actionType.BO_INIT
    };
  };

  export const addBusinessObject = (payload:any, token:any) => {
      return {
        type: actionType.ADD_BO,
        payload: payload,
        token: token
      };
    };

    export const addBusinessObjectSuccess = (payload:any) => {
        return {
          type: actionType.ADD_BO_SUCESS,
          payload: payload,
        };
      };

      export const addBusinessObjectFail = (error:any) => {
        return {
          type: actionType.ADD_BO_FAIL,
          payload: error,
        };
      };  
    
      
      export const editBusinessObject = (payload:any, token:any) => {
          return {
            type: actionType.EDIT_BO,
            payload: payload,
            token: token
          };
        };
    
        export const editBusinessObjectSuccess = (payload:any) => {
            return {
              type: actionType.EDIT_BO_SUCESS,
              payload: payload,
            };
          };
    
          export const editBusinessObjectFail = (error:any) => {
            return {
              type: actionType.EDIT_BO_FAIL,
              payload: error,
            };
          };      
          
          
          export const deleteBusinessObject = (id:any, token:any) => {
            return {
              type: actionType.DELETE_BO,
              id: id,
              token: token
            };
          };
      
          export const deleteBusinessObjectSuccess = (id:any) => {
              return {
                type: actionType.DELETE_BO_SUCESS,
                id: id,
              };
            };
      
            export const deleteBusinessObjectFail = (error:any) => {
              return {
                type: actionType.DELETE_BO_FAIL,
                payload: error,
              };
            }; 

          export const getBusinessObject = (token:any) => {
            return {
              type: actionType.GET_BO,
              token: token
            };
          };

          export const getBusinessObjectStart = () => {
            return {
              type: actionType.GET_BO_START
            };
          };            
      
          export const getBusinessObjectSuccess = (businessObject:any) => {
              return {
                type: actionType.GET_BO_SUCESS,
                payload: businessObject,
              };
            };
      
            export const getBusinessObjectFail = (error:any) => {
              return {
                type: actionType.GET_BO_FAIL,
                payload: error,
              };
            };            





