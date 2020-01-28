import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react"
import classNames from "classnames"
import React from "react"
import { isSegmentPlaceholder, JapaneseQueryStringArray, QuizItem } from "../data/QuizData"
import { KanaDisplay, useSettings } from "../state/SettingsContext"
import TextPlaceholder from "./TextPlaceholder"

interface Props {
  currentQuizItem: QuizItem
  userChoice: string | null
}

const QuizQueryCard: React.FC<Props> = ({ currentQuizItem, userChoice }) => {
  const [settings] = useSettings()

  const success: boolean = userChoice !== null && currentQuizItem.kanjiSlug === userChoice
  const failure: boolean = userChoice !== null && currentQuizItem.kanjiSlug !== userChoice

  const japaneseQueryArr: JapaneseQueryStringArray = currentQuizItem.japaneseQuery

  const HighlightedSegment: React.FC<{}> = props => (
    <span
      {...props}
      className={classNames([
        "highlighted_section",
        {
          success: success,
          failure: failure
        }
      ])}
    />
  )

  return (
    <div slot="fixed">
      <IonCard className="quiz-query-card">
        <IonCardHeader>
          <IonCardTitle class="ion-text-center">
            <span className="main_word">
              {japaneseQueryArr.map((segment, idx) =>
                !isSegmentPlaceholder(segment) ? (
                  segment.token
                ) : (
                  <HighlightedSegment key={idx}>
                    {!userChoice ? <TextPlaceholder /> : currentQuizItem.kanjiSlug}
                  </HighlightedSegment>
                )
              )}
            </span>
          </IonCardTitle>
          <IonCardSubtitle class="ion-text-center">
            <span className="japanese_reading">
              {japaneseQueryArr.map((segment, idx) =>
                !isSegmentPlaceholder(segment) ? (
                  (settings.kanaDisplayChoice === KanaDisplay.Romaji && segment.romaji) ||
                  segment.furigana ||
                  segment.token
                ) : (
                  <HighlightedSegment key={idx}>
                    {(settings.kanaDisplayChoice === KanaDisplay.Romaji && segment.romaji) ||
                      segment.furigana}
                  </HighlightedSegment>
                )
              )}
            </span>
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent class="english-translation ion-text-center">
          {currentQuizItem.meaning}
        </IonCardContent>
      </IonCard>
    </div>
  )
}

export default QuizQueryCard
