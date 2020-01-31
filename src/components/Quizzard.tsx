import { IonFab, IonFabButton, IonGrid, IonIcon, IonRow, isPlatform } from "@ionic/react"
import classNames from "classnames"
import { play } from "ionicons/icons"
import _shuffle from "lodash.shuffle"
import React from "react"
import { KanjiCharacter, QuizData, QuizItem } from "../data/QuizData"
import { QuizDifficulty, SettingsContext } from "../state/SettingsContext"
import KanjiButton from "./KanjiButton"
import QuizQueryCard from "./QuizQueryCard"

interface Props {
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

type KanjiButtonKey = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "-" | "="

const kanjiButtonKeys: KanjiButtonKey[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "="
]

class Quizzard extends React.Component<Props, State> {
  //declare context: SettingsContext //TODO: understand what declare really does
  static contextType = SettingsContext
  context!: React.ContextType<typeof SettingsContext>

  constructor(props: Props) {
    super(props)

    this.state.quizDeck = _shuffle([...QuizData])
  }

  //TODO: use ionViewWillEnter?
  componentDidMount() {
    //called after constructor
    if (!isPlatform("mobile")) this.setupKeypressObserver()

    let firstKanjiChoices: KanjiCharacter[] = this.currentQuizItem.distractors || []

    const [settings] = this.context

    firstKanjiChoices = _shuffle([
      ...firstKanjiChoices.slice(0, settings.quizDifficulty - 1),
      this.currentQuizItem.kanjiSlug
    ])

    this.setState({
      numButtonsToShow: settings.quizDifficulty,
      currentShuffledKanji: firstKanjiChoices
    })
  }

  //TODO: use ionViewWillLeave?
  componentDidUpdate() {
    const [settings] = this.context

    if (settings.quizDifficulty !== this.state.numButtonsToShow)
      this.setState({ numButtonsToShow: settings.quizDifficulty })
  }

  componentWillUnmount() {
    if (!isPlatform("mobile")) this.removeKeypressObserver()
  }

  state: State = {
    userChoice: null,

    quizDeck: [],
    currentItemIdx: 0,
    currentShuffledKanji: [],
    numButtonsToShow: 0
  }

  setupKeypressObserver = (): void => {
    document.addEventListener("keyup", this.handleKeypress)
  }

  removeKeypressObserver = (): void => {
    document.removeEventListener("keyup", this.handleKeypress)
  }

  handleKeypress = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return
    }

    //TODO: Make sure we only do this on Desktop!

    const key = String(event.key || event.keyCode)
    console.log(key)

    if (!this.userHasChosen) {
      if ((kanjiButtonKeys as string[]).includes(key)) {
        const idx = (kanjiButtonKeys as string[]).indexOf(key)
        if (this.state.currentShuffledKanji.length > idx) {
          this.handleUserAnswer(this.state.currentShuffledKanji[idx])
        }
      }
    } else {
      if ([" ", "Enter", "ArrowRight"].includes(key)) {
        this.moveToNextCard()
      }
    }
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
    if (this.isFinalCard) {
      this.props.finish()
      return
    }
    this.setState(state => {
      const nextQuizItem = this.state.quizDeck[this.state.currentItemIdx + 1]
      let newKanjiChoices = nextQuizItem?.distractors || []

      newKanjiChoices = _shuffle([
        ...newKanjiChoices.slice(0, this.state.numButtonsToShow - 1),
        nextQuizItem?.kanjiSlug
      ])

      return {
        userChoice: null,
        currentItemIdx: state.currentItemIdx + 1,
        currentShuffledKanji: newKanjiChoices
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
    const [settings] = this.context

    return (
      <div>
        <QuizQueryCard currentQuizItem={this.currentQuizItem} userChoice={this.state.userChoice} />
        <IonGrid className="kanji-choice-grid">
          <IonRow
            class={classNames([
              "ion-justify-content-center choices-container",
              {
                "buttons-easy": settings.quizDifficulty === QuizDifficulty.Easy,
                "buttons-medium": settings.quizDifficulty === QuizDifficulty.Medium,
                "buttons-hard": settings.quizDifficulty === QuizDifficulty.Hard
              }
            ])}
          >
            {this.state.currentShuffledKanji.map((kanjiOption, index) => {
              return (
                <div key={index} className="button-container ion-text-center">
                  <KanjiButton
                    correctChoice={this.currentQuizItem.kanjiSlug}
                    thisButtonsKanji={kanjiOption}
                    userChoice={this.state.userChoice}
                    onClick={this.handleUserAnswer}
                    altKey={kanjiButtonKeys[index]}
                  />
                </div>
                // <IonCol key={index} sizeXs="auto" class="ion-text-center">
                //   <KanjiButton
                //     correctChoice={this.currentQuizItem.kanjiSlug}
                //     thisButtonsKanji={kanjiOption}
                //     userChoice={this.state.userChoice}
                //     onClick={this.handleUserAnswer}
                //   />
                // </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
        {this.userHasChosen && (
          <IonFab style={{ position: "fixed" }} vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton class="next-button" onClick={this.moveToNextCard}>
              <IonIcon icon={play}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
      </div>
    )
  }
}

export default Quizzard
