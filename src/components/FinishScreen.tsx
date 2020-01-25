import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react"
import React from "react"

interface Props {
  onStartButtonClick: () => void
}

const FinishScreen: React.FC<Props> = ({ onStartButtonClick }) => {
  return (
    <React.Fragment>
      <IonCard>
        <IonCardHeader>
          {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          <IonCardTitle>Summary</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <ul className="ion-no-margin">
            <li className="success">
              <strong>XX Correct</strong>
            </li>
            <li className="failure">
              <strong>XX Incorrect</strong>
            </li>
          </ul>
        </IonCardContent>
      </IonCard>
      <IonButton
        strong={true}
        className="ion-margin"
        fill="solid"
        size="large"
        expand="block"
        onClick={onStartButtonClick}
      >
        Take Quiz Again
      </IonButton>
    </React.Fragment>
  )
}

export default FinishScreen
