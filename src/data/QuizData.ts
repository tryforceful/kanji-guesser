export type KanjiCharacter = string

export interface KanjiPlaceholder {
  kana: string
}

export type JapaneseQueryStringArray = Array<string | KanjiPlaceholder>

export interface QuizItem {
  kanjiSlug: KanjiCharacter
  japaneseQuery: JapaneseQueryStringArray
  furigana?: JapaneseQueryStringArray
  englishMeaning: string
  kanjiChoices: KanjiCharacter[]
}

export const QuizData: QuizItem[] = [
  {
    kanjiSlug: "信",
    japaneseQuery: [{ kana: "しん" }, "じる"],
    englishMeaning: "To believe, to trust",
    kanjiChoices: ["信", "映", "画", "詩", "言", "僕", "市", "辞", "爆", "必"]
  },
  {
    kanjiSlug: "言",
    japaneseQuery: [{ kana: "い" }, "う"],
    englishMeaning: "To say, to speak",
    kanjiChoices: ["信", "映", "画", "詩", "言", "僕", "市", "辞", "爆", "必"]
  },
  {
    kanjiSlug: "上",
    japaneseQuery: ["召し", { kana: "あ" }, "がる"],
    furigana: ["めし", { kana: "あ" }, "がる"],
    englishMeaning: "To eat (humble)",
    kanjiChoices: ["上", "映", "画", "詩", "言", "僕", "市", "辞", "爆", "必"]
  }
]
