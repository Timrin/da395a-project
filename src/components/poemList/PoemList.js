import './poemList_style.css'
import PoemListItem from './PoemListItem'

export default function PoemList(){
    return(
        <div className='box'>
            <h3>Sparade dikter</h3>
            <hr />
            <ul>
                <PoemListItem />
            </ul>
        </div>
    )
};
