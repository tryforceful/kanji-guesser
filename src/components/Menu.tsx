import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { AppPage } from "../declarations"

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[]
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => (
  <IonMenu contentId="main" type="push">
    <IonHeader className="slide-menu-header">
      <IonToolbar color="tertiary">
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonHeader collapse="condense">
        {/* somehow this is only used in ios I think? */}
        <IonToolbar color="tertiary">
          <IonTitle size="large">Menu</IonTitle>
        </IonToolbar>
        {/* <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar> */}
      </IonHeader>
      <IonList>
        {appPages.map((appPage, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem routerLink={appPage.url} routerDirection="none">
                <IonIcon slot="start" icon={appPage.icon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )
        })}
      </IonList>
    </IonContent>
  </IonMenu>
)

export default withRouter(Menu)
