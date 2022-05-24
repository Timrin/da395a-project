import { useState, useEffect } from "react";
import { OverlayTrigger, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'

function PoemContainer(props) {

    const [poem, setPoem] = useState();
    const [currentWord, setCurrentWord] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [definition, setDefinition] = useState(false);

    var reload = false;

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
              setDefinition("Could not find a definition for " + word)
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

    const onWordClick = (word) => {
        const adjustWord = word.replaceAll(',', '').replaceAll('!', '').replaceAll(';', '').replaceAll(';', '').replaceAll('"', '').replaceAll('?', '').replaceAll('.', '')
        setCurrentWord(adjustWord);
        fetchWord(adjustWord);
    }

    //Note: This triggers twice when React.StrictMode is active
    //This loads a poem when initially loading the site
    useEffect(() => {
            fetchPoem();
    }, [])

    if (isLoaded) {
        return (
            <div className="PoemContainer">
                <button onClick={() => { fetchPoem() }}>Another Poem</button>
                <button onClick={() => { props.savePoem(poem) }}>Save Poem</button>
                <h2 className="title">{poem.title}</h2>
                <h3 className="author">by <span>{poem.author.toUpperCase()}</span></h3>
                {
                    poem.lines.map((line, index) => {
                        return <p key={index} className="line">
                            {
                                line.split(" ").map((word, index) => {
                                    return <OverlayTrigger rootClose trigger="click" placement="right" overlay={
                                            <Popover placement="right" id="popover-basic" show={false}>
                                                <Popover.Header as="h3">Defnition of {currentWord}</Popover.Header>
                                                <Popover.Body>
                                                    {definition}
                                                    <Button variant="primary">
                                                        Save Word
                                                    </Button>
                                                </Popover.Body>
                                            </Popover>}><span onClick={() => onWordClick(word)}>{word} </span>
                                            </OverlayTrigger>
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


