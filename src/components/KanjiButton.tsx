import { IonButton } from "@ionic/react"
import classNames from "classnames"
import React from "react"
import { KanjiCharacter } from "../data/QuizData"
import { useSettings } from "../state/SettingsContext"
import { UserChoice } from "./Quizzard"

interface Props {
  thisButtonsKanji: KanjiCharacter
  correctChoice: KanjiCharacter
  userChoice: UserChoice
  onClick: (chosenKanji: KanjiCharacter) => void
}

const KanjiButton: React.FC<Props> = ({
  thisButtonsKanji,
  correctChoice,
  userChoice,
  onClick: emitButtonPress
}) => {
  const [settings] = useSettings()

  return (
    <IonButton
      className={classNames([
        "kanji-choice",
        {
          selected: thisButtonsKanji === userChoice
        }
      ])}
      strong={false}
      fill={settings.darkThemeOn ? "outline" : "solid"}
      // {!userChoice ? "outline" : "solid"}
      disabled={!!userChoice}
      color={!userChoice ? "primary" : thisButtonsKanji === correctChoice ? "success" : "danger"}
      onClick={() => emitButtonPress(thisButtonsKanji)}
    >
      {thisButtonsKanji}
    </IonButton>
  )
}

export default KanjiButton