import { useEffect } from "react";
import { Button } from 'react-bootstrap';
import { getNewPoem } from "./api_util";
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
                <div className="btnContainer">
                    <Button className="btn" onClick={() => { getNewPoem(props.setPoem, props.setIsLoaded) }}>New Poem</Button>
                    <Button className="btn" onClick={() => { props.savePoem(props.poem) }}><span className="material-icons">turned_in</span></Button>
                </div>
                
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


