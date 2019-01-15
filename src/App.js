import React, { Component } from 'react';
import moment from 'moment'

import './styles/App.scss';

import DateGrid from './components/DateGrid'


class App extends Component {

  state = {
    today: moment().startOf('day'),
    weekStart: moment().startOf('day').startOf('isoweek')
  }

  // componentDidMount () {
  //   let now = moment()
  //   let start = now.startOf('isoweek')
  // }

  render() {
    return (
      <div className="App">
        <h1 className="title">Can You Do?</h1>
        <DateGrid
          weekStart={this.state.weekStart}
        />
      </div>
    );
  }
}

export default App;
