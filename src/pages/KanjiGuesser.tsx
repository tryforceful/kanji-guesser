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
} from "@ionic/react";
import classNames from "classnames";
import { refresh, thumbsDown, thumbsUp } from "ionicons/icons";
import _shuffle from "lodash.shuffle";
import React, { useState } from "react";
import TextPlaceholder from "../components/TextPlaceholder";
import "./KanjiGuesser.css";

type KanjiCharacter =
  | "信"
  | "映"
  | "画"
  | "詩"
  | "言"
  | "僕"
  | "市"
  | "辞"
  | "爆"
  | "必";

const KanjiGuesser: React.FC = () => {
  // Hooks

  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [numIncorrect, setNumIncorrect] = useState<number>(0);

  const [isStarted, setIsStarted] = useState<boolean>(false);

  const [userChoice, setUserChoice] = useState<KanjiCharacter | null>(null);

  const [kanjiChoices, setKanjiChoices] = useState<KanjiCharacter[]>(
    _shuffle(["信", "映", "画", "詩", "言", "僕", "市", "辞", "爆", "必"])
  );

  const correctChoice: KanjiCharacter = "信";

  const wasCorrectChoice = correctChoice === userChoice;

  function handleUserAnswer(choice: KanjiCharacter, indexOfButton: number) {
    setUserChoice(choice);

    if (choice === correctChoice) {
      setNumCorrect(numCorrect + 1);
    } else {
      setNumIncorrect(numIncorrect + 1);
    }
  }

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
        {!isStarted ? (
          <IonButton
            strong={true}
            fill="solid"
            size="large"
            expand="block"
            onClick={() => {
              setUserChoice(null);
              setIsStarted(true);
              setKanjiChoices(_shuffle(kanjiChoices));
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
                  setUserChoice(null);
                  setIsStarted(false);
                }}
              >
                <IonIcon slot="start" icon={refresh} />
                Start Over
              </IonButton>
              <div slot="end">
                <IonChip color="success">
                  <IonIcon icon={thumbsUp} />
                  <IonLabel>{numCorrect}</IonLabel>
                </IonChip>
                <IonChip color="danger">
                  <IonIcon icon={thumbsDown} />
                  <IonLabel>{numIncorrect}</IonLabel>
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
                          success: userChoice && wasCorrectChoice,
                          failure: userChoice && !wasCorrectChoice
                        }
                      ])}
                    >
                      {!userChoice ? <TextPlaceholder /> : correctChoice}
                    </span>
                    じる
                  </span>
                </IonCardTitle>
                <IonCardSubtitle class="japanese-reading ion-text-center">
                  <span
                    className={classNames([
                      "furigana_section",
                      {
                        success: userChoice && wasCorrectChoice,
                        failure: userChoice && !wasCorrectChoice
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
                {kanjiChoices.map((choice, index) => {
                  return (
                    <IonCol key={index} class="ion-text-center">
                      <IonButton
                        className={classNames([
                          "kanji-choice",
                          {
                            selected: choice === userChoice
                          }
                        ])}
                        strong={false}
                        fill={!userChoice ? "outline" : "solid"}
                        disabled={!!userChoice}
                        color={
                          !userChoice
                            ? "primary"
                            : choice === correctChoice
                            ? "success"
                            : "danger"
                        }
                        size="large"
                        onClick={() => {
                          handleUserAnswer(choice, index);
                        }}
                      >
                        {choice}
                      </IonButton>
                    </IonCol>
                  );
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
  );
};

export default KanjiGuesser;
