import ListGroup from 'react-bootstrap/ListGroup'
import './poemList_style.css'

export default function PoemListItem(props) {
    return(
        <ListGroup.Item>
            <p>{props.item.title} | {props.item.author} <span className='delete' onClick={() => {
                props.deletePoemById(props.item.id);
                console.log("Delete CLick")
            }}>X</span></p>
            <hr />
        </ListGroup.Item>
    )
}