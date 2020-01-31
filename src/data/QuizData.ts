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
    meaning: "to believe, to trust",
    distractors: [
      "計",
      "訂",
      "言",
      "訃",
      "君",
      "吉",
      "告",
      "託",
      "這",
      "訖",
      "記",
      "訌",
      "討",
      "訐",
      "訊",
      "害",
      "訓",
      "珂",
      "訛"
    ]
  },
  {
    kanjiSlug: "言",
    japaneseQuery: [
      { token: null, furigana: "い", romaji: "i" },
      { token: "う", romaji: "u" }
    ],
    meaning: "to say, to speak",
    distractors: [
      "計",
      "訂",
      "信",
      "訃",
      "君",
      "吉",
      "告",
      "託",
      "這",
      "訖",
      "記",
      "訌",
      "討",
      "訐",
      "訊",
      "害",
      "訓",
      "珂",
      "訛"
    ]
  },
  {
    kanjiSlug: "上",
    japaneseQuery: [
      { token: "召し", furigana: "めし", romaji: "meshi" },
      { token: null, furigana: "あ", romaji: "a" },
      { token: "がる", romaji: "garu" }
    ],
    meaning: "to eat (honorific)",
    distractors: [
      "五",
      "止",
      "丑",
      "王",
      "玉",
      "巧",
      "立",
      "正",
      "冉",
      "主",
      "庁",
      "且",
      "央",
      "皿",
      "生",
      "歩",
      "伍",
      "与",
      "二"
    ]
  },
  {
    kanjiSlug: "独",
    japaneseQuery: [
      { token: null, furigana: "ドク", romaji: "doku" },
      { token: "立", furigana: "リツ", romaji: "ritsu" }
    ],
    meaning: "independence",
    distractors: [
      "風",
      "虱",
      "蚩",
      "蚕",
      "虫",
      "颪",
      "蛮",
      "蛍",
      "蛋",
      "触",
      "蜃",
      "蚤",
      "狷",
      "蛩",
      "蛬",
      "瘋",
      "颯",
      "颱",
      "獨",
      "蜀"
    ]
  },
  {
    kanjiSlug: "南",
    japaneseQuery: [
      { token: null, furigana: "みなみ", romaji: "minami" },
      { token: "口", furigana: "ぐち", romaji: "guchi" }
    ],
    meaning: "south entrance",
    distractors: [
      "幸",
      "喃",
      "楠",
      "遖",
      "献",
      "伴",
      "坪",
      "杵",
      "垪",
      "辛",
      "垰",
      "辞",
      "畔",
      "倖",
      "桙",
      "埃",
      "祥",
      "袢",
      "棡",
      "塀"
    ]
  },
  {
    kanjiSlug: "東",
    japaneseQuery: [
      { token: null, furigana: "トウ", romaji: "tō" },
      { token: "京", furigana: "キョウ", romaji: "kyō" }
    ],
    meaning: "Tokyo",
    distractors: [
      "更",
      "凍",
      "某",
      "軌",
      "杲",
      "果",
      "陳",
      "菓",
      "軟",
      "軣",
      "夏",
      "莫",
      "臭",
      "泉",
      "酥",
      "軫",
      "昧",
      "棟",
      "便",
      "皈"
    ]
  },
  {
    kanjiSlug: "果",
    japaneseQuery: [
      { token: null, furigana: "くだ", romaji: "kuda" },
      { token: "物", furigana: "もの", romaji: "mono" }
    ],
    meaning: "fruit",
    distractors: [
      "杲",
      "昧",
      "昃",
      "昊",
      "眛",
      "是",
      "軌",
      "某",
      "畏",
      "畉",
      "旻",
      "東",
      "早",
      "匙",
      "軟",
      "軣",
      "巣",
      "菓",
      "晒",
      "臭"
    ]
  },
  {
    kanjiSlug: "早",
    japaneseQuery: [
      { token: null, furigana: "サッ", romaji: "sas" },
      { token: "速", furigana: "ソク", romaji: "soku" }
    ],
    meaning: "right now, immediately",
    distractors: [
      "旱",
      "車",
      "甲",
      "申",
      "旦",
      "杲",
      "昇",
      "果",
      "卓",
      "軋",
      "町",
      "里",
      "甼",
      "草",
      "日",
      "昨",
      "軍",
      "亘",
      "俥",
      "卑"
    ]
  },
  {
    kanjiSlug: "日",
    japaneseQuery: [
      { token: null, furigana: "ニ", romaji: "ni" },
      { token: "本", furigana: "ホン", romaji: "hon" }
    ],
    meaning: "Japan",
    distractors: [
      "甲",
      "目",
      "旦",
      "由",
      "白",
      "旧",
      "田",
      "申",
      "旬",
      "百",
      "旨",
      "曲",
      "亘",
      "自",
      "早",
      "旭",
      "四",
      "囚",
      "甘",
      "更"
    ]
  },
  {
    kanjiSlug: "本",
    japaneseQuery: [
      { token: "日", furigana: "ニ", romaji: "ni" },
      { token: null, furigana: "ホン", romaji: "hon" }
    ],
    meaning: "Japan",
    distractors: [
      "木",
      "体",
      "巫",
      "杤",
      "李",
      "杢",
      "朽",
      "枦",
      "季",
      "委",
      "廿",
      "天",
      "札",
      "未",
      "禾",
      "丈",
      "太",
      "末",
      "夲",
      "大"
    ]
  }
]
