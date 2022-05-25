import ListGroup from 'react-bootstrap/ListGroup'

export default function WordListItem(props) {
    return(
        <ListGroup.Item>
            <p>{props.item.word} | {props.item.phonetic} <span className='delete' onClick={() => {
                props.deleteWordById(props.item.id);
            }}>X</span></p>
            <hr />
        </ListGroup.Item>
    )
}