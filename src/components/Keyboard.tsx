import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { RootState } from '../store'

import {
  addGuessedLetter,
  addScore,
  decreaseLife,
  resetGuessedLetters,
  resetKeyHint,
  resetRemainingTime,
  updateToGuessWord,
} from '../store/Hangman-slice'

const KEYBOARD_KEYS = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'empty-space',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'empty-space',
  'empty-space',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  'Next',
]

type Props = {
  hasLost: boolean
  hasWon: boolean
  incorrectLetters: string[]
  correctLetters: string[]
}

const Keyboard = ({
  hasLost,
  hasWon,
  incorrectLetters,
  correctLetters,
}: Props) => {
  const dispatch = useDispatch()
  const { guessedLetters, lifes, score, keyHint } = useSelector(
    (state: RootState) => state.hangman
  )

  const handleNextWord = () => {
    // confirm modal logic
    if (!hasLost && !hasWon) {
      if (guessedLetters.length > 0 || score > 0) {
        // dispatch(setShowConfirmModal(true))
        // dispatch(
        //   setConfirmModalText(
        //     'You will loose 1 life! Are you sure you want to procced?'
        //   )
        // )
        return
      }
    }
    // end confirm modal logic

    if (hasWon) dispatch(addScore())

    if (!hasWon || hasLost) dispatch(decreaseLife())

    dispatch(updateToGuessWord())
    dispatch(resetGuessedLetters())
    dispatch(resetRemainingTime())
    dispatch(resetKeyHint())
  }

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const pressedKey = e.key

      if (guessedLetters.includes(pressedKey)) return
      if (pressedKey.match(/^[a-zA-Z]$/)) {
        addGuessedLetter(pressedKey)
      }

      if (pressedKey === 'Enter') {
        // if (lifes === 0) handleNewGame()
        if (lifes > 0) handleNextWord()
      }
    }
    document.addEventListener('keypress', handleKeyPress)

    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [guessedLetters, handleNextWord, lifes])

  return (
    <div className='hangman-keyboard'>
      {KEYBOARD_KEYS.map((key, index) => {
        const isWrong = incorrectLetters.includes(key)
        const isCorrect = correctLetters.includes(key)
        const isKeyDisabled =
          hasLost || hasWon || lifes === 0 || isWrong || isCorrect
        const isNextKeyDisabled = lifes === 0
        let shouldShowHint = keyHint === key
        if (isCorrect) shouldShowHint = false

        if (key === 'Next') {
          return (
            <button
              key={key}
              onClick={() => handleNextWord()}
              className={`hangman-keyboard__key  hangman-keyboard__key--next-word ${
                isKeyDisabled && lifes > 0 ? 'hangman-keyboard__key--pulse' : ''
              } ${shouldShowHint ? 'hangman-keyboard__key--hint' : ''} ${
                isNextKeyDisabled ? 'hangman-keyboard__key--no-hover' : ''
              }`}
              disabled={isNextKeyDisabled}
            >
              {key}
            </button>
          )
        }

        if (key === 'empty-space') return <div key={index}></div>

        return (
          <button
            onClick={() => addGuessedLetter(key)}
            key={key}
            className={`hangman-keyboard__key ${
              isWrong ? 'hangman-keyboard__key--wrong' : ''
            } ${isKeyDisabled ? 'hangman-keyboard__key--no-hover' : ''} ${
              isCorrect ? 'hangman-keyboard__key--correct' : ''
            } ${
              shouldShowHint && !hasLost ? 'hangman-keyboard__key--hint' : ''
            } `}
            disabled={isKeyDisabled}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
export default Keyboard
