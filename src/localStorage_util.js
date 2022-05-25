export function writePoemToLocalStorage(inPoem){
    const poems = readFromLocalStorage('poems');

    const newId = poems.length > 0 ? poems[poems.length - 1].id +1 : 1;

    poems.push({
        id:newId,
        title:inPoem.title,
        author:inPoem.author,
        lines:inPoem.lines
    });

    let jsonPoems = JSON.stringify(poems);
    localStorage.setItem("poems", jsonPoems);

}

export function writeWordToLocalStorage(inWord){
    const words = readFromLocalStorage('words');

    words.push({
        word:inWord.word,
        phonetic:inWord.phonetic,
        meanings:inWord.meanings,
        status:inWord.status
    });

    let jsonWords = JSON.stringify(words);
    localStorage.setItem('words', jsonWords);
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

export function deleteFromLocalStorage(type, inId){
    if(type === 'poems'){
        const poems = readFromLocalStorage('poems');
        var after = poems.filter((poem) => poem.id != inId);
        localStorage.setItem('poems', JSON.stringify(after));
    }
}