import React from 'react'
import KanjiButton from './KanjiButton';
import { SettingsProvider } from '../state/SettingsContext';

//import renderer from 'react-test-renderer'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

// import ReactDOM from "react-dom";
// import { act } from "react-dom/test-utils";

describe("Kanji Button tests", function() {

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
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
  
  test('renders without crashing', () => {
    const { baseElement, unmount } = render(
    <SettingsProvider>
      <KanjiButton
        thisButtonsKanji="信"
        correctChoice="b"
        userChoice={null}
        onClick={()=>{}}
      />
    </SettingsProvider>
    );
    expect( baseElement ).toBeDefined();
    unmount();
  });

  test('button changes when user makes a choice', () => {

    //let component: renderer.ReactTestRenderer;
    const { baseElement, unmount, debug, rerender, getByText } = render(
        <SettingsProvider>
          <KanjiButton
            thisButtonsKanji="信"
            correctChoice="b"
            userChoice={null}
            onClick={()=>{}}
          />
        </SettingsProvider>
        );
    debug();

    expect(baseElement).toBeInTheDocument();

      // toJSON, toTree, update, unmount, getInstance, root
    expect(baseElement).toMatchSnapshot();

    // incorrect choice
    rerender(
        <SettingsProvider>
          <KanjiButton
            thisButtonsKanji="信"
            correctChoice="b"
            userChoice={"a"}
            onClick={()=>{}}
          />
        </SettingsProvider>
    );

    expect(baseElement).toMatchSnapshot();
    let _button = getByText("信")
    expect(_button).not.toHaveClass("selected");
    expect(_button).toHaveAttribute("color", "danger");

    // correct choice
    rerender(
        <SettingsProvider>
          <KanjiButton
            thisButtonsKanji="b"
            correctChoice="b"
            userChoice={"a"}
            onClick={()=>{}}
          />
        </SettingsProvider>
    );
    expect(baseElement).toMatchSnapshot();
    _button = getByText("b")
    expect(_button).not.toHaveClass("selected");
    expect(_button).toHaveAttribute("color", "success");

    unmount();
  });
})