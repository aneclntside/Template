import React, {Suspense} from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Switch, Redirect } from "react-router-dom";
import { list, business } from "ionicons/icons";
import Attributes from "../Attributes/Attributes";
import BusinessObject from "../BusinessObjects/BusinessObject";
import AddAttributes from "../Attributes/AddAttributes";
import BusinessObjectAdd from "../BusinessObjects/BusinessObjectAdd";

//const BusinessObjects = React.lazy(() => import('../BusinessObjects/BusinessObjects'));

const AttributeBOTab: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
      <Redirect  exact path="/pim" to="/pim/attributes" />
          <Switch>
          <Route path="/pim/attributes" render={() => <Attributes />} exact={true}/>
          <Route path="/pim/businessobjects" render={() => <BusinessObject />} exact={true}/>
          <Route path="/pim/businessobjects/addbusinessobject" component={BusinessObjectAdd} exact={true} />
          <Route path="/pim/attributes/addattributes" component={AddAttributes} exact={true}/>
          </Switch>
                   
{/*           <Route path="/pim/BusinessObjects" exact 
            render = {() => (<Suspense fallback={<div>Loading...</div>}><Attributes /></Suspense>)}
          /> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="attributes" href="/pim/attributes" className="align-item-left">
          <IonIcon icon={list} />
          <IonLabel>Attributes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="businessobjects" href="/pim/businessobjects">
          <IonIcon icon={business} />
          <IonLabel>Business Objects</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AttributeBOTab;
