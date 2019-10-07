import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// class Square extends React.Component {
//   // Game state is being moved to board so this no longer matters.
//   //   constructor(props) {
//   //     super(props);
//   //     this.state = {
//   //       value: null
//   //     };
//   //   }
//   render() {
//     // Quick test
//     // return <button className="square">{this.props.value}</button>;

//     // Now using this:
//     // return (
//     //   <button
//     //     className="square"
//     //     onClick={function() {
//     //       alert("click");
//     //     }}
//     //   >
//     //     {this.props.value}
//     //   </button>
//     // );

//     // Let's avoid this altogether and use an arrow function
//     return (
//       /**
//        * Notice the syntax is:
//        * // onClick={() => alert() }
//        * And not:
//        * // onClick={alert()}
//        * The latter will fire the alert every time the
//        * component re-renders.
//        */

//       // QUESTION what is the difference between
//       // this.props.value and this.state.value?
//       // Part of the answer: this.setState tells React to
//       // re-render.  When you call setState in a component,
//       // React automatically updates the child components
//       // inside of it too.

//       // And now it's getting set back to this.props.value.

//       /**
//        * Here's this works:
//        * 1.  When the button is clicked, the button calls
//        *     onClick as defined in Square.
//        * 2.  This calls this.props.onClick.  The onClick
//        *     method in Square was specified by Board
//        * 3.  Since the board passed onClick to Square,
//        *     Square calls this.handleClick(i) when clicked.
//        */
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>

//       /** Last of all, since there's now not so much in it,
//        * let's change Square to be a function component.
//        * This is a simple way to write components that only
//        * contain a render() method and don't maintain
//        * their own state.
//        */
//     );
//   }
// }

function Square(props) {
  // Notice this.props becomes just plain props in the
  // function component.
  // onClick={() => this.props.onClick()} instead becomes
  // onClick={props.onClick}
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // Refactor Board to hold on to the state of the children.  Lifting state into a parent component is commoon when React components are refactored.

  /**
   * To collect data from multiple children, or to have two
   * child components communicate with each other, you need
   * to declare the shared state in their parent component
   * instead.  The parent component can pass the data back
   * down to the children by using props; this keeps the
   * child components in sync with each other and with the
   * parent component.
   */

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  // Handle the click coming from square, this makes square
  // a controlled component.  Board has full control over
  // them.
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    //squares[i] = "X";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    // return <Square value={i} />;
    // instead let's pass two props from Board to Square:
    // value, and onClick
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    //const status

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  // One more refactor, this time lifting state up
  // into Game so we can add a "history" feature.
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// Helper function!
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// =============================================
ReactDOM.render(<Game />, document.getElementById("root"));
