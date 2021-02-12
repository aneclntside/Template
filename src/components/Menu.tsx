import React from 'react';
import { IonContent,IonIcon,IonItem,IonLabel,IonList,
         IonListHeader,IonMenu,IonMenuToggle,IonNote,} from '@ionic/react';
import { useLocation, withRouter } from 'react-router-dom';
import { archiveOutline, archiveSharp, linkSharp, linkOutline, heartOutline, heartSharp, 
         mailOutline, mailSharp, trashOutline, trashSharp, documentsOutline, documentSharp, 
         personOutline, personSharp, helpOutline, helpSharp, logOutOutline, logOutSharp, logInOutline, 
         logInSharp, personAddOutline, personAddSharp, moonOutline, hammerOutline, hammerSharp, 
         moonSharp } from 'ionicons/icons';
import './Menu.css';

interface Pages {
  title: string,
  url: string,
  iosIcon: string,
  mdIcon: string,
  routerDirection?: string
};

interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
};

const routes = {
  appPages: [
    { title: 'Product Categories', url: '/productcategories', iosIcon: mailOutline, mdIcon: mailSharp },
    { title: 'Products', url: '/products', iosIcon: documentsOutline, mdIcon: documentSharp },
    { title: 'Attributes', url: '/pim/attributes', iosIcon: heartOutline, mdIcon: heartSharp },
    { title: 'Catalogs', url: '/catalogs', iosIcon: heartOutline, mdIcon: heartSharp },
    { title: 'Versions', url: '/versions', iosIcon: heartOutline, mdIcon: heartSharp },
    { title: 'Relations', url: '/relations', iosIcon: heartOutline, mdIcon: heartSharp },
    { title: 'Related Products', url: '/relatedproducts', iosIcon: linkOutline, mdIcon: linkSharp },
    { title: 'Favorites', url: '/favorites', iosIcon: heartOutline, mdIcon: heartSharp },
    { title: 'Archived', url: '/archived', iosIcon: archiveOutline, mdIcon: archiveSharp },
    { title: 'Trash', url: '/trash', iosIcon: trashOutline, mdIcon: trashSharp }
  ],
  loggedInPages: [
    { title: 'Account', url: '/account', iosIcon: personOutline, mdIcon: personSharp },
    { title: 'Support', url: '/support', iosIcon: helpOutline, mdIcon: helpSharp },
    { title: 'Logout', url: '/logout', iosIcon: logOutOutline, mdIcon: logOutSharp }
  ],
  loggedOutPages: [
    { title: 'Login', url: '/login', iosIcon: logInOutline, mdIcon: logInSharp },
    { title: 'Support', url: '/support', iosIcon: helpOutline, mdIcon: helpSharp },
    { title: 'Signup', url: '/signup', iosIcon: personAddOutline, mdIcon: personAddSharp  }
  ]
};


const Menu: React.FC = () => {
  const location = useLocation();

  const isAuthenticated = false; // testing purpose

  const renderlistItems  = (list: Pages[]) => {
    return list
      .filter(route => !!route.url)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.url} routerDirection="none" className={location.pathname.startsWith(p.url) ? 'selected' : undefined}>
            <IonIcon slot="start" ios={p.iosIcon} md={p.mdIcon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  };

  return (
    // <IonMenu  type="overlay" disabled={!menuEnabled} contentId="main">
    <IonMenu  type="overlay" disabled={false} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
        <IonListHeader>PIM</IonListHeader>
          <IonNote>poweredBy@ionicframework.com</IonNote>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
          <IonItem>
            <IonIcon slot="start" ios={moonOutline} md={moonSharp} />
            <IonLabel>Dark Mode</IonLabel>
            {/* <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} /> */}
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem button onClick={() => {
           // history.push('/tutorial');
          }}>
            <IonIcon slot="start" ios={hammerOutline} md={hammerSharp} />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>


/*      <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>PIM</IonListHeader>
          <IonNote>poweredBy@ionicframework.com</IonNote>
          {routes.appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>  */
  );
};

export default withRouter(Menu);



