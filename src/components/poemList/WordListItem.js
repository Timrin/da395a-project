import ListGroup from 'react-bootstrap/ListGroup'
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';

export default function WordListItem(props) {

    const MAX_NUMBER_OF_WORD_DEFINITIONS = 2;

    return(
        <OverlayTrigger rootClose trigger="click" placement="top" overlay={
            <Popover className="popoverWrap" placement="top" id="popover-basic" show={false}>
                <Popover.Header as="h4">Defnition of {props.item.word}</Popover.Header>
                <Popover.Body>
                    {props.item.phonetic}
                    {props.item.meanings.map(meaning => {
                        let definitions = [];
                        //Only loop for MAX_NUMBER_OF_WORD_DEFINITIONS or less 
                        let loop = meaning.definitions.length > MAX_NUMBER_OF_WORD_DEFINITIONS ? MAX_NUMBER_OF_WORD_DEFINITIONS : meaning.definitions.length
                        for (let i = 0; i < loop; i++) {
                            definitions.push(meaning.definitions[i])
                        }
                        return (
                            <div>
                                <h5>{meaning.partOfSpeech}</h5>
                                <ul>
                                    {definitions.map((definition, index) => <li key={index}>{definition.definition}</li>)}
                                </ul>
                            </div>
                        )
                    })}
                </Popover.Body>
            </Popover>}>
        <ListGroup.Item>
            
                <p>{props.item.word} | {props.item.phonetic} <span className='delete' onClick={() => {
                    props.deleteWordById(props.item.id);
                }}>X</span></p>
                <hr />
            
        </ListGroup.Item>
        </OverlayTrigger>
    )
}