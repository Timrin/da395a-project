import ListGroup from 'react-bootstrap/ListGroup'

export default function WordListItem(props) {
    return(
        <ListGroup.Item>
            <p>{props.item.word}</p>
            <p>{props.item.phonetic}</p>
            <hr />
        </ListGroup.Item>
    )
}