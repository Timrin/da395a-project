import ListGroup from 'react-bootstrap/ListGroup'
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import logo from './Delete-X.png'

export default function WordListItem(props) {

    const MAX_NUMBER_OF_WORD_DEFINITIONS = 2;

    return(
            <ListGroup.Item className='word-box-item'>
                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                    <Popover className="popoverWrap" placement="bottom" id="popover-basic" show={false}>
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
                    <div className='word-header-container'>
                        <p className='word'><strong>{props.item.word}</strong></p> 
                        <p className='phonetic'> [{props.item.phonetic}] </p>
                    </div>
                </OverlayTrigger>
                
                <div className='word-delete-container'>
                    <span className='word-delete' onClick={() => {
                            props.deleteWordById(props.item.id);
                        }}>
                            <img src={logo} />
                    </span>
                </div>
            </ListGroup.Item>
    );
}