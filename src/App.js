import React, { Component } from 'react';
import moment from 'moment'
import randomColor from 'randomcolor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/App.scss';

import DateGrid from './components/DateGrid'


class App extends Component {

  state = {
    today: moment().startOf('day'),
    weekStart: moment().startOf('day').startOf('isoweek'),
    color: randomColor()
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Can You Do?</h1>
        <DateGrid
          weekStart={this.state.weekStart}
        />
        <footer>
          <p>Built by <a href="http://hill.xyz" target="_blank">Tom Hill</a>. Because he could.</p>
        </footer>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
