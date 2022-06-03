import './PoemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { readFromLocalStorage } from '../LocalStorage_util'
import React from 'react'
import WordListItem from './WordListItem'

export default function List(props){

    let icon;
    let iconClassName;
    let iconAlt;

    /* Returns correct title and icon for a poemlist and a wordlist */
    function getListTitle(type){
        if(type === 'poems'){
            icon = 'poem-icon.png';
            iconClassName = 'poem-icon'
            iconAlt = 'Poemlist icon'
            return 'Saved Poems'
        }
        else if(type === 'words'){
            icon = 'word-icon.png';
            iconClassName = 'word-icon';
            iconAlt = 'Wordlist icon'
            return 'Saved Words'
        }
    }

    /* Reads the correct data from LocalStorage and renders it in the list */
    function printList(){
        if(props.type === 'poems'){
            return readFromLocalStorage(props.type).map(
                poem => <PoemListItem item={poem} deletePoemById={props.deletePoem} setPoemClick={props.setPoem} setPoemLoaded={props.setIsLoaded} />
            )
        }
        else if(props.type === 'words'){
            return readFromLocalStorage(props.type).map(
                word => <WordListItem item={word} deleteWordById={props.deleteWord} />
            )
        }
    }

    return(
        <div className='list-box' >
            <div className='list-box-title-container'>
                <h3 className='list-box-title'>{getListTitle(props.type)}</h3>
                <div className='list-icon-container'><img className={iconClassName} src={icon} alt={iconAlt} /></div>
            </div>
            <div className='list-scroll-box'>
                <ListGroup>
                    {printList()}
                </ListGroup>
            </div>
        </div>
    )
};


