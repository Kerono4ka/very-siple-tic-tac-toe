import React from 'react';
import '../index.css';
import Square from './square';

class Board extends React.Component {
  renderSquare(i, isWinner) {
    return (
      <Square
        value={this.props.squares[i]}
        isWinner={isWinner}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const size = 3;
    let squares = [];
    for (let i = 0; i < size; i++) {
      squares.push(<div className="board-row" />)
      for (let j = 0; j < size; j++) {
        const index = i*size + j;
        const isWinner = this.props.winnerSquares ?
          this.props.winnerSquares.includes(index) : null;
        squares.push(this.renderSquare(index, isWinner));
      }
    }

    return (
      <div>{squares}</div>
    );
  }
}

export default Board;
