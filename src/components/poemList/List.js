import './poemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import { readPoemsFromLocalStorage } from '../../localStorage_util'

export default function List(props){
    return(
        <div className='box'>
            <h3>{getTitle(props.type)}</h3>
            <hr />

            <ListGroup>
                {printList(props)}
            </ListGroup>
        </div>
    )
};

function getTitle(type){
    if(type === 'poem'){
        return 'Saved Poems'
    }
    else if(type === 'word')
    {
        return 'Saved Words'
    }
}

function printList(props){
    if(props.type === 'poem'){
        return readPoemsFromLocalStorage().map(poem => <PoemListItem item={poem} />)
    }
    else if(props.type === 'word'){
        
    }
}
