//A file that handles all communication with LocalStorage
export function writePoemToLocalStorage(inPoem){
    const poems = readFromLocalStorage('poems');

    if (!poems.some(e => e.title === inPoem.title)) {
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
    else{
        alert("You already saved this poem!")
    }
}

export function writeWordToLocalStorage(inWord){
    const words = readFromLocalStorage('words');

    if (!words.some(e => e.word === inWord.word)) {
        const newId = words.length > 0 ? words[words.length - 1].id +1 : 1;

        words.push({
            id:newId,
            word:inWord.word,
            phonetic:inWord.phonetic,
            meanings:inWord.meanings,
            status:inWord.status
        });

        let jsonWords = JSON.stringify(words);
        localStorage.setItem('words', jsonWords);
    }
    else{
        alert("You already saved this word!")
    }
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
    else if(type === 'words'){
        const words = readFromLocalStorage('words');
        var after = words.filter((word) => word.id != inId);
        localStorage.setItem('words', JSON.stringify(after));
    }
}