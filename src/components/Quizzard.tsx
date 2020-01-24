import {
  IonButton,
  IonChip,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonToolbar
} from "@ionic/react"
import { play, refresh, thumbsDown, thumbsUp } from "ionicons/icons"
import React from "react"
import { KanjiCharacter, QuizData, QuizItem } from "../data/QuizData"
import KanjiButton from "./KanjiButton"
import QuizQueryCard from "./QuizQueryCard"

interface Props {
  startOver: () => void
  finish: () => void
}

export type UserChoice = KanjiCharacter | null

interface State {
  numCorrect: number
  numIncorrect: number

  userChoice: UserChoice

  quizDeck: QuizItem[]
  currentItemIdx: number
}

class Quizzard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state.quizDeck = [...QuizData]

    //shuffleCurrentKanjiChoices()
  }

  state: State = {
    numCorrect: 0,
    numIncorrect: 0,

    userChoice: null,

    quizDeck: [],
    currentItemIdx: 0
  }

  get currentQuizItem(): QuizItem {
    return this.state.quizDeck[this.state.currentItemIdx]
  }

  get currentKanjiChoices(): KanjiCharacter[] {
    return this.currentQuizItem.kanjiChoices
  }

  get userHasChosen(): boolean {
    return !!this.state.userChoice
  }

  get isFinalCard(): boolean {
    return this.state.quizDeck.length <= this.state.currentItemIdx + 1
  }

  shuffleCurrentKanjiChoices = (): void => {
    this.setState(state => ({
      quizDeck: state.quizDeck
    }))
  }

  moveToNextCard = (): void => {
    this.setState(state => ({
      userChoice: null,
      currentItemIdx: state.currentItemIdx + 1
    }))
  }

  handleUserAnswer = (choice: KanjiCharacter): void => {
    this.setState({ userChoice: choice })

    if (choice === this.currentQuizItem.kanjiSlug) {
      //setNumCorrect(numCorrect + 1);
      this.setState(state => ({ numCorrect: state.numCorrect + 1 }))
    } else {
      //setNumIncorrect(numIncorrect + 1);
      this.setState(state => ({ numIncorrect: state.numIncorrect + 1 }))
    }
  }

  render() {
    const StatusBar: JSX.Element = (
      <IonToolbar>
        <IonButton color="medium" size="default" onClick={this.props.startOver}>
          <IonIcon slot="start" icon={refresh} />
          Start Over
        </IonButton>
        <div slot="end">
          <IonChip color="success">
            <IonIcon icon={thumbsUp} />
            <IonLabel>{this.state.numCorrect}</IonLabel>
          </IonChip>
          <IonChip color="danger">
            <IonIcon icon={thumbsDown} />
            <IonLabel>{this.state.numIncorrect}</IonLabel>
          </IonChip>
        </div>
      </IonToolbar>
    )

    return (
      <React.Fragment>
        {StatusBar}
        <QuizQueryCard currentQuizItem={this.currentQuizItem} userChoice={this.state.userChoice} />
        <IonGrid>
          <IonRow class="ion-justify-content-around">
            {this.currentKanjiChoices.map((kanjiOption, index) => {
              return (
                <IonCol key={index} sizeMd="4" class="ion-text-center">
                  <KanjiButton
                    correctChoice={this.currentQuizItem.kanjiSlug}
                    thisButtonsKanji={kanjiOption}
                    userChoice={this.state.userChoice}
                    onClick={this.handleUserAnswer}
                  />
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
        {this.userHasChosen && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={!this.isFinalCard ? this.moveToNextCard : this.props.finish}>
              <IonIcon icon={play}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
      </React.Fragment>
    )
  }
}

export default Quizzard
