/* global window */
import React, { Component } from 'react';
import ReactPlayer from 'react-player';

const VIDEO_URL = window.VIDEO_URL || 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

class Video extends Component {

  duration(e) {
    console.log(e);
  }

  ended() {
    console.log('play ended');
  }

  paused() {
    console.log('play paused');
  }
  render() {
    return (
      <div className="box">
        <ReactPlayer
          url={`${VIDEO_URL}#t=${this.props.start},${this.props.end}`}
          controls
          playing
          onDuration={this.duration}
          onEnded={this.ended}
          onPause={this.props.handlePause}
        />
        <div id="bar">
          <div id="progress" />
          <div id="markers" />
        </div>
      </div>
    );
  }
}

Video.propTypes = {
  start: React.PropTypes.string,
  end: React.PropTypes.string,
  handlePause: React.PropTypes.func,
};

export default Video;
