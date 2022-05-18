export function getPoem(){
    fetch('https://poetrydb.org/random')
        .then(response => response.json())
        .then(poem => {
            writePoemToLocalStorage(poem);
        })
}

function writePoemToLocalStorage(inPoem){

}