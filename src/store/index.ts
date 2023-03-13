import { configureStore } from '@reduxjs/toolkit'
import hangmanSlice from './Hangman-slice'

const store = configureStore({
  reducer: {
    hangman: hangmanSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
