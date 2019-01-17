import React, { Component } from 'react';
import randomColor from 'randomcolor'
import TableDragSelect from "react-table-drag-select";
import { toast } from 'react-toastify';

export default class extends Component {

  theRandom = randomColor()

  state = {
    cells: [...Array(25)].map(arr => Array(7).fill(false)),
    userCells: [...Array(25)].map(arr => [...Array(7)].map(_ => Array()))
  }

  // NOTE: to future Tom.
  // If you are trying to remember that bug where the entire row of array elements were change
  // it's because when you initialised the array: userCells: [...Array(25)].map(arr => Array(7).fill([]))
  // you were referencing the same array in each element

  resetCells () {
    this.setState({cells: [...Array(25)].map(arr => Array(7).fill(false))})
  }

  onSave () {

    let cells = this.state.cells
    let userCells = this.state.userCells
    // for each row in cells
    for (let row = 0; row < cells.length; row++) {
      // for each col in the cells
      for (let col = 0; col < cells[row].length; col++) {
        if (cells[row][col]) {
          userCells[row][col].push(this.theRandom)
        }
      }
    }
    this.setState({userCells})
    this.resetCells()

    toast("Saved!")
  }

  // createRows () {
  //   let rows = []
  //   console.log("I was rendered!")
  //   for (let row = 0; row < 24; row++) {

  //     let columns = []
  //     // Column
  //     for (let col = 0; col < 7; col++) {

  //       let userTags = []
  //       if (this.state.userCells[row+1][col].length > 0) { // -1 for header row

  //         for (let tag = 0; tag < this.state.userCells[row+1][col].length; tag++) {
  //           userTags.push(
  //             <div key={`${tag}-${row}-${col}`} className="circle" style={{backgroundColor: "red"}}></div>
  //           )
  //         }
  //       }

  //       columns.push(
  //         <td key={`${row},${col}`} className={row <= 18 && row >= 6 ? 'day-time' : 'is-hidden-mobile'}>
  //           {row > 12 ? row - 12 : row}:00 {row > 12 ? 'pm' : 'am'}
  //           <br/>
  //           {userTags}
  //         </td>
  //       )
  //     }
  //     rows.push(
  //       <tr key={row+1}>
  //         {columns}
  //       </tr>
  //     )
  //   }

  //   return rows
  // }

  render() {

    let rows = []
    console.log("I was rendered!")
    for (let row = 0; row < 24; row++) {

      let columns = []
      // Column
      for (let col = 0; col < 7; col++) {

        let userTags = []
        if (this.state.userCells[row+1][col].length > 0) { // -1 for header row

          for (let tag = 0; tag < this.state.userCells[row+1][col].length; tag++) {
            userTags.push(
              <div key={`${tag}-${row}-${col}`} className="circle" style={{backgroundColor: "red"}}></div>
            )
          }
        }

        columns.push(
          <td key={`${row},${col}`} className={row <= 18 && row >= 6 ? 'day-time' : 'is-hidden-mobile'}>
            {row > 12 ? row - 12 : row}:00 {row > 12 ? 'pm' : 'am'}
            <br/>
            {userTags}
          </td>
        )
      }
      rows.push(
        <tr key={row+1}>
          {columns}
        </tr>
      )
    }

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
          {/* {this.createRows()} */}
          {rows}
        </TableDragSelect>
        <button className="button" onClick={() => {this.onSave()}}>Save</button>
      </div>

    );
  }
}