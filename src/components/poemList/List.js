import './poemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { readFromLocalStorage } from '../../localStorage_util'
import React from 'react'
import WordListItem from './WordListItem'
import poemLogo from './Poem-logo.png'
import wordLogo from './word-star.png'

export default function List(props){

    let logo;
    let logoClassName = "";

    function getTitle(type){
        if(type === 'poems'){
            return 'Saved Poems'
        }
        else if(type === 'words')
        {
            return 'Saved Words'
        }
    }

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

    if(props.type === 'poems'){
        logo = poemLogo;
        logoClassName = 'poem-logo'
    }
    else if(props.type === 'words'){
        logo = wordLogo;
        logoClassName = 'word-logo';
    }

    return(
        <div className='box' >
            <div className='box-header-container'>
                <h3 className='box-header'>{getTitle(props.type)}</h3>
                <div className='poem-logo-container'><img className={logoClassName} src={logo} /></div>
            </div>
            <div className='scroll'>
                <ListGroup>
                    {printList()}
                </ListGroup>
            </div>
            
        </div>
    )
};


