import { useSelector } from 'react-redux'
import Drawing, { BODY_PARTS } from './Drawing'
import Keyboard from './Keyboard'
import NewGameBtn from './NewGameBtn'

const TRIES__LEFT = BODY_PARTS.length

const Hangman = () => {
  const { guessedLetters, toGuessWord } = useSelector(
    (state: any) => state.hangman
  )

  const incorrectLetters = guessedLetters.filter(
    (letter: string) => !toGuessWord.includes(letter)
  )
  const correctLetters = guessedLetters.filter((letter: string) =>
    toGuessWord.includes(letter)
  )

  const hasLost = incorrectLetters.length >= TRIES__LEFT
  const hasWon = toGuessWord
    .split('')
    .every((l: string) => guessedLetters.includes(l))

  return (
    <>
      <Drawing incorrectLetters={incorrectLetters} hasLost={hasLost} />
      <NewGameBtn />
      <Keyboard
        hasLost={hasLost}
        hasWon={hasWon}
        incorrectLetters={incorrectLetters}
        correctLetters={correctLetters}
      />
    </>
  )
}
export default Hangman
