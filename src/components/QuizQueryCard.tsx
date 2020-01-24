import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react"
import classNames from "classnames"
import React from "react"
import { JapaneseQueryStringArray, KanjiPlaceholder, QuizItem } from "../data/QuizData"
import TextPlaceholder from "./TextPlaceholder"

interface Props {
  currentQuizItem: QuizItem
  userChoice: string | null
}

function isKanjiPlaceholder(x: string | KanjiPlaceholder): x is KanjiPlaceholder {
  return typeof x == "object" && (x as KanjiPlaceholder).kana !== undefined
}

const QuizQueryCard: React.FC<Props> = ({ currentQuizItem, userChoice }) => {
  const success: boolean = userChoice !== null && currentQuizItem.kanjiSlug === userChoice
  const failure: boolean = userChoice !== null && currentQuizItem.kanjiSlug !== userChoice

  const japaneseQueryArr: JapaneseQueryStringArray = currentQuizItem.japaneseQuery
  const furiganaArr: JapaneseQueryStringArray | undefined = currentQuizItem.furigana

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle class="ion-text-center">
          <span className="main_word">
            {japaneseQueryArr.map(item =>
              !isKanjiPlaceholder(item) ? (
                item
              ) : (
                <span
                  className={classNames([
                    "furigana_section",
                    {
                      success: success,
                      failure: failure
                    }
                  ])}
                >
                  {!userChoice ? <TextPlaceholder /> : currentQuizItem.kanjiSlug}
                </span>
              )
            )}
          </span>
        </IonCardTitle>
        <IonCardSubtitle class="ion-text-center">
          <span className="japanese_reading">
            {(furiganaArr || japaneseQueryArr).map(item =>
              !isKanjiPlaceholder(item) ? (
                item
              ) : (
                <span
                  className={classNames([
                    "furigana_section",
                    {
                      success: success,
                      failure: failure
                    }
                  ])}
                >
                  {item.kana}
                </span>
              )
            )}
          </span>
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent class="english-translation ion-text-center">
        {currentQuizItem.englishMeaning}
      </IonCardContent>
    </IonCard>
  )
}

export default QuizQueryCard
