exports.createGame = (word, timestamp) => {
   return {
       attempt: {
           value: '',
           isChecking: false,
           isError: false,
       },
       attempts: [],
       hints: [],
       keyboardHints: {
           '_': 'INCORRECT' // Initial value possibly required
       },
       hints: [],
       created: timestamp,
       isNewGameRequested: false,
       isComplete: false,
       isWon: false,
       word: word
   }
}