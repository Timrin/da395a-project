import './poemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { readFromLocalStorage } from '../../localStorage_util'
import { useState } from 'react'
import React from 'react'
import WordListItem from './WordListItem'


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
                poem => <PoemListItem item={poem} />
            )
        }
        else if(props.type === 'words'){
            return readFromLocalStorage(props.type).map(
                word => <WordListItem item={word} />
            )
        }
    }

    return(
        <div className='box' >
            <h3>{getTitle(props.type)}</h3>
            <hr />

            <ListGroup>
                {printList()}
            </ListGroup>
        </div>
    )
};


