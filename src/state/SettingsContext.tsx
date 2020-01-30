// inspired by https://kentcdodds.com/blog/application-state-management-with-react

import React, { useState } from "react"

export enum KanaDisplay {
  Kana = "かな",
  Romaji = "Romaji"
}

export enum QuizDifficulty {
  Easy = 4,
  Medium = 8,
  Hard = 12
}

export interface SettingsObj {
  darkThemeOn: boolean
  kanaDisplayChoice: KanaDisplay
  quizDifficulty: QuizDifficulty
}

export const initialSettings: SettingsObj = {
  darkThemeOn: false,
  kanaDisplayChoice: KanaDisplay.Kana,
  quizDifficulty: QuizDifficulty.Medium
}

export type SettingsContext = [SettingsObj, React.Dispatch<React.SetStateAction<SettingsObj>>]

export const SettingsContext: React.Context<SettingsContext> = React.createContext(
  // This one will not be used unless the context is refrenced while providerless
  //useState(initialSettings)
  (undefined as unknown) as SettingsContext
)

function useSettings(): SettingsContext {
  const context = React.useContext(SettingsContext)
  if (!context) throw new Error("useSettings must be used within a SettingsContext.Provider")
  return context
}

const SettingsProvider: React.FC<{}> = props => {
  //const [settings, setSettings] = useState(initialSettings)
  //const value = React.useMemo(() => [settings, setSettings], [settings])
  return <SettingsContext.Provider value={useState(initialSettings)} {...props} />
}

export { SettingsProvider, useSettings }
