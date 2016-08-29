/* global document */
import React, { Component } from 'react';
import store from 'store';
import hotkey from 'react-hotkey';
import Video from './components/video';
import Clip from './components/clip';
import './App.css';

hotkey.activate();

class App extends Component {
  constructor() {
    super();
    this.state = {
      start: '0',
      end: '0',
      form: null,
      editForm: null,
      store: store.get('clips'),
      playing: null,
      loading: '',
    };
    this.handleClipChange = this.handleClipChange.bind(this);
    this.createClip = this.createClip.bind(this);
    this.addToStore = this.addToStore.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.cancel = this.cancel.bind(this);
    this.editItem = this.editItem.bind(this);
    this.saveToStore = this.saveToStore.bind(this);
    this.paused = this.paused.bind(this);
    this.hotkeyHandler = this.handleHotkey.bind(this);
  }

  componentDidMount() {
    hotkey.addHandler(this.hotkeyHandler);
  }

  componentWillUnmount() {
    hotkey.removeHandler(this.hotkeyHandler);
  }

  handleClipChange(e) {
    this.setState({
      start: e.currentTarget.getAttribute('data-start'),
      end: e.currentTarget.getAttribute('data-end'),
      playing: e.currentTarget.getAttribute('data-id'),
    });
  }

  addToStore() {
    const newItem = {
      start: document.querySelector('#start').value,
      end: document.querySelector('#end').value,
      name: document.querySelector('#name').value,
      id: Math.random().toString(36).slice(20),
      tag: document.querySelector('#tag').value,
    };
    store.set('clips', [...store.get('clips'), newItem]);

    this.setState({ store: store.get('clips'), form: null });
  }

  saveToStore() {
    const newItem = {
      start: document.querySelector('#start').value,
      end: document.querySelector('#end').value,
      name: document.querySelector('#name').value,
      id: document.querySelector('#id').value,
    };

    const newStore = store.get('clips').map((clip) => {
      const updatedClip = clip;
      if (clip.id === newItem.id) {
        updatedClip.start = newItem.start;
        updatedClip.end = newItem.end;
        updatedClip.name = newItem.name;
      }
      return updatedClip;
    });

    store.set('clips', newStore);
    this.setState({ store: newStore, editForm: null });
  }

  removeItem(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const newStore = store.get('clips').filter(clip => clip.id !== id);
    store.set('clips', newStore);
    this.setState({ store: newStore });
  }

  editItem(e) {
    const name = e.currentTarget.getAttribute('data-name');
    const start = e.currentTarget.getAttribute('data-start');
    const end = e.currentTarget.getAttribute('data-end');
    const id = e.currentTarget.getAttribute('data-id');

    const tpl = `
    <input type="hidden" id="id" value="${id}"/>
    <input placeholder='name' id="name" value="${name}"/>
    <input type="number" placeholder='start' class='sec' id="start" min="1" value="${start}" />
    <input type="number" placeholder='end' class='sec' id="end" min="1" value="${end}"/>
    `;

    this.setState({ editForm: tpl, form: null });
  }

  createClip() {
    const tpl = `
    <input placeholder='name' id="name"/>
    <input type="number" placeholder='start' class='sec' id="start" min="1" />
    <input type="number" placeholder='end' class='sec' id="end" min="1"/><br/>
    <span><input type="text" placeholder='Enter tag' id="tag" /></span>
    `;

    this.setState({ form: tpl, editForm: null });
  }

  cancel() {
    this.setState({ form: null, editForm: null });
  }

  paused() {
    const clipArr = store.get('clips');
    const index = clipArr.findIndex(x => x.id === this.state.playing);
    if (index < clipArr.length - 1) {
      this.setState({ loading: '...Loading next clip' });
      setTimeout(() => {
        const nextClip = clipArr[index + 1];
        this.setState({
          playing: nextClip.id,
          start: nextClip.start,
          end: nextClip.end,
          loading: '' });
      }, 3000);
    } else {
      this.setState({ playing: null });
    }
  }

  handleHotkey(e) {
    console.log('hotkey', e);
    this.paused();
  }

  render() {
    const clips = this.state.store.map((clip, key) =>
      <Clip
        data={clip}
        key={key}
        handleClip={this.handleClipChange}
        handleDelete={this.removeItem}
        handleEdit={this.editItem}
        playing={this.state.playing}
      />
    );

    return (
      <div className="App">
        <div className="row">
          <div className="six columns">
            <Video
              start={this.state.start}
              end={this.state.end}
              handleProgress={this.onProgress}
              handlePause={this.paused}
            />
          </div>
          <div className="four columns clips">
            <span className="red">{this.state.loading}</span>
            <h4 className="header">Clips</h4>
            <div className="form">
              {this.state.form && <div>
                <span dangerouslySetInnerHTML={{ __html: this.state.form }} /><br />
                <button className="add" onClick={this.addToStore}>Add</button>
                <button className="cancel" onClick={this.cancel}>Cancel</button>
              </div>
             }
             {this.state.editForm && <div>
               <span dangerouslySetInnerHTML={{ __html: this.state.editForm }} /><br />
               <button className="add" onClick={this.saveToStore}>Save</button>
               <button className="cancel" onClick={this.cancel}>Cancel</button>
             </div>
            }
            </div>
            <footer><a onClick={this.createClip}>Create New Clip</a></footer>
            <ul className="list">
              <li>
                <div className="title">
                  <span
                    onClick={this.handleClipChange}
                    data-start="0"
                    data-end="0"
                  >&nbsp; Full Video</span>
                </div>
                <span className="small">0 secs</span>&nbsp;-&nbsp;
                <span className="small">0 secs</span>
              </li>
              {clips}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  clips: React.PropTypes.array,
};

export default App;
