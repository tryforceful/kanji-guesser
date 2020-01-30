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
          This app is a Japanese language learning tool designed to improve your kanji recognition
          skills and help you discern between similar-looking kanji. (<strong>Kanji</strong> (漢字)
          are Japanese symbols that were borrowed from the Chinese writing system.)
          <br />
          <br />
          <span>
            Japanese vocabulary words will be shown to you on a series of flashcards with a kanji
            character missing from each word. You must choose the correct kanji from the available
            choices. A reading gloss is provided to you as a hint either in <strong>kana</strong>{" "}
            (Japanese characters, かな) or <strong>romaji</strong> (English letters).
          </span>
          <br />
          <br />
          Good luck! 頑張れ！
        </IonCardContent>
      </IonCard>
    </React.Fragment>
  )
}

export default StartScreen
