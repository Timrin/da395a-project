import { useState, useEffect } from "react";
import { OverlayTrigger, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'
import PopOverComponent from "./PopOverComponent.js";

function PoemContainer(props) {

    const [poem, setPoem] = useState();
    const [currentWord, setCurrentWord] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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

    const onWordClick = (word) => {
        setCurrentWord(word);
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
                                    return <>
                                        {currentWord === index ? 
                                        <OverlayTrigger trigger="click" placement="right" overlay={
                                            <Popover placement="right" show={currentWord === index} id="popover-basic">
      <Popover.Header as="h3">Defnition of {props.word}</Popover.Header>
      <Popover.Body>
        test
        <Button variant="primary">
          Save Word
        </Button>
      </Popover.Body>
    </Popover> }><span>{word} </span></OverlayTrigger>:  <span onClick={() => onWordClick(index)}>
                                        {word + " "}
                                    </span>}
                    
                                       
        
                                  </>
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


