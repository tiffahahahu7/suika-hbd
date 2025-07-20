export default function Entry({ setShowGame }) {

  return (
    <div className="sleepy-birds">
        <a
          href="#"
          className="button button--piyo"
          onClick={e => {
            e.preventDefault();
            setShowGame(true);
          }}
        >
          <div className="button__wrapper">
            <span className="button__text">ENTRY</span>
          </div>
          <div className="characterBox">
            <div className="character wakeup">
              <div className="character__face"></div>
            </div>
            <div className="character wakeup">
              <div className="character__face"></div>
            </div>
            <div className="character">
              <div className="character__face"></div>
            </div>
          </div>
        </a>
    </div>
  );
}