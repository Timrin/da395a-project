import ListGroup from 'react-bootstrap/ListGroup'
import './poemList_style.css'

export default function PoemListItem(props) {
    return(
        <span onClick={() => {
            props.setPoemClick(props.item);
            props.setPoemLoaded(true);
        }}>
            <ListGroup.Item>
                <p>{props.item.title} | {props.item.author} <span className='delete' onClick={() => {
                    props.deletePoemById(props.item.id);
                }}>X</span></p>
                <hr />    
            </ListGroup.Item>
        </span>
    )
}