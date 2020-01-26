import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow } from "@ionic/react"
import { play } from "ionicons/icons"
import _shuffle from "lodash.shuffle"
import React from "react"
import { KanjiCharacter, QuizData, QuizItem } from "../data/QuizData"
import KanjiButton from "./KanjiButton"
import QuizQueryCard from "./QuizQueryCard"

interface Props {
  startOver: () => void
  finish: () => void
  incrementCorrect: () => void
  incrementIncorrect: () => void
}

export type UserChoice = KanjiCharacter | null

interface State {
  userChoice: UserChoice

  quizDeck: QuizItem[]
  currentItemIdx: number
  currentShuffledKanji: KanjiCharacter[]
}

class Quizzard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state.quizDeck = _shuffle([...QuizData])

    this.state.currentShuffledKanji = _shuffle(
      this.state.quizDeck[this.state.currentItemIdx]?.kanjiChoices || []
    )
  }

  state: State = {
    userChoice: null,

    quizDeck: [],
    currentItemIdx: 0,
    currentShuffledKanji: []
  }

  get currentQuizItem(): QuizItem {
    return this.state.quizDeck[this.state.currentItemIdx]
  }

  get currentKanjiChoices(): KanjiCharacter[] {
    return this.state.currentShuffledKanji
  }

  get userHasChosen(): boolean {
    return !!this.state.userChoice
  }

  get isFinalCard(): boolean {
    return this.state.quizDeck.length <= this.state.currentItemIdx + 1
  }

  moveToNextCard = (): void => {
    this.setState(state => ({
      userChoice: null,
      currentItemIdx: state.currentItemIdx + 1,
      currentShuffledKanji: _shuffle(state.quizDeck[state.currentItemIdx + 1]?.kanjiChoices || [])
    }))
  }

  handleUserAnswer = (choice: KanjiCharacter): void => {
    this.setState({ userChoice: choice })

    if (choice === this.currentQuizItem.kanjiSlug) {
      this.props.incrementCorrect()
    } else {
      this.props.incrementIncorrect()
    }
  }

  render() {
    return (
      <React.Fragment>
        <QuizQueryCard currentQuizItem={this.currentQuizItem} userChoice={this.state.userChoice} />
        <IonGrid className="kanji-choice-grid">
          <IonRow class="ion-justify-content-center">
            {this.currentKanjiChoices.map((kanjiOption, index) => {
              return (
                <IonCol key={index} sizeXs="auto" class="ion-text-center">
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
