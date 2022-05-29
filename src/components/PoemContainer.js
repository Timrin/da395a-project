import { useState, useEffect } from "react";
import { OverlayTrigger, Button } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import { getNewPoem, getWord } from "./api_util";
import Word from "./Word"
import "./App.css";

function PoemContainer(props) {

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
                                line.split(" ").map((word, index) => <Word word={word} key={index} saveWord={props.saveWord}/>)
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


