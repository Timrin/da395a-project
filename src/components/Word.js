
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';


export default function Word(props) {
  //Definiton of a word.
  const [definition, setDefinition] = useState("");
  //TODO: expand on the content that we display in the popup, e.g. multiple definitions and phonetics

  //Only for testing
  const activeWord = props.word;

  //Action for the modal
  const handleClose = () => {
    props.setModalActive(false);
  };

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
  })

  return (
    <div>
      <Modal show={props.modalActive} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Definition of {props.word}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{definition}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Word
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}