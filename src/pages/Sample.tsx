import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/react"
import React from "react"

const HeaderExample: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>My Navigation Bar</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonTitle>Subheader</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Navigation Bar</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*-- Default Label --*/}
        <IonLabel>Label</IonLabel>
        <br />
        {/*-- Label Colors --*/}
        <IonLabel color="primary">Primary Label</IonLabel>
        <br />
        <IonLabel color="secondary">Secondary Label</IonLabel>
        <br />
        <IonLabel color="danger">Danger Label</IonLabel>
        <br />
        <IonLabel color="light">Light Label</IonLabel>
        <br />
        <IonLabel color="dark">Dark Label</IonLabel>
        <br />
        {/*-- Item Labels --*/}
        <IonItem>
          <IonLabel>Default Item</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-text-wrap">
            Multi-line text that should wrap when it is too long to fit on one line in the item.
          </IonLabel>
        </IonItem>
        {/*-- Input Labels --*/}
        <IonItem>
          <IonLabel>Default Input</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Fixed</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Floating</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Stacked</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Toggle</IonLabel>
          <IonToggle slot="end" checked></IonToggle>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="start" checked />
          <IonLabel>Checkbox</IonLabel>
        </IonItem>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        Hello
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        Hello
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        Hello
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        Hello
      </IonContent>
    </IonPage>
  )
}

export default HeaderExample
