import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react"
import React from "react"

interface Props {
  numCorrect: number
  numIncorrect: number
  onStartButtonClick: () => void
}

const FinishScreen: React.FC<Props> = ({ numCorrect, numIncorrect, onStartButtonClick }) => {
  const percentCorrect = Math.floor((100 * numCorrect) / (numCorrect + numIncorrect || 1))

  return (
    <React.Fragment>
      <IonCard>
        <IonCardHeader>
          {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          <IonCardTitle>Summary</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {/* <IonList inset={true} lines="inset">
            <IonItem color="medium">
              <IonLabel>
                <strong>Correct</strong>
              </IonLabel>
              <IonLabel color="success" slot="end">
                {numCorrect}
              </IonLabel>
            </IonItem>
            <IonItem color="medium">
              <IonLabel>
                <strong>Incorrect</strong>
              </IonLabel>
              <IonLabel color="success" slot="end">
                {numIncorrect}
              </IonLabel>
            </IonItem>
          </IonList> */}

          <ul className="ion-no-margin">
            <li className="success">
              <strong>{numCorrect} Correct</strong>
            </li>
            <li className="failure">
              <strong>{numIncorrect} Incorrect</strong>
            </li>
          </ul>
          <IonCardTitle color="dark" className="ion-text-center ion-padding-top">
            {percentCorrect}% correct{percentCorrect > 50 && "!"}
          </IonCardTitle>
          <IonCardTitle color="dark" className="ion-text-center ion-padding-top">
            {percentCorrect <= 50 ? "頑張れ!" : "よく出来ました!"}
          </IonCardTitle>
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
