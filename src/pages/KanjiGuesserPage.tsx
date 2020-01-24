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
import Quizzard from "../components/Quizzard"
import StartScreen from "../components/StartScreen"
import "./KanjiGuesserPage.css"

interface Props {}

interface State {
  isStarted: boolean
}

class KanjiGuesser extends React.Component<Props, State> {
  // static defaultProps: Props = {
  //   count: 10
  // }

  state: State = {
    isStarted: false
  }

  startStudy = () => {
    this.setState({
      isStarted: true
    })
  }

  startOver = () => {
    this.setState({
      isStarted: false
    })
  }

  finish = () => {
    this.setState({
      isStarted: false
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Guess the Kanji!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {!this.state.isStarted ? (
            <StartScreen onStartButtonClick={this.startStudy} />
          ) : (
            <Quizzard startOver={this.startOver} finish={this.finish} />
          )}
        </IonContent>
      </IonPage>
    )
  }
}

export default KanjiGuesser
