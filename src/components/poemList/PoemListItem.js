import ListGroup from 'react-bootstrap/ListGroup'
import './poemList_style.css'

export default function PoemListItem(props) {
    return(
            <ListGroup.Item className='poem-list-item'>
                <a href="#top">
                <span onClick={() => {
                    props.setPoemClick(props.item);
                    props.setPoemLoaded(true);
                }}>
                    <p className='poem-title'><strong>{props.item.title}</strong></p>
                    <p className='poem-author'>by <strong>{props.item.author}</strong></p>
                </span>
                </a>
                <div className='poem-delete'>
                    <span onClick={() => {
                        props.deletePoemById(props.item.id);
                    }}>
                        <img src={'delete-icon.png'} alt="Delete icon" />
                    </span>
                </div>   
            </ListGroup.Item>
    )
}