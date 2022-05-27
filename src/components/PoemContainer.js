import { useState, useEffect } from "react";
import { OverlayTrigger, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import { getNewPoem, getWord } from "./api_util";
import "./App.css";

function PoemContainer(props) {
    const MAX_NUMBER_OF_WORD_DEFINITIONS = 2;

    const onWordClick = (word) => {
        const adjustWord = word.replaceAll(',', '').replaceAll('!', '').replaceAll(';', '').replaceAll(':', '').replaceAll('"', '').replaceAll('?', '').replaceAll('.', '')
        props.setCurrentWord(adjustWord);
        getWord(adjustWord, props.setDefinition);
    }

    //Note: This triggers twice when React.StrictMode is active
    //This loads a poem when initially loading the site
    useEffect(() => {
            getNewPoem(props.setPoem, props.setIsLoaded);
    }, [])


    if (props.isLoaded) {
        return (
            <div className="PoemContainer">
                <button class="btn" onClick={() => { getNewPoem(props.setPoem, props.setIsLoaded) }}>New Poem</button>
                <button class="btn" onClick={() => { props.savePoem(props.poem) }}><span class="material-icons">turned_in</span></button>
                <h2 className="title">{props.poem.title}</h2>
                <h3 className="author">by <span>{props.poem.author.toUpperCase()}</span></h3>
                {
                    props.poem.lines.map((line, index) => {
                        return <p key={index} className="line">
                            {
                                line.split(" ").map((word, index) => {
                                    if (props.definition.status) {
                                        //If everything is ok

                                        return <OverlayTrigger rootClose trigger="click" placement="right" overlay={
                                            <Popover className="popoverWrap" placement="right" id="popover-basic" show={false}>
                                                <Popover.Header as="h4">Defnition of {props.currentWord}</Popover.Header>
                                                <Popover.Body>
                                                    {props.definition.phonetic}
                                                    {props.definition.meanings.map(meaning => {
                                                        let definitions = [];
                                                        //Only loop for MAX_NUMBER_OF_WORD_DEFINITIONS or less 
                                                        let loop = meaning.definitions.length > MAX_NUMBER_OF_WORD_DEFINITIONS ? MAX_NUMBER_OF_WORD_DEFINITIONS : meaning.definitions.length
                                                        for (let i = 0; i < loop; i++) {
                                                            definitions.push(meaning.definitions[i])
                                                        }
                                                        return (
                                                            <div>
                                                                <h5>{meaning.partOfSpeech}</h5>
                                                                <ul>
                                                                    {definitions.map((definition, index) => <li key={index}>{definition.definition}</li>)}
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                    <Button class="btn" variant="primary" onClick={() => {props.saveWord(props.definition)}}>Save Word</Button>
                                                </Popover.Body>
                                            </Popover>}><span onClick={() => onWordClick(word)}>{word} </span>
                                        </OverlayTrigger>

                                    } else {
                                        //Something went wrong with the definition

                                        return <OverlayTrigger rootClose trigger="click" placement="right" overlay={
                                            <Popover className="popoverWrap" placement="right" id="popover-basic" show={false}>
                                                <Popover.Header as="h3">Defnition of {props.currentWord}</Popover.Header>
                                                <Popover.Body>
                                                    {props.definition.message ?? "Loading"}
                                                </Popover.Body>
                                            </Popover>}><span onClick={() => onWordClick(word)}>{word} </span>
                                        </OverlayTrigger>
                                    }
                                    
                                })
                            }
                        </p>
                    })
                }
            </div>
        );
    } else {
        //Return placeholder if poem hasn't loaded yet.
        return (
            <div className="PoemContainer">
                <h2>Loading</h2>
            </div>
        );
    }
}

export default PoemContainer;


