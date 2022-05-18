
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';


export default function Word(props) {
  //Action for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => props.setModalActive(false);
  const handleShow = () => setShow(true);

  //Definiton of a word.
  const [definition, setDefinition] = useState([]);

  //Only for testing
  const testWord = props.word;

  //Get information from the API about definiton of a specific word
  const fetchWord = () => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + testWord)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.ok){
          setDefinition(result[0].meanings[0].definitions[0].definition)
          console.log(result[0].meanings[0].definitions[0].definition)
        } else{
          setDefinition("Tyvärr kunde vi inte hitta en beskrivning för det ordet")
          console.log("Tyvärr kunde vi inte hitta en beskrivning för det ordet")
        }
      }, (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    fetchWord()
  }, [])

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