import React from 'react';
import '../index.css';
import Board from './board';
import calculateWinner from '../calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastStepCoodinates: [null, null],
      }],
      xIsNext: true,
      stepNumber: 0,
      ascOrder: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0,
      this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        lastStepCoodinates: [Math.floor(i/3) + 1, (i%3) + 1],
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    // move = index
    // step = {squares: [...]} current element
    const moves = history.map((step, move) => {
      const whichMove = (move % 2) ? 'X' : 'O';
      const coord = `(${step.lastStepCoodinates[0]}; ${step.lastStepCoodinates[1]})`;
      const desc = move ?
        `Go to the move #${move}: ${whichMove}${coord}`:
        'To the start of the game';
      return (
        <li key={move}>
          <button
            style={move === stepNumber ? {'font-weight': 'bold'} : null}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let winnerSquares;
    if (winner === 'draw') {
      status = 'This is DRAW!';
      winnerSquares = null;
    } else if (winner) {
      status = `Winner: ${winner["winner"]}`;
      winnerSquares = winner["lines"];
    } else {
      status = `Next move: ${this.state.xIsNext ? 'X' : 'O'}`;
      winnerSquares = null;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winnerSquares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="moves-sorting-order">
            Sort by
            <select
              className="sorting-list"
              onChange={ () => this.setState({ascOrder: !this.state.ascOrder}) }
            >
              <option>ascending order</option>
              <option>descending order</option>
            </select>
          </div>
          <ol>{this.state.ascOrder ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
