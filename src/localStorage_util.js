function getPoem(){
    fetch('https://poetrydb.org/random')
        .then(response => response.json())
        .then(poem => {return poem})
}

