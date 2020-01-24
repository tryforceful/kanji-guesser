import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel
} from "@ionic/react"
import { pin, walk, warning, wifi, wine } from "ionicons/icons"
import React from "react"

interface Props {
  onStartButtonClick: () => void
}

const StartScreen: React.FC<Props> = ({ onStartButtonClick }) => {
  return (
    <React.Fragment>
      <IonButton
        strong={true}
        fill="solid"
        size="large"
        expand="block"
        onClick={onStartButtonClick}
      >
        Start Quiz
      </IonButton>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain
          or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonItem>
          <IonIcon icon={pin} slot="start" />
          <IonLabel>ion-item in a card, icon left, button right</IonLabel>
          <IonButton fill="outline" slot="end">
            View
          </IonButton>
        </IonItem>

        <IonCardContent>
          This is content, without any paragraph or header tags, within an ion-cardContent element.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonItem href="#" class="activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Card Link Item 1 .activated</IonLabel>
        </IonItem>

        <IonItem href="#">
          <IonIcon icon={wine} slot="start" />
          <IonLabel>Card Link Item 2</IonLabel>
        </IonItem>

        <IonItem class="activated">
          <IonIcon icon={warning} slot="start" />
          <IonLabel>Card Button Item 1 .activated</IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon icon={walk} slot="start" />
          <IonLabel>Card Button Item 2</IonLabel>
        </IonItem>
      </IonCard>
    </React.Fragment>
  )
}

export default StartScreen
