export type KanjiCharacter = string
export type Placeholder = null

export interface NormalWordSegment {
  token: KanjiCharacter
  furigana?: string
  romaji?: string
}
export interface PlaceholderSegment {
  token: Placeholder
  furigana: string
  romaji?: string
}

// This is a Discriminated Union ("token" is the discriminant):
export type WordSegment = NormalWordSegment | PlaceholderSegment

// This is the Disc Union's type guard
export function isSegmentPlaceholder(segment: WordSegment): segment is PlaceholderSegment {
  return segment.token === (null as Placeholder)
}

export function isKanjiPlaceholder(k: KanjiCharacter | Placeholder): k is Placeholder {
  return k === (null as Placeholder)
}

export type JapaneseQueryStringArray = Array<WordSegment>

export interface QuizItem {
  kanjiSlug: KanjiCharacter
  japaneseQuery: JapaneseQueryStringArray
  meaning: string
  distractors: KanjiCharacter[]
}

export const QuizData: QuizItem[] = [
  {
    kanjiSlug: "信",
    japaneseQuery: [
      { token: null, furigana: "しん", romaji: "shin" },
      { token: "じる", romaji: "jiru" }
    ],
    meaning: "To believe, to trust",
    distractors: ["映", "画", "詩", "言", "僕", "市", "辞", "爆", "必", "魚", "幸", "子"]
  },
  {
    kanjiSlug: "言",
    japaneseQuery: [
      { token: null, furigana: "い", romaji: "i" },
      { token: "う", romaji: "u" }
    ],
    meaning: "To say, to speak",
    distractors: ["映", "画", "詩", "魚", "僕", "市", "辞", "爆", "必", "幸", "子"]
  },
  {
    kanjiSlug: "上",
    japaneseQuery: [
      { token: "召し", furigana: "めし", romaji: "meshi" },
      { token: null, furigana: "あ", romaji: "a" },
      { token: "がる", romaji: "garu" }
    ],
    meaning: "To eat (humble)",
    distractors: ["映", "画", "詩", "言", "僕", "市", "辞", "爆", "必", "幸", "子"]
  },
  {
    kanjiSlug: "独",
    japaneseQuery: [
      { token: null, furigana: "ドク", romaji: "doku" },
      { token: "立", furigana: "リツ", romaji: "ritsu" }
    ],
    meaning: "independence",
    distractors: ["映", "画", "詩", "言", "僕", "市", "辞", "爆", "必", "幸", "子"]
  }
]
