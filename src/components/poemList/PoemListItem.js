import ListGroup from 'react-bootstrap/ListGroup'
import './poemList_style.css'
import logo from './Delete-X.png'

export default function PoemListItem(props) {
    return(
            <ListGroup.Item className='poem-box-item'>
                <span onClick={() => {
                    props.setPoemClick(props.item);
                    props.setPoemLoaded(true);
                }}>
                    <p className='title'><strong>{props.item.title}</strong></p>
                    <p className='author'>by <strong>{props.item.author}</strong></p>
                </span>
            
                <div className='poem-delete'>
                    <span onClick={() => {
                        props.deletePoemById(props.item.id);
                    }}>
                        <img src={logo} />
                    </span>
                </div>   
            </ListGroup.Item>
    )
}