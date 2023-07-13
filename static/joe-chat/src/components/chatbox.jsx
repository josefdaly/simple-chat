function ChatBox() {

    return (
      <div className="container">
        <div className="row">
          <div id="chat-window" className="panel panel-primary col-xs-8 col-xs-offset-2">
            <div className="panel-heading">
                <span className="glyphicon glyphicon-comment"></span>
                <span>Chat! <span id="user-count"></span> User(s)</span>
              <div className="exit-button">X</div>
            </div>
            <div className="panel-body">
              <div className="panel-section">
                <span>Handle: </span>
                <input id="handle" type="text" value="Anonymous" />
              </div>
              <div className="panel-section" id="msgs-wrapper">
                <ul id="msgs" className="chat"></ul>
                <a href="#bottom"></a>
              </div>
              <div className="panel-section message-form">
                <form id="form">
                  <textarea className="form-control" type="text" id="input" placeholder="Send a message"></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ChatBox;
