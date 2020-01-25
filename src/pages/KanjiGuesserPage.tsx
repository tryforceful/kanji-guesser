import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import React from "react"
import FinishScreen from "../components/FinishScreen"
import Quizzard from "../components/Quizzard"
import StartScreen from "../components/StartScreen"
import "./KanjiGuesserPage.scss"

interface Props {}

export enum QuizzardState {
  NotYetStarted,
  InProgress,
  Aborted,
  Finished
}

interface State {
  quizState: QuizzardState
}

class KanjiGuesser extends React.Component<Props, State> {
  // static defaultProps: Props = {
  //   count: 10
  // }

  state: State = {
    quizState: QuizzardState.NotYetStarted
  }

  startStudy = () => {
    this.setState({
      quizState: QuizzardState.InProgress
    })
  }

  startOver = () => {
    this.setState({
      quizState: QuizzardState.Aborted
    })
  }

  finish = () => {
    this.setState({
      quizState: QuizzardState.Finished
    })
  }

  get currentContentSlide() {
    switch (this.state.quizState) {
      case QuizzardState.InProgress:
        return <Quizzard startOver={this.startOver} finish={this.finish} />
      case QuizzardState.Aborted:
      case QuizzardState.Finished:
        return <FinishScreen onStartButtonClick={this.startStudy} />
      case QuizzardState.NotYetStarted:
      default:
        return <StartScreen onStartButtonClick={this.startStudy} />
    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Guess the Kanji!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.currentContentSlide}</IonContent>
      </IonPage>
    )
  }
}

export default KanjiGuesser
