import './poemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { readPoemsFromLocalStorage } from '../../localStorage_util'
import { useState } from 'react'
import React from 'react'


export default function List(props){

    function getTitle(type){
        if(type === 'poem'){
            return 'Saved Poems'
        }
        else if(type === 'word')
        {
            return 'Saved Words'
        }
    }

    function printList(){
        if(props.type === 'poem'){
            return readPoemsFromLocalStorage().map(
                poem => <PoemListItem item={poem} />
            )
        }
        else if(props.type === 'word'){
            //TODO read words from LocalStorage
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


