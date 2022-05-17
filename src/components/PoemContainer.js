
function PoemContainer() {

    let poem = {
          "title": "Growth of Man -- like Growth of Nature --",
          "author": "Emily Dickinson",
          "lines": [
            "Growth of Man -- like Growth of Nature --",
            "Gravitates within --",
            "Atmosphere, and Sun endorse it --",
            "Bit it stir -- alone --",
            "",
            "Each -- its difficult Ideal",
            "Must achieve -- Itself --",
            "Through the solitary prowess",
            "Of a Silent Life --",
            "",
            "Effort -- is the sole condition --",
            "Patience of Itself --",
            "Patience of opposing forces --",
            "And intact Belief --",
            "",
            "Looking on -- is the Department",
            "Of its Audience --",
            "But Transaction -- is assisted",
            "By no Countenance --"
          ],
          "linecount": "16"
        };

    return (
        <div className="PoemContainer">
            <h2 className="title">{poem.title}</h2>
            <h3 className="author">by <span>{poem.author.toUpperCase()}</span></h3>
            {
                poem.lines.map((line, index) => <p key={index} className="line">{line}</p>)
            }
        </div>
    );
}

export default PoemContainer;
