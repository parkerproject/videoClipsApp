import React from 'react';

const Clip = (props) => (
  <li>
    <div className="title">
      <span
        className={props.playing === props.data.id ? 'ion-ios-pause' : 'ion-ios-play'}
        onClick={props.handleClip}
        data-start={props.data.start}
        data-end={props.data.end}
        data-id={props.data.id}
      >&nbsp; {props.data.name}</span>
    </div>
    <span className="small">{props.data.start} secs</span>&nbsp;-&nbsp;
    <span className="small">{props.data.end} secs</span><br />
    <small className="tag">Tags: {props.data.tag}</small>
    <div>
      <span
        className="ion-ios-compose-outline edit"
        data-id={props.data.id}
        data-start={props.data.start}
        data-end={props.data.end}
        data-name={props.data.name}
        onClick={props.handleEdit}
      />
      <span
        className="ion-android-close delete"
        data-id={props.data.id}
        onClick={props.handleDelete}
      />
    </div>
  </li>
  );


Clip.propTypes = {
  data: React.PropTypes.shape({
    name: React.PropTypes.string,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    id: React.PropTypes.string,
    tag: React.PropTypes.string,
  }),
  handleClip: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  handleEdit: React.PropTypes.func,
  playing: React.PropTypes.string,
};

export default Clip;
