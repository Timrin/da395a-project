import ListGroup from 'react-bootstrap/ListGroup'

export default function PoemListItem(props) {
    return(
        <ListGroup.Item>
            <p>{props.item.title}</p>
            <p>{props.item.author}</p>
            <hr />
        </ListGroup.Item>
    )
}