import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react"
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
          <IonList inset={true} lines="inset">
            <IonItem color="success">
              <IonLabel>
                <strong>{numCorrect} Correct</strong>
              </IonLabel>
            </IonItem>
            <IonItem color="danger">
              <IonLabel>
                <strong>{numIncorrect} Incorrect</strong>
              </IonLabel>
            </IonItem>
          </IonList>

          {/* <ul className="ion-no-margin">
            <li className="success">
              <strong>{numCorrect} Correct</strong>
            </li>
            <li className="failure">
              <strong>{numIncorrect} Incorrect</strong>
            </li>
          </ul> */}
          <IonCardTitle color="dark" className="ion-padding-top">
            {percentCorrect}% correct! {percentCorrect <= 50 ? "頑張れ!" : "よく出来ました!"}
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
