import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import classNames from "classnames"
import { refresh, thumbsDown, thumbsUp } from "ionicons/icons"
import _shuffle from "lodash.shuffle"
import React from "react"
import TextPlaceholder from "../components/TextPlaceholder"
import "./KanjiGuesser.css"

type KanjiCharacter = "信" | "映" | "画" | "詩" | "言" | "僕" | "市" | "辞" | "爆" | "必"

interface Props {}

interface State {
  isStarted: boolean
  numCorrect: number
  numIncorrect: number

  userChoice: KanjiCharacter | null
  kanjiChoices: KanjiCharacter[]
}

class KanjiGuesser extends React.Component<Props, State> {
  // static defaultProps: Props = {
  //   count: 10
  // }

  state: State = {
    isStarted: false,

    numCorrect: 0,
    numIncorrect: 0,

    userChoice: null,
    kanjiChoices: []
  }

  correctChoice: KanjiCharacter

  constructor(props: Props) {
    super(props)

    this.state.kanjiChoices = _shuffle(["信", "映", "画", "詩", "言", "僕", "市", "辞", "爆", "必"])

    this.correctChoice = "信"
  }

  get wasCorrectChoice() {
    return this.correctChoice === this.state.userChoice
  }

  handleUserAnswer(choice: KanjiCharacter, indexOfButton: number) {
    this.setState({ userChoice: choice })

    if (choice === this.correctChoice) {
      //setNumCorrect(numCorrect + 1);
      this.setState(state => ({ numCorrect: state.numCorrect + 1 }))
    } else {
      //setNumIncorrect(numIncorrect + 1);
      this.setState(state => ({ numIncorrect: state.numIncorrect + 1 }))
    }
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
            <IonButton
              strong={true}
              fill="solid"
              size="large"
              expand="block"
              onClick={() => {
                this.setState(state => ({
                  userChoice: null,
                  isStarted: true,
                  kanjiChoices: _shuffle(state.kanjiChoices)
                }))
              }}
            >
              Start
            </IonButton>
          ) : (
            <React.Fragment>
              <IonItem>
                <IonButton
                  color="medium"
                  onClick={() => {
                    this.setState({
                      userChoice: null,
                      isStarted: false
                    })
                  }}
                >
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
              </IonItem>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle class="ion-text-center">
                    <span className="main_word">
                      <span
                        className={classNames([
                          "furigana_section",
                          {
                            success: this.state.userChoice && this.wasCorrectChoice,
                            failure: this.state.userChoice && !this.wasCorrectChoice
                          }
                        ])}
                      >
                        {!this.state.userChoice ? <TextPlaceholder /> : this.correctChoice}
                      </span>
                      じる
                    </span>
                  </IonCardTitle>
                  <IonCardSubtitle class="japanese-reading ion-text-center">
                    <span
                      className={classNames([
                        "furigana_section",
                        {
                          success: this.state.userChoice && this.wasCorrectChoice,
                          failure: this.state.userChoice && !this.wasCorrectChoice
                        }
                      ])}
                    >
                      しん
                    </span>
                    じる
                  </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="english-translation ion-text-center">
                  To believe, to trust
                </IonCardContent>
              </IonCard>
              <IonGrid>
                <IonRow class="ion-justify-content-around">
                  {this.state.kanjiChoices.map((choice, index) => {
                    return (
                      <IonCol key={index} class="ion-text-center">
                        <IonButton
                          className={classNames([
                            "kanji-choice",
                            {
                              selected: choice === this.state.userChoice
                            }
                          ])}
                          strong={false}
                          fill={!this.state.userChoice ? "outline" : "solid"}
                          disabled={!!this.state.userChoice}
                          color={
                            !this.state.userChoice
                              ? "primary"
                              : choice === this.correctChoice
                              ? "success"
                              : "danger"
                          }
                          size="large"
                          onClick={() => {
                            this.handleUserAnswer(choice, index)
                          }}
                        >
                          {choice}
                        </IonButton>
                      </IonCol>
                    )
                  })}
                </IonRow>
              </IonGrid>
            </React.Fragment>
          )}
          {/* <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              <IonCardTitle>Card Title</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spend a week in the woods. Wash your
              spirit clean.
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon name="pin" slot="start" />
              <IonLabel>ion-item in a card, icon left, button right</IonLabel>
              <IonButton fill="outline" slot="end">
                View
              </IonButton>
            </IonItem>

            <IonCardContent>
              This is content, without any paragraph or header tags, within an
              ion-cardContent element.
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonItem href="#" class="activated">
              <IonIcon icon={wifi} slot="start" />
              <IonLabel>Card Link Item 1 .activated</IonLabel>
            </IonItem>

            <IonItem href="#">
              <IonIcon icon={wine} slot="start" />
              <IonLabel>Card Link Item 2</IonLabel>
            </IonItem>

            <IonItem class="activated">
              <IonIcon icon={warning} slot="start" />
              <IonLabel>Card Button Item 1 .activated</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={walk} slot="start" />
              <IonLabel>Card Button Item 2</IonLabel>
            </IonItem>
          </IonCard> */}
        </IonContent>
      </IonPage>
    )
  }
}

export default KanjiGuesser
