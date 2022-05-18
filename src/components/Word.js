
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';


export default function Word() {
  //Action for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Definiton of a word.
  const [definition, setDefinition] = useState([]);

  //Only for testing
  const testWord = "Bottle";

  //Get information from the API about definiton of a specific word
  const fetchWord = () => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + testWord)
    .then(res => res.json())
    .then(
      (result) => {
        setDefinition(result[0].meanings[0].definitions[0].definition)
        console.log(result[0].meanings[0].definitions[0].definition)
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
      <Button className="nextButton" onClick={handleShow}>
        A specific word
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Definition of {testWord}</Modal.Title>
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