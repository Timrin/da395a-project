import { useState, useEffect } from "react";

function PoemContainer() {

    const [poem, setPoem] = useState();
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

    //Note: This triggers twice when React.StrictMode is active
    //This loads a poem when initially loading the site
    useEffect(() => {
        fetchPoem()
    }, [])

    if (isLoaded) {
        return (
            <div className="PoemContainer">
                <h2 className="title">{poem.title}</h2>
                <h3 className="author">by <span>{poem.author.toUpperCase()}</span></h3>
                {
                    poem.lines.map((line, index) => <p key={index} className="line">{line}</p>)
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
