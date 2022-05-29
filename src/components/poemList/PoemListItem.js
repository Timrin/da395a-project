import ListGroup from 'react-bootstrap/ListGroup'
import './poemList_style.css'

export default function PoemListItem(props) {
    return(
        <span onClick={() => {
            props.setPoemClick(props.item);
            props.setPoemLoaded(true);
        }}>
            <ListGroup.Item>
                <a href="#top"><p>{props.item.title} | {props.item.author} <span className='delete' onClick={() => {
                    props.deletePoemById(props.item.id);
                }}>X</span></p></a>
                <hr />    
            </ListGroup.Item>
        </span>
    )
}