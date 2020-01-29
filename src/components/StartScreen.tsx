import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react"
import React from "react"
import { QuizData } from "../data/QuizData"

interface Props {
  onStartButtonClick: () => void
}

const StartScreen: React.FC<Props> = ({ onStartButtonClick }) => {
  return (
    <React.Fragment>
      <IonCard className="welcome-card">
        <IonCardHeader>
          <IonCardTitle color="dark" class="ion-text-center">
            Kanji Guesser
          </IonCardTitle>
        </IonCardHeader>
        <img src="/assets/gothic_guess_kanji.svg" alt="" />
      </IonCard>

      <IonCard>
        <IonCardHeader>
          {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          <IonCardTitle>Up Next:</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <ul className="ion-no-margin">
            <li>{QuizData.length} Words</li>
          </ul>
        </IonCardContent>
      </IonCard>
      <IonButton
        strong={true}
        className="ion-margin start-button"
        fill="solid"
        size="large"
        expand="block"
        onClick={onStartButtonClick}
      >
        Start Quiz
      </IonButton>
      <IonCard>
        <IonCardHeader>
          {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          <IonCardTitle>About This App</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Japanese vocabulary words will be shown to you with a kanji character missing from the
          word. You must choose the correct kanji from the available options. This will improve your
          kanji recognition skills and help you discern between similar-looking kanji.
        </IonCardContent>
      </IonCard>
    </React.Fragment>
  )
}

export default StartScreen
