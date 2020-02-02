import { isSegmentPlaceholder, NormalWordSegment, PlaceholderSegment, QuizData } from "./QuizData"

describe("Quiz Data validations", () => {
  test("All kanji slugs are unique", () => {
    let setOfKanji = new Set(QuizData.map(item => item.kanjiSlug))

    expect([...setOfKanji].length).toStrictEqual(QuizData.length)
  })

  test("All kanji slugs are just one character long", () => {
    QuizData.forEach(item => {
      expect(item.kanjiSlug).toHaveLength(1)
    })
  })

  test("All lists of distractors are unique sets", () => {
    QuizData.forEach(item => {
      expect([...new Set(item.distractors)].length).toStrictEqual(item.distractors.length)
    })
  })

  test("All distractor kanji are just one character long", () => {
    QuizData.forEach(item => {
      item.distractors.forEach(distractor => {
        expect(distractor).toHaveLength(1)
      })
    })
  })

  test("Each kanji is not present in list of distractors", () => {
    QuizData.forEach(item => {
      expect(item.distractors).not.toContainEqual(item.kanjiSlug)
    })
  })

  test("Each list of distractors is at least 11 items long", () => {
    QuizData.forEach(item => {
      expect(item.distractors.length).toBeGreaterThanOrEqual(11)
    })
  })

  test("Strings in Quiz Items are not empty strings", () => {
    QuizData.forEach(item => {
      expect(item.kanjiSlug).not.toHaveLength(0)
      expect(item.meaning).not.toHaveLength(0)
      item.distractors.forEach(distractor => {
        expect(distractor).not.toHaveLength(0)
      })
    })
  })

  test("isSegmentPlaceholder works correctly", () => {
    const _NormalWordSegment: NormalWordSegment = { token: "じる", romaji: "jiru" }
    const _PlaceholderSegment: PlaceholderSegment = {
      token: null,
      furigana: "しん",
      romaji: "shin"
    }

    expect(isSegmentPlaceholder(_NormalWordSegment)).toBeFalsy()
    expect(isSegmentPlaceholder(_PlaceholderSegment)).toBeTruthy()
  })

  test("Each Quiz Item should have just one missing kanji", () => {
    QuizData.forEach(item => {
      const numPlaceholderSegments = item.japaneseQuery.filter(segment =>
        isSegmentPlaceholder(segment)
      ).length

      expect(numPlaceholderSegments).toStrictEqual(1)
    })
  })
})

// Data Checks:
//   - There are proper romaji, furigana glosses for everything
