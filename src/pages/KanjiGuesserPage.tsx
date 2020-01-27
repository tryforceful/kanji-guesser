import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { exit, thumbsDown, thumbsUp } from "ionicons/icons"
import React from "react"
import FinishScreen from "../components/FinishScreen"
import Quizzard from "../components/Quizzard"
import StartScreen from "../components/StartScreen"
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

class KanjiGuesser extends React.Component<Props, State> {
  // static defaultProps: Props = {
  //   count: 10
  // }

  state: State = {
    quizState: QuizzardState.NotYetStarted,
    numCorrect: 0,
    numIncorrect: 0
  }

  startStudy = (): void => {
    this.setState({
      quizState: QuizzardState.InProgress,
      numCorrect: 0,
      numIncorrect: 0
    })
  }

  startOver = (): void => {
    this.setState({
      quizState: QuizzardState.Aborted
    })
  }

  finish = (): void => {
    this.setState({
      quizState: QuizzardState.Finished
    })
  }

  incrementCorrect = (): void => {
    this.setState(state => ({ numCorrect: state.numCorrect + 1 }))
  }

  incrementIncorrect = (): void => {
    this.setState(state => ({ numIncorrect: state.numIncorrect + 1 }))
  }

  get currentContentSlide() {
    switch (this.state.quizState) {
      case QuizzardState.InProgress:
        return (
          <Quizzard
            startOver={this.startOver}
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
            onStartButtonClick={this.startStudy}
          />
        )
      case QuizzardState.NotYetStarted:
      default:
        return <StartScreen onStartButtonClick={this.startStudy} />
    }
  }

  render() {
    const QuizzardToolbar: JSX.Element = (
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="medium" size="default" onClick={this.startOver}>
            <IonIcon slot="start" icon={exit} />
            End Quiz
          </IonButton>
        </IonButtons>
        <div slot="end">
          <IonChip className="unclickable" color="success">
            <IonIcon icon={thumbsUp} />
            <IonLabel>{this.state.numCorrect}</IonLabel>
          </IonChip>
          <IonChip className="unclickable" color="danger">
            <IonIcon icon={thumbsDown} />
            <IonLabel>{this.state.numIncorrect}</IonLabel>
          </IonChip>
        </div>
      </IonToolbar>
    )

    return (
      <IonPage>
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
