import './poemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { readFromLocalStorage } from '../../localStorage_util'
import React from 'react'
import WordListItem from './WordListItem'
import poemLogo from './Poem-logo.png'

export default function List(props){
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

    return(
        <div className='box' >
            <div className='box-header-container'>
                <h3 className='box-header'>{getTitle(props.type)}</h3>
                <div className='poem-logo-container'><img className='poem-logo' src={poemLogo} /></div>
            </div>
            <div className='scroll'>
                <ListGroup>
                    {printList()}
                </ListGroup>
            </div>
            
        </div>
    )
};


