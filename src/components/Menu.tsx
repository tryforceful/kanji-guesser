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
  IonToggle,
  IonToolbar
} from "@ionic/react"
import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { AppPage } from "../declarations"

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[]
}

function toggleDarkMode(e: CustomEvent) {
  document.body.classList.toggle("dark", e.detail.checked)
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => (
  <IonMenu contentId="main" type="overlay">
    <IonHeader color="tertiary">
      <IonToolbar color="tertiary">
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonHeader collapse="condense">
        {/* somehow this is only used in ios I think? */}
        <IonToolbar color="tertiary">
          <IonTitle size="large">Settings</IonTitle>
        </IonToolbar>
        {/* <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar> */}
      </IonHeader>
      <IonList>
        <IonItem lines="full">
          <IonIcon slot="start" name="moon"></IonIcon>
          <IonLabel>Toggle Dark Theme</IonLabel>
          <IonToggle id="themeToggle" slot="end" onIonChange={e => toggleDarkMode(e)}></IonToggle>
        </IonItem>
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
