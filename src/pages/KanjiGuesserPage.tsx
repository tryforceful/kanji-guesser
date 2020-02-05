import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import { exit, thumbsDown, thumbsUp, timer } from "ionicons/icons"
import React from "react"
import FinishScreen from "../components/FinishScreen"
import Quizzard from "../components/Quizzard"
import StartScreen from "../components/StartScreen"
import { QuizData } from "../data/QuizData"
import "../theme/KanjiGuesserPage.scss"

interface Props {}

export enum QuizzardState {
  NotYetStarted,
  InProgress,
  Aborted,
  Finished
}

interface State {
  quizState: QuizzardState

  numCorrect: number
  numIncorrect: number
}

const initialState = Object.freeze({
  quizState: QuizzardState.NotYetStarted,
  numCorrect: 0,
  numIncorrect: 0
})

class KanjiGuesser extends React.Component<Props, State> {
  // static defaultProps: Props = {
  //   count: 10
  // }

  state: State = { ...initialState }

  // TODO: maybe this should be a reducer for the QuizzardState
  startStudy = (): void => {
    this.setState({
      quizState: QuizzardState.InProgress
      // numCorrect: 0,
      // numIncorrect: 0
    })
  }

  startOver = (): void => {
    //reset state to beginning
    this.setState({
      ...initialState
    })
  }

  finish = (): void => {
    this.setState({
      quizState: QuizzardState.Finished
    })
  }

  // TODO: and this should be a reducer for the counts, w new count for total to study
  incrementCorrect = (): void => {
    this.setState(state => ({ numCorrect: state.numCorrect + 1 }))
  }

  incrementIncorrect = (): void => {
    this.setState(state => ({ numIncorrect: state.numIncorrect + 1 }))
  }

  get numRemaining(): number {
    return QuizData.length - this.state.numCorrect - this.state.numIncorrect
  }

  get percentCompleted(): number {
    return (this.state.numCorrect + this.state.numIncorrect) / QuizData.length
  }

  get currentContentSlide() {
    switch (this.state.quizState) {
      case QuizzardState.InProgress:
        return (
          <Quizzard
            finish={this.finish}
            incrementCorrect={this.incrementCorrect}
            incrementIncorrect={this.incrementIncorrect}
          />
        )
      case QuizzardState.Aborted:
      case QuizzardState.Finished:
        return (
          <FinishScreen
            numCorrect={this.state.numCorrect}
            numIncorrect={this.state.numIncorrect}
            onStartButtonClick={this.startOver}
          />
        )
      case QuizzardState.NotYetStarted:
      default:
        return <StartScreen onStartButtonClick={this.startStudy} />
    }
  }

  render() {
    const QuizzardToolbar: JSX.Element = (
      <React.Fragment>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" size="default" onClick={this.startOver}>
              <IonIcon slot="start" icon={exit} />
              End Quiz
            </IonButton>
          </IonButtons>
          <div slot="end">
            <IonChip mode="ios" className="unclickable" color="primary">
              <IonIcon icon={timer} />
              {/* TODO: fix me pulling from QuizData directly  */}
              <IonLabel>{this.numRemaining}</IonLabel>
            </IonChip>
            <IonChip mode="ios" className="unclickable" color="success">
              <IonIcon icon={thumbsUp} />
              <IonLabel>{this.state.numCorrect}</IonLabel>
            </IonChip>
            <IonChip mode="ios" className="unclickable" color="danger">
              <IonIcon icon={thumbsDown} />
              <IonLabel>{this.state.numIncorrect}</IonLabel>
            </IonChip>
          </div>
        </IonToolbar>
        <IonProgressBar
          className="quiz-progress-bar"
          value={this.percentCompleted}
        ></IonProgressBar>
      </React.Fragment>
    )

    return (
      <IonPage className="ion-page kanji-guesser-page">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Kanji Guesser</IonTitle>
          </IonToolbar>
          {this.state.quizState === QuizzardState.InProgress && QuizzardToolbar}
        </IonHeader>
        <IonContent>{this.currentContentSlide}</IonContent>
      </IonPage>
    )
  }
}

export default KanjiGuesser
