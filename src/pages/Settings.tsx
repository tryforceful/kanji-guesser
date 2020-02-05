import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonSegment, IonSegmentButton, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import { moon, star, starHalf, starOutline } from "ionicons/icons"
import React from "react"
import QuizQueryCard from "../components/QuizQueryCard"
import { QuizItem } from "../data/QuizData"
import { KanaDisplay, QuizDifficulty, useSettings } from "../state/SettingsContext"
import "../theme/SettingsPage.scss"

const ListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ListItems />
      </IonContent>
    </IonPage>
  )
}

const exampleQuizItem: QuizItem = {
  kanjiSlug: "手",
  japaneseQuery: [
    { token: "お", romaji: "o" },
    { token: null, furigana: "て", romaji: "te" },
    { token: "本", furigana: "ほん", romaji: "hon" }
  ],
  meaning: "example",
  distractors: [] //unnecessary for this card
}

const ListItems: React.FC<{}> = () => {

  const [settings, setSettings] = useSettings()

  // //update local state with global Settings context info
  // useEffect(() => {
  //   localState = settings
  // }, []) //empty array signifies only on first render

  function toggleDarkMode(e: CustomEvent): void
  {
    document.body.classList.toggle("dark", e.detail.checked)

    setSettings(prevState => ({ ...prevState, darkThemeOn: e.detail.checked }))
  }

  function quizDifficultyToggled(e: CustomEvent): void
  {
    setSettings(prevState => ({ ...prevState, quizDifficulty: e.detail.value }))
  }

  function kanaDisplayToggled(e: CustomEvent): void
  {
    setSettings(prevState => ({...prevState, kanaDisplayChoice: e.detail.value}))
  }

  return (
    <IonList>
      <IonItem lines="full">
        <IonIcon slot="start" icon={moon}></IonIcon>
        <IonLabel>Dark Theme</IonLabel>
        <IonToggle
          id="themeToggle"
          color="tertiary"
          slot="end"
          checked={settings.darkThemeOn}
          onIonChange={e => toggleDarkMode(e)}
        ></IonToggle>
      </IonItem>
      <IonRadioGroup value={settings.quizDifficulty} onIonChange={quizDifficultyToggled}>
        <IonListHeader>
          <IonLabel>Difficulty</IonLabel>
        </IonListHeader>

        <IonItem lines="none">
          <IonRadio color="tertiary" slot="start" value={QuizDifficulty.Easy} />
          <IonIcon slot="start" icon={starOutline}></IonIcon>
          <IonLabel>Easy</IonLabel>
          <IonNote mode="ios" slot="end">
            {QuizDifficulty.Easy} choices
          </IonNote>
        </IonItem>

        <IonItem lines="none">
          <IonRadio color="tertiary" slot="start" value={QuizDifficulty.Medium} />
          <IonIcon slot="start" icon={starHalf}></IonIcon>
          <IonLabel>Medium</IonLabel>
          <IonNote mode="ios" slot="end">
            {QuizDifficulty.Medium} choices
          </IonNote>
        </IonItem>

        <IonItem lines="full">
          <IonRadio color="tertiary" slot="start" value={QuizDifficulty.Hard} />
          <IonIcon slot="start" icon={star}></IonIcon>
          <IonLabel>Hard</IonLabel>
          <IonNote mode="ios" slot="end">
            {QuizDifficulty.Hard} choices
          </IonNote>
        </IonItem>
      </IonRadioGroup>

      <IonListHeader>
        <IonLabel>Display Preferences</IonLabel>
      </IonListHeader>

      <div className="settings-example-query-card">
        <QuizQueryCard currentQuizItem={exampleQuizItem} userChoice={null} />
      </div>

      <IonSegment
        class="display-pref-segment"
        color="tertiary"
        value={settings.kanaDisplayChoice}
        onIonChange={kanaDisplayToggled}
      >
        <IonSegmentButton value={KanaDisplay.Kana}>
          <IonLabel>{KanaDisplay.Kana}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={KanaDisplay.Romaji}>
          <IonLabel>{KanaDisplay.Romaji}</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonList>
  )
}

export default ListPage
