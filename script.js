function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class PomoClock extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleDecrement",






























    label => {
      if (label[0] === 'B') {
        if (this.state.breakLength > 1 && !this.state.play) {
          this.setState({ breakLength: this.state.breakLength - 1 });
          if (!this.state.sessionActive) {
            this.setState({ minReal: this.state.breakLength - 1,
              secReal: 0 }, this.updateTimeDisplay);
          }
        }
      } else {
        if (this.state.sessionLength > 1 && !this.state.play) {
          if (this.state.sessionActive) {
            this.setState({
              sessionLength: this.state.sessionLength - 1,
              minReal: this.state.sessionLength - 1,
              secReal: 0 },
            this.updateTimeDisplay);
          } else {
            this.setState({
              sessionLength: this.state.sessionLength - 1 });

          }
        }
      }
    });_defineProperty(this, "handleIncrement",
    label => {
      if (label[0] === 'B') {
        if (this.state.breakLength < 60 && !this.state.play) {
          this.setState({ breakLength: this.state.breakLength + 1 });
          if (!this.state.sessionActive) {
            this.setState({ minReal: this.state.breakLength + 1,
              secReal: 0 }, this.updateTimeDisplay);
          }
        }
      } else {
        if (this.state.sessionLength < 60 && !this.state.play) {
          if (this.state.sessionActive) {
            this.setState({
              sessionLength: this.state.sessionLength + 1,
              minReal: this.state.sessionLength + 1,
              secReal: 0 },
            this.updateTimeDisplay);
          } else {
            this.setState({
              sessionLength: this.state.sessionLength + 1 });

          }
        }

      }

    });_defineProperty(this, "setTimer",
    () => {
      //var myVar = setInterval(myTimer, 1000);
      //clearInterval(myVar):
      if (!this.state.play) {
        for (let i = 0; i < this.state.intervals.length; i++) {
          clearInterval(this.state.intervals[i]);
        }console.log('cleared all');this.setState({ intervals: [] });
      } else {
        this.setState({ intervals: [...this.state.intervals, setInterval(() => {
            if (this.state.play) {
              if (this.state.secReal === 0) this.setState({ minReal: this.state.minReal - 1, secReal: 60 });

              this.setState({ secReal: this.state.secReal - 1 }, this.updateTimeDisplay);
              if (this.state.minReal === 0 && this.state.secReal === 59) {this.setState({ redClassActive: true });}
              if (this.state.minReal === 0 && this.state.secReal === 0) {
                this.setState({ timerLabel: this.state.sessionActive ? 'Break' : 'Session' });
                this.handePause();
                setTimeout(() => {
                  this.setState({ redClassActive: false });

                  this.switchTimer();
                  this.playSound();
                  if (!this.state.sessionActive) this.handlePlay();
                }, 1000);

              }
            }

          }, 1000)] },
        () => console.log(this.state.intervals));
      }
    });_defineProperty(this, "handePause",
    () => {
      this.setState({ play: !this.state.play }, this.setTimer);
    });_defineProperty(this, "handlePlay",
    () => {
      this.setState({ play: !this.state.play }, this.setTimer);
    });_defineProperty(this, "updateTimeDisplay",
    () => {
      let min = this.state.minReal.toString();
      let sec = this.state.secReal.toString();
      if (min.length === 1) {
        min = '0' + min;
      }
      if (sec.length === 1) {
        sec = '0' + sec;
      }
      this.setState({ minDisplay: min, secDisplay: sec });
      //console.log(this.state.minReal,' ', this.state.secReal);
    });_defineProperty(this, "playSound",
    () => {
      //this.handleDisplay(drum);
      let audio = document.getElementById('beep');
      audio.play();
    });_defineProperty(this, "stopSound",
    () => {
      //this.handleDisplay(drum);
      let audio = document.getElementById('beep');
      audio.pause();
      audio.currentTime = 0;
    });_defineProperty(this, "switchTimer",
    () => {
      this.setState({
        sessionActive: !this.state.sessionActive,
        //timerLabel: this.state.sessionActive ? 'Break' : 'Session', 
        minReal: this.state.sessionActive ? this.state.breakLength : this.state.sessionLength,
        minSec: 0 },
      this.updateTimeDisplay);
    });_defineProperty(this, "handleRefresh",
    () => {
      this.stopSound();
      this.setState({
        sessionActive: true,
        timerLabel: 'Session',
        breakLength: 5,
        sessionLength: 25,
        minReal: 25,
        secReal: 0,
        play: false },
      this.updateTimeDisplay);
    });this.state = { breakLength: 5, sessionLength: 25, minReal: 0, secReal: 0, minDisplay: '00', secDisplay: '00', play: false, intervals: [], sessionActive: true, timerLabel: 'Session', redClassActive: false };this.handleDecrement = this.handleDecrement.bind(this);this.handleIncrement = this.handleIncrement.bind(this);this.updateTimeDisplay = this.updateTimeDisplay.bind(this);this.setTimer = this.setTimer.bind(this);this.handlePlay = this.handlePlay.bind(this);this.playSound = this.playSound.bind(this);this.switchTimer = this.switchTimer.bind(this);this.handleRefresh = this.handleRefresh.bind(this);this.stopSound = this.stopSound.bind(this);}componentDidMount() {this.setState({ minReal: this.state.sessionLength, secReal: 0, sessionActive: true }, this.updateTimeDisplay);}
  render() {
    return (
      React.createElement("div", { className: "clock" },
      React.createElement("h1", null, "Pomodora Timer"),
      React.createElement("div", { className: "lengths" },
      React.createElement(Length, { length: this.state.breakLength, label: "Break Length", handleDecrement: this.handleDecrement, handleIncrement: this.handleIncrement }),
      React.createElement(Length, { length: this.state.sessionLength, label: "Session Length", handleDecrement: this.handleDecrement, handleIncrement: this.handleIncrement })),

      React.createElement(Session, { min: this.state.minDisplay, sec: this.state.secDisplay, label: this.state.timerLabel, redClassActive: this.state.redClassActive }),
      React.createElement(Controls, { handlePlay: this.handlePlay, handePause: this.handePause, handleRefresh: this.handleRefresh })));



  }}


const Length = props => {
  const timerName = props.label.toLowerCase().split(' ')[0];
  return (
    React.createElement("div", { className: "length" },
    React.createElement("h2", { id: `${timerName}-label` }, props.label),
    React.createElement("div", null,
    React.createElement("i", { id: `${timerName}-decrement`, className: "fa fa-arrow-down", onClick: () => props.handleDecrement(props.label) }),
    React.createElement("p", { id: `${timerName}-length` }, props.length),
    React.createElement("i", { id: `${timerName}-increment`, className: "fa fa-arrow-up", onClick: () => props.handleIncrement(props.label) }))));




};
const Session = props => {
  const classes = props.redClassActive ? "session red" : "session";
  return (
    React.createElement("div", { className: classes },
    React.createElement("h2", { id: "timer-label" }, props.label),
    React.createElement("p", { id: "time-left" }, `${props.min}:${props.sec}`),
    React.createElement("audio", {
      id: "beep",
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



};
const Controls = props => {
  return (
    React.createElement("div", { className: "controls" },
    React.createElement("i", { id: "start_stop", className: "fa fa-play", onClick: props.handlePlay }),
    React.createElement("i", { className: "fa fa-pause", onClick: props.handePause }),
    React.createElement("i", { id: "reset", className: "fa fa-refresh", onClick: props.handleRefresh })));


};
ReactDOM.render(React.createElement(PomoClock, null), document.getElementById('app'));