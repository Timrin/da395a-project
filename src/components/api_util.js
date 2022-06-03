//A file that handles all communication with both APIs

//Sending a request to poetrydb that returns a random poem
export function getNewPoem(setPoem, setIsLoaded){
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

//Sending a request to dictionaryapi that returns definitions about a specific word
export function getWord(word, setDefinition){
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

                //Save dictionary data that we are interested in, in a dictionary entry
                let dictionaryEntry = {};
                dictionaryEntry.word = result[0].word;
                dictionaryEntry.phonetic = result[0].phonetic;
                dictionaryEntry.meanings = result[0].meanings;
                dictionaryEntry.status = true;

                setDefinition(dictionaryEntry);

            }, (error) => {
                console.log(error)
            }
        )
}