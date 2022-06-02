import './FloatingActionButton.css';

function FloatingActionButton() {
    return (
        <div className="fab-container mobile-show">
        <div className="fab">
          <div className="fab-content">
            <span className="material-icons">menu</span>
          </div>
        </div>
        <div className="sub-button">
          <a href="#wordList">
            <span className="material-icons">star</span>
          </a>
        </div>
        <div className="sub-button">
          <a href="#poemList">
            <span className="material-icons">bookmarks</span>
          </a>
        </div>
        <div className="sub-button">
          <a href="#top">
            <span className="material-icons">arrow_upward</span>
          </a>
        </div>
      </div>
    );
}

export default FloatingActionButton;