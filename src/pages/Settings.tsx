import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/react"
import { moon, star, starHalf, starOutline } from "ionicons/icons"
import React from "react"
import { KanaDisplay, QuizDifficulty, useSettings } from "../state/SettingsContext"

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

const ListItems: React.FC<{}> = () => {
  // const icons = [
  //   flask,
  //   wifi,
  //   beer,
  //   football,
  //   basketball,
  //   paperPlane,
  //   americanFootball,
  //   boat,
  //   bluetooth,
  //   build
  // ]

  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => {
  //   return (
  //     <IonItem key={x}>
  //       <IonIcon icon={icons[x - 1]} slot="start" />
  //       Item {x}
  //       <div className="item-note" slot="end">
  //         This is item # {x}
  //       </div>
  //     </IonItem>
  //   )
  // })

  const [settings, setSettings] = useSettings()

  // //update local state with global Settings context info
  // useEffect(() => {
  //   localState = settings
  // }, []) //empty array signifies only on first render

  function toggleDarkMode(e: CustomEvent) {
    document.body.classList.toggle("dark", e.detail.checked)

    setSettings(prevState => ({ ...prevState, darkThemeOn: e.detail.checked })) //turn this into a reducer!!!
  }

  function quizDifficultyToggled(e: CustomEvent): void {
    console.log(e.detail.value)

    setSettings(prevState => ({ ...prevState, quizDifficulty: e.detail.value })) //turn this into a reducer!!!
  }

  function kanaDisplayToggled(e: CustomEvent): void {
    console.log(e.detail.value)

    setSettings(prevState => {
      return { ...prevState, kanaDisplayChoice: e.detail.value }
    }) //turn this into a reducer!!!
  }

  return (
    <IonList>
      <IonItem lines="full">
        <IonIcon slot="start" icon={moon}></IonIcon>
        <IonLabel>Dark Theme</IonLabel>
        <IonToggle
          id="themeToggle"
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
          <IonNote slot="end">{QuizDifficulty.Easy} choices</IonNote>
        </IonItem>

        <IonItem lines="none">
          <IonRadio color="tertiary" slot="start" value={QuizDifficulty.Medium} />
          <IonIcon slot="start" icon={starHalf}></IonIcon>
          <IonLabel>Medium</IonLabel>
          <IonNote slot="end">{QuizDifficulty.Medium} choices</IonNote>
        </IonItem>

        <IonItem lines="none">
          <IonRadio color="tertiary" slot="start" value={QuizDifficulty.Hard} />
          <IonIcon slot="start" icon={star}></IonIcon>
          <IonLabel>Hard</IonLabel>
          <IonNote slot="end">{QuizDifficulty.Hard} choices</IonNote>
        </IonItem>
      </IonRadioGroup>

      <IonListHeader>
        <IonLabel>Display Preferences</IonLabel>
      </IonListHeader>

      <IonSegment value={settings.kanaDisplayChoice} onIonChange={kanaDisplayToggled}>
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
