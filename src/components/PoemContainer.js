import { useState, useEffect } from "react";
import { OverlayTrigger, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import "./App.css";

function PoemContainer(props) {

    const [poem, setPoem] = useState();
    const [currentWord, setCurrentWord] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [definition, setDefinition] = useState({
        status: false,
        word: "",
        phonetic: "",
        meanings: []
    });
    const MAX_NUMBER_OF_WORD_DEFINITIONS = 2;

    const fetchPoem = () => {
        fetch("https://poetrydb.org/random")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    //Poems are returned in an array, even if it is just one.
                    setPoem(result[0]);
                }, (error) => {
                    setIsLoaded(true);
                    console.log(error)
                }
            )
    }

    const fetchWord = (word) => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else if (res.status === 404) {
                    setDefinition({status: false, message: ("Could not find a definition for " + word)})
                    return Promise.reject('error 404')
                } else {
                    setDefinition({status: false, message: "Something went wrong. " + res.status})
                    return Promise.reject('some other error: ' + res.status)
                }
            })
            .then(
                (result) => {
                    console.log(result)
                    console.log("Definition " + definition)

                    console.log("-----------------------------------------");

                    //Save dictionary data that we are interested in, in a dictionary entry
                    let dictionaryEntry = {};
                    dictionaryEntry.word = result[0].word;
                    dictionaryEntry.phonetic = result[0].phonetic;
                    dictionaryEntry.meanings = result[0].meanings;
                    dictionaryEntry.status = true;

                    console.log(dictionaryEntry)
                    setDefinition(dictionaryEntry);

                    console.log("-----------------------------------------");

                }, (error) => {
                    console.log(error)
                }
            )
    }

    const onWordClick = (word) => {
        const adjustWord = word.replaceAll(',', '').replaceAll('!', '').replaceAll(';', '').replaceAll(';', '').replaceAll('"', '').replaceAll('?', '').replaceAll('.', '')
        setCurrentWord(adjustWord);
        fetchWord(adjustWord);
    }

    //Note: This triggers twice when React.StrictMode is active
    //This loads a poem when initially loading the site
    useEffect(() => {
        fetchPoem()
    }, [])

    if (isLoaded) {
        return (
            <div className="PoemContainer">
                <button onClick={() => { fetchPoem() }}>Another Poem</button>
                <h2 className="title">{poem.title}</h2>
                <h3 className="author">by <span>{poem.author.toUpperCase()}</span></h3>
                {
                    poem.lines.map((line, index) => {
                        return <p key={index} className="line">
                            {
                                line.split(" ").map((word, index) => {
                                    if (definition.status) {
                                        //If everything is ok

                                        return <OverlayTrigger rootClose trigger="click" placement="right" overlay={
                                            <Popover className="popoverWrap" placement="right" id="popover-basic" show={false}>
                                                <Popover.Header as="h3">Defnition of {currentWord}</Popover.Header>
                                                <Popover.Body>
                                                    {definition.phonetic}
                                                    {definition.meanings.map(meaning => {
                                                        let definitions = [];
                                                        //Only loop for MAX_NUMBER_OF_WORD_DEFINITIONS or less 
                                                        let loop = meaning.definitions.length > MAX_NUMBER_OF_WORD_DEFINITIONS ? MAX_NUMBER_OF_WORD_DEFINITIONS : meaning.definitions.length
                                                        for (let i = 0; i < loop; i++) {
                                                            definitions.push(meaning.definitions[i])
                                                        }
                                                        return (
                                                            <div>
                                                                <h6>{meaning.partOfSpeech}</h6>
                                                                <ul>
                                                                    {definitions.map((definition, index) => <li key={index}>{definition.definition}</li>)}
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                    <Button variant="primary">
                                                        Save Word
                                                    </Button>
                                                </Popover.Body>
                                            </Popover>}><span onClick={() => onWordClick(word)}>{word} </span>
                                        </OverlayTrigger>

                                    } else {
                                        //Something went wrong with the definition

                                        return <OverlayTrigger rootClose trigger="click" placement="right" overlay={
                                            <Popover className="popoverWrap" placement="right" id="popover-basic" show={false}>
                                                <Popover.Header as="h3">Defnition of {currentWord}</Popover.Header>
                                                <Popover.Body>
                                                    {definition.message ?? "Loading"}
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


