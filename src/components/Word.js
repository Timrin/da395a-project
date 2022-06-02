import { OverlayTrigger, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import { useState } from "react";
import { getNewPoem, getWord } from "./api_util";

function Word(props) {
  const MAX_NUMBER_OF_WORD_DEFINITIONS = 2;
  let word = props.word;
  const [definition, setDefinition] = useState({
    status: false,
    word: "",
    phonetic: "",
    meanings: []
  });

  const onWordClick = (word) => {
    const adjustWord = word.replaceAll(',', '').replaceAll('!', '').replaceAll(';', '').replaceAll(':', '').replaceAll('"', '').replaceAll('?', '').replaceAll('.', '')
    getWord(adjustWord, setDefinition);
  }
  if (definition.status) {
    //If everything is ok

    return <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
      <Popover className="popoverWrap" placement="bottom" id="popover-basic" show={false}>
        <Popover.Header as="h4">Defnition of {word}</Popover.Header>
        <Popover.Body>
          {definition.phonetic}
          {definition.meanings.map((meaning, idx) => {
            let definitions = [];
            //Limit the number of definitions that can be shown in the popover
            //Only loop for MAX_NUMBER_OF_WORD_DEFINITIONS or less(as many as there are)
            let loop = meaning.definitions.length > MAX_NUMBER_OF_WORD_DEFINITIONS ? MAX_NUMBER_OF_WORD_DEFINITIONS : meaning.definitions.length
            for (let i = 0; i < loop; i++) {
              definitions.push(meaning.definitions[i])
            }
            return (
              <div key={idx}>
                <h5>{meaning.partOfSpeech}</h5>
                <ul>
                  {definitions.map((def, index) => <li key={index}>{def.definition}</li>)}
                </ul>
              </div>
            )
          })}
          <Button className="btn" variant="primary" onClick={() => { props.saveWord(definition) }}>Save Word</Button>
        </Popover.Body>
      </Popover>}><span onClick={() => onWordClick(word)}>{word} </span>
    </OverlayTrigger>

  } else {
    //Something went wrong with the definition or it's loading

    return <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
      <Popover className="popoverWrap" placement="bottom" id="popover-basic" show={false}>
        <Popover.Header as="h3">Defnition of {props.currentWord}</Popover.Header>
        <Popover.Body>
          {definition.message ?? "Loading"}
        </Popover.Body>
      </Popover>}><span onClick={() => onWordClick(word)}>{word} </span>
    </OverlayTrigger>
  }


}

export default Word;