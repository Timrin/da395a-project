export function writePoemToLocalStorage(inPoem){
    const poems = readFromLocalStorage('poems');

    poems.push({
        title:inPoem.title,
        author:inPoem.author,
        lines:inPoem.lines
    });

    let jsonPoems = JSON.stringify(poems);
    localStorage.setItem("poems", jsonPoems);

}

export function readFromLocalStorage(type){
    
    let array = localStorage.getItem(type);

    if(array == null){
        localStorage.setItem(type, JSON.stringify([]))
        return [];
    }else{
        return JSON.parse(array);
    }
}