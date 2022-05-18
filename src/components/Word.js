import React from "react";

export default function Word() {

  const testWord = "Hello";

  const fetchWord = () => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + testWord)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result[0].meanings[0].definitions[0].definition)
      }, (error) => {
        console.log(error)
      }
    )
  }

  return (
    <div>
      <button onClick={() => {fetchWord()}}>Hej</button>
    </div>
  )

}