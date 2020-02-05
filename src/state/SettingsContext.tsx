// inspired by https://kentcdodds.com/blog/application-state-management-with-react

import { Plugins } from "@capacitor/core"
import React, { useReducer } from "react"

const { Storage } = Plugins

const SETTINGS_KEY = "settings"

export enum KanaDisplay {
  Kana = "かな",
  Romaji = "Romaji"
}

export enum QuizDifficulty {
  Easy = 4,
  Medium = 8,
  Hard = 12
}

export enum SettingsReducerActionType {
  RESET = 'Reset',
  UPDATE = 'Update'
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

async function setDeviceStorage(state: SettingsObj): Promise<void> {
  await Storage.set({
    key: SETTINGS_KEY,
    value: JSON.stringify(state)
  })
}

async function getDeviceStorage(): Promise<SettingsObj | null> {
  const { value } = await Storage.get({
    key: SETTINGS_KEY
  })

  return value && JSON.parse(value);
}

// this is a custom hook
export function useDeviceStorageSettingsLoader(): ()=>Promise<void> {
  const [, setSettings] = useSettings()

  const loadSettingsFromDeviceStorage = async () => {
    const cachedSettings = await getDeviceStorage()
    //console.log(cachedSettings);
    if(cachedSettings)
      setSettings([SettingsReducerActionType.UPDATE, cachedSettings])
  }

  return loadSettingsFromDeviceStorage;
}

//
// Context Setup
//

export type tSettingsContext = [SettingsObj, React.Dispatch<[
  SettingsReducerActionType,
  Partial<SettingsObj>
]>]

export const SettingsContext: React.Context<tSettingsContext> = React.createContext(
  // This one will not be used unless the context is referenced while providerless
  //useState(initialSettings)
  (undefined as unknown) as tSettingsContext
)

export function useSettings(): tSettingsContext {
  const context = React.useContext(SettingsContext)
  if (!context) throw new Error("useSettings must be used within a SettingsContext.Provider")
  return context
}


function settingsReducer (state: SettingsObj, [actionType, payload]: [
  SettingsReducerActionType,
  Partial<SettingsObj>
]): SettingsObj {
  switch(actionType) {
    case SettingsReducerActionType.UPDATE:
      const newState: SettingsObj = {...state, ...payload}
      setDeviceStorage(newState);
      if('darkThemeOn' in payload)
        document.body.classList.toggle("dark", payload.darkThemeOn)
      return newState;
    case SettingsReducerActionType.RESET:
    default:
      return {...initialSettings};
  }
}

export const SettingsProvider: React.FC<{}> = props => {
  //const [settings, setSettings] = useState(initialSettings)
  //const value = React.useMemo(() => [settings, setSettings], [settings])
  return (
    <SettingsContext.Provider value={
      useReducer( settingsReducer, initialSettings )
    } {...props} />
  )
}