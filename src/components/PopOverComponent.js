import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Popover, Button } from 'react-bootstrap';

export default function PopOverComponent(props){


  const [definition, setDefinition] = useState("");
  //TODO: expand on the content that we display in the popup, e.g. multiple definitions and phonetics

  //Only for testing
  const activeWord = props.word;

  //Get information from the API about definiton of a specific word
  const fetchWord = () => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + activeWord)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 404) {
          setDefinition("Could not find a definition for " + activeWord)
          return Promise.reject('error 404')
        } else {
          setDefinition("Something went wrong")
          return Promise.reject('some other error: ' + res.status)
        }
      })
      .then(
        (result) => {
          console.log(result)
          console.log("Definition " + definition)
          setDefinition(result[0].meanings[0].definitions[0].definition)
          console.log(result[0].meanings[0].definitions[0].definition)
        }, (error) => {
          console.log(error)
        }
      )
  }

  useEffect(() => {
    console.log("Fetch " + activeWord)
    if (activeWord !== undefined) {
      console.log("Fetching word")
      fetchWord()
    }
  });

  console.log(props.id)

  return(
    <Popover id={props.id}>
      <Popover.Header as="h3">Defnition of {props.word}</Popover.Header>
      <Popover.Body>
        {definition}
        <Button variant="primary">
          Save Word
        </Button>
      </Popover.Body>
    </Popover>
  )


}

