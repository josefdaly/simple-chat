function Footer() {
    return (
      <footer className="taskbar">
          <div className="taskbar-item start"><img src="static/images/icon.png" alt="joe chat icon" /> Start</div>
          <div className="taskbar-item active taskbar-joe-chat">Joe Chat</div>
          <div id="time-box" className="pull-right"><span id="hours"></span>:<span id="minutes"></span></div>
      </footer>
    )
}

export default Footer;
