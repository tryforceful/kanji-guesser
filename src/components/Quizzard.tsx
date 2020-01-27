import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow } from "@ionic/react"
import { play } from "ionicons/icons"
import _shuffle from "lodash.shuffle"
import React from "react"
import { KanjiCharacter, QuizData, QuizItem } from "../data/QuizData"
import { SettingsContext } from "../state/SettingsContext"
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
  numButtonsToShow: number
}

class Quizzard extends React.Component<Props, State> {
  //declare context: SettingsObj
  static contextType = SettingsContext

  constructor(props: Props) {
    super(props)

    this.state.quizDeck = _shuffle([...QuizData])
  }

  componentDidMount() {
    //called after constructor

    const firstKanjiChoices: KanjiCharacter[] =
      this.state.quizDeck[this.state.currentItemIdx]?.kanjiChoices || []

    const [settings] = this.context

    this.setState({
      numButtonsToShow: this.context.quizDifficulty,
      currentShuffledKanji: _shuffle(firstKanjiChoices.slice(0, settings.quizDifficulty))
    })
  }

  componentDidUpdate() {
    const [settings] = this.context

    if (settings.quizDifficulty !== this.state.numButtonsToShow)
      this.setState({ numButtonsToShow: settings.quizDifficulty })
  }

  state: State = {
    userChoice: null,

    quizDeck: [],
    currentItemIdx: 0,
    currentShuffledKanji: [],
    numButtonsToShow: 0
  }

  get currentQuizItem(): QuizItem {
    return this.state.quizDeck[this.state.currentItemIdx]
  }

  get userHasChosen(): boolean {
    return !!this.state.userChoice
  }

  get isFinalCard(): boolean {
    return this.state.quizDeck.length <= this.state.currentItemIdx + 1
  }

  moveToNextCard = (): void => {
    this.setState(state => {
      const newKanjiChoices = this.state.quizDeck[this.state.currentItemIdx]?.kanjiChoices || []
      return {
        userChoice: null,
        currentItemIdx: state.currentItemIdx + 1,
        currentShuffledKanji: _shuffle(newKanjiChoices.slice(0, this.state.numButtonsToShow))
      }
    })
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
            {this.state.currentShuffledKanji.map((kanjiOption, index) => {
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
