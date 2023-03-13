import { createSlice } from '@reduxjs/toolkit'
import WordsList from './WordsList.json'

const TIME__LIMIT = 15
const LIFES = 4

const getNewWord = () => {
  return WordsList[Math.floor(Math.random() * WordsList.length)]
}

type InitialStateType = {
  toGuessWord: string
  guessedLetters: string[]
  score: number
  lifes: number
  highestScore: number
  remainingTime: number
  keyHint: string | null
}

const initialState: InitialStateType = {
  toGuessWord: getNewWord(),
  guessedLetters: [],
  score: 0,
  lifes: LIFES,
  highestScore: 0,
  remainingTime: TIME__LIMIT,
  keyHint: null,
}

const hangmanSlice = createSlice({
  name: 'hangman',
  initialState,
  reducers: {
    updateToGuessWord: (state) => {
      state.toGuessWord = getNewWord()
    },
    addGuessedLetter: (state, action) => {
      state.guessedLetters.push(action.payload)
    },
    resetGuessedLetters: (state) => {
      state.guessedLetters = []
    },
    addScore: (state) => {
      state.score += 1
    },
    resetScore: (state) => {
      state.score = 0
    },
    decreaseLife: (state) => {
      state.lifes -= 1
    },
    resetLifes: (state) => {
      state.lifes = LIFES
    },
    setHighestScore: (state, action) => {
      state.highestScore = action.payload
      localStorage.setItem(
        'hangman-highest-score',
        JSON.stringify(action.payload)
      )
    },
    decreaseRemainingTime: (state) => {
      state.remainingTime -= 1
    },
    resetRemainingTime: (state) => {
      state.remainingTime = TIME__LIMIT
    },
    setKeyHint: (state, action) => {
      state.keyHint = action.payload
    },
    resetKeyHint: (state) => {
      state.keyHint = null
    },
  },
})

export const {
  addGuessedLetter,
  addScore,
  decreaseLife,
  decreaseRemainingTime,
  resetGuessedLetters,
  resetKeyHint,
  resetLifes,
  resetRemainingTime,
  resetScore,
  setHighestScore,
  setKeyHint,
  updateToGuessWord,
} = hangmanSlice.actions
export default hangmanSlice
