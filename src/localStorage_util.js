export function getPoem(){
    fetch('https://poetrydb.org/random')
        .then(response => response.json())
        .then(poem => {
            writePoemToLocalStorage(poem);
        })
}

function writePoemToLocalStorage(inPoem){

}

function readPoemsFromLocalStorage(){
    let poems = localStorage.getItem("poems");

    if(poems == null){
        localStorage.setItem("poems", JSON.stringify([]))
        return [];
    }else{
        return JSON.parse(poems);
    }
}