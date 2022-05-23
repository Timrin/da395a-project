import './poemList_style.css'
import PoemListItem from './PoemListItem'
import ListGroup from 'react-bootstrap/ListGroup'

export default function PoemList(props){
    return(
        <div className='box'>
            <h3>Sparade dikter</h3>
            <hr />

            <ListGroup>
                {props.readPoems().map(poem => <PoemListItem item={poem} />)}
            </ListGroup>
        </div>
    )
};
