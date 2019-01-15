import React, { Component } from 'react';

import TableDragSelect from "react-table-drag-select";

export default class extends Component {

  state = {
    cells: [...Array(25)].map(arr => Array(7).fill(false))
  }

  onSave () {
    console.log("creating dateTimes object")
    let dateTimes = {}
    let cells = this.state.cells

    for (let i = 0; i < cells.length; i++) { // i = hour
      for (let j = 0; j < cells[i].length; j++) { // j = day
        let day = this.props.weekStart.add(j, 'days')
        if (cells[i][j]) {
          if (!(dateTimes[day.format()])) {dateTimes[day.format()] = new Array() }
          dateTimes[day.format()].push(i-1) // Push the hour to the day array
        }
      }
    }

    console.log(dateTimes)
  }

  createRows () {
    let rows = []

    for (let row = 0; row < 24; row++) {

      let columns = []
      // Column
      for (let col = 0; col < 7; col++) {
        columns.push(
          <td key={`${row},${col}`} className={row <= 18 && row >= 6 ? 'day-time' : ''}>
            {row > 12 ? row - 12 : row}:00 {row > 12 ? 'pm' : 'am'}
          </td>
        )
      }
      rows.push(
        <tr key={row+1}>
          {columns}
        </tr>
      )
    }

    return (rows)
  }

  render() {
    return (
      <div>
        <TableDragSelect
          className="selectTable"
          value={this.state.cells}
          onChange={cells => this.setState({ cells })}
        >
          <tr>
            <td disabled>Monday</td>
            <td disabled>Tuesday</td>
            <td disabled>Wednesday</td>
            <td disabled>Thursday</td>
            <td disabled>Friday</td>
            <td disabled>Saturday</td>
            <td disabled>Sunday</td>
          </tr>
          {this.createRows()}
        </TableDragSelect>
        <a className="button" onClick={() => (this.onSave())}>Save</a>
      </div>

    );
  }
}