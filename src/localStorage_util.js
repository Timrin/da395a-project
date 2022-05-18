export function getPoem(){
    fetch('https://poetrydb.org/random')
        .then(response => response.json())
        .then(poem => {
            writePoemToLocalStorage(poem);
        })
}

function writePoemToLocalStorage(inPoem){
    const poems = readPoemsFromLocalStorage();

    poems.push({
        title:inPoem[0].title,
        author:inPoem[0].author,
        lines:inPoem[0].lines
    });

    let jsonPoems = JSON.stringify(poems);
    localStorage.setItem("poems", jsonPoems);

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