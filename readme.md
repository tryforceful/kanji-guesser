# Kanji Guesser

by [@tryforceful](http://www.github.com/tryforceful)

![Netlify](https://img.shields.io/netlify/c3e9fc64-5be8-44ac-a0e7-fb0e244fd3dc) [![CircleCI](https://circleci.com/gh/tryforceful/kanji-guesser.svg?style=shield&circle-token=614332bd0c386a59c83e47b62189da9cc74450af)](https://circleci.com/gh/tryforceful/kanji-guesser) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![codecov](https://codecov.io/gh/tryforceful/kanji-guesser/branch/master/graph/badge.svg?token=KISxKZbenc)](https://codecov.io/gh/tryforceful/kanji-guesser) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**Kanji Guesser** is an Ionic React web & mobile app aimed at improving your Japanese reading skills.


[Try the live web version now!](http://kanji-guesser.netlify.com)

> This app is under active development as of February 2020.

<center>

![logoimage]

</center>

## About This App

This app is a Japanese language learning tool designed to improve your kanji recognition skills and help you discern between similar-looking kanji. **Kanji** (漢字) are Japanese symbols that were borrowed from the Chinese writing system. There are thousands of different kanji, many of which are visually similar and hard to distinguish or recall for the non-native learner. This app aids you in distinguishing kanji by prompting you to choose the correct kanji for Japanese vocabulary words you already know.

In the Kanji Quiz, words will be shown to you on a series of flashcards with a kanji character missing from each word. You must choose the correct kanji from the available choices. You can configure the number of kanji choices presented to you in order to adjust the quiz difficulty. A reading gloss is provided to you as a hint either in **kana** (Japanese characters, かな) or **romaji** (English letters).

![example_screenshots]

## Build Steps

This app is built in React with Ionic 4 + Capacitor.

1. Clone this repo
2. `yarn install`
3. `yarn serve` to run locally
4. `yarn build` to create a production web build
5. Steps for native app builds forthcoming

## Credits

Data from this app is partially sourced from [@larsyencken's great work](https://github.com/larsyencken/simsearch) on kanji similarity.

[logoimage]: /public/assets/KanjiGuesser_Logo.png "Kanji Guesser App Logo"
[example_screenshots]: /public/assets/kanji-guesser-screencap.png