//import "@testing-library/jest-dom/extend-expect"
//import renderer from 'react-test-renderer'
import { render } from "@testing-library/react"
import React from "react"
import { SettingsProvider } from "../state/SettingsContext"
import KanjiButton from "./KanjiButton"

// import ReactDOM from "react-dom";
// import { act } from "react-dom/test-utils";

describe("Kanji Button tests", function() {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  // let container;
  // beforeEach(() => {
  //   container = document.createElement("div");
  //   document.body.appendChild(container);
  // });

  // afterEach(() => {
  //   document.body.removeChild(container);
  //   container = null;
  // });

  test("renders without crashing", () => {
    const { baseElement, unmount, getByText } = render(
      <SettingsProvider>
        <KanjiButton thisButtonsKanji="信" correctChoice="b" userChoice={null} onClick={() => {}} />
      </SettingsProvider>
    )
    expect(baseElement).toBeDefined()
    const _button = getByText("信")
    unmount()
    expect(_button).not.toBeInTheDocument()
  })

  test("button when user hasn't chosen yet", () => {
    const { baseElement, getByText } = render(
      <SettingsProvider>
        <KanjiButton
          thisButtonsKanji="信"
          correctChoice="私"
          userChoice={null}
          onClick={() => {}}
        />
      </SettingsProvider>
    )

    const _button = getByText("信")
    expect(_button).not.toHaveClass("selected")
    expect(_button).toHaveAttribute("color", "primary")

    // toJSON, toTree, update, unmount, getInstance, root
    expect(baseElement).toMatchSnapshot()
  })

  test("user pressed another button", () => {
    // incorrect choice
    const { baseElement, getByText } = render(
      <SettingsProvider>
        <KanjiButton thisButtonsKanji="信" correctChoice="b" userChoice={"a"} onClick={() => {}} />
      </SettingsProvider>
    )

    expect(baseElement).toMatchSnapshot()
    const _button = getByText("信")
    expect(_button).not.toHaveClass("selected")
    expect(_button).toHaveAttribute("color", "danger")
  })

  test("user pressed another button, but this one was correct", () => {
    // correct choice
    const { baseElement, getByText } = render(
      <SettingsProvider>
        <KanjiButton thisButtonsKanji="b" correctChoice="b" userChoice={"a"} onClick={() => {}} />
      </SettingsProvider>
    )
    expect(baseElement).toMatchSnapshot()
    const _button = getByText("b")
    expect(_button).not.toHaveClass("selected")
    expect(_button).toHaveAttribute("color", "success")
  })
})

//expect toBeDisabled
